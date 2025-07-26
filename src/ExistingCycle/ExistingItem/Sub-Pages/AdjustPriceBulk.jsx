import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { read, utils } from "xlsx";
import axios from "axios";
import { API_URL } from '../../../Components/apiConfig';
import swal from "sweetalert";
import MainButton from "../../../Components/MainButton/MainButton";
import Frame from "../../../Components/MainFrame/Frame";
import moment from "moment/moment";
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'

const AdjustPriceBulk = () => {
  let navigate = useNavigate();
  //   // This line imports the useNavigate hook from the react-router-dom package and assigns it to the navigate variable.

  let user = JSON.parse(sessionStorage.getItem("userData"));
  //   //This line retrieves the value of the "userData" key from the browser's sessionStorage object, parses it as a JSON object, and assigns it to the user variable.
  const downloadFile = (event) => {
    event.preventDefault();
    saveAs(`http://192.168.26.15/cms/temps/NewPriceTemp.xlsx`);
  };

  // Set MinDate to Today
  //\\------------------------------------------------------------//\\//
  const [minValue, setMinValue] = useState("");

  useEffect(() => {
    const updateMinValue = () => {
      const now = moment();
      const sixPM = moment("20:00:00", "HH:mm:ss");
      const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");
      const afterTomorrow = moment().add(2, "days").format("YYYY-MM-DD");

      if (now.isAfter(sixPM, "second")) {
        setMinValue(afterTomorrow);
      } else {
        setMinValue(tomorrow);
      }
    };

    updateMinValue(); // Initial update

    const interval = setInterval(updateMinValue, 1000); // Update every second

    return () => {
      clearInterval(interval); // Cleanup the interval on unmount
    };
  }, []);

  //\\------------------------------------------------------------//\\//
  //    States
  const [isLoading, setIsLoading] = useState(false);
  //This line declares a isLoading state variable with an initial value of false, and a setIsLoading function to update its value.

  const [effectDate, setEffectDate] = useState("");
  //This line declares an effectDate state variable with an initial value of an empty string, and a setEffectDate function to update its value.

  const [fileData, setFileData] = useState([])
  // This line declares a fileData state variable with an initial value of an empty array, and a setFileData function to update its value.
  const [failedFileData, setFailedFileData] = useState([]);
  //this line declares a failfiledata to show them in another excel sheet .


  //Validation LookupCode with description Function - MODIFIED FOR STATIC APP
  const lookupCodeValidation = async (arr) => {
    console.log("arr ------->", arr);

    // API call commented out for static app
    // const res = await axios.get(`${API_URL}/validation`, { params: [...arr] });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock validation - assume all items are valid for static app
    let validatedItems = arr.map(item => ({
      ...item,
      lookupcode: item.ItemLookupCode,
      description: `Sample Description for ${item.ItemLookupCode}`
    }));

    console.log('validation res ======> ', validatedItems)
    console.log("res \----------->", validatedItems);

    // set validated items 
    setFileData(validatedItems)
    // For static app, assume no failed items
    setFailedFileData([])
  }
  console.log("failedFileData======>", failedFileData)
  const handleFile = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(worksheet);
    let errortest = 0;
    jsonData.map((item) => {
      if (item.new_tierPriceC == 0 || item.new_orangePriceA == 0) {
        swal({
          title: `Ops`,
          text: "NOT Allowed to add 0 value",
          icon: "error",
          button: false,
          timer: 1500,
        });
        errortest++
      }

    });


    if (errortest == 0) {
      console.log("jsonData", jsonData);
      lookupCodeValidation(jsonData);
    };
  }

  //This line defines an asynchronous handleFile function that takes an event object as a parameter. This function is called when a file is uploaded and it reads and parses the file data into a JSON object, which is then assigned to the fileData state variable using the setFileData function.
  let finalArr = [];
  if (fileData.length) {
    fileData.forEach((item) => {
      item[`date`] = effectDate;
      item[`user`] = user.id;
    });
    finalArr = fileData.filter((item) => {
      return item.lookupcode != undefined;
    });

  }
  //This block of code checks if the fileData array is not empty and updates the date and user properties of each object in the array with the effectDate and user.id values, respectively.

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...fileData];
    list[index][name] = value;
    setFileData(list);
  };


  console.log("POST", finalArr);

  // MODIFIED FOR STATIC APP
  async function formSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    console.log('button submit clicked..........')
    console.log("TRY POST", finalArr);
    try {
      console.log('llllllllllllllllllllllllllllllllllllllllllllllllllllllllll')
      if (finalArr.length > 0) {
        console.log('llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll')

        // API call commented out for static app
        // const response = await axios.post(`${API_URL}/update-price`, finalArr);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate successful response
        const mockResponse = { data: { message: "success" } };
        console.log("response update price ==>", mockResponse)

        if (mockResponse.data.message) {
          swal({
            title: "Prices updated successfully (Static Mode)",
            icon: "success",
            button: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate("/mainpage/itemadjust/price", {
              replace: true,
            });
          }, 2000);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error=====>", error)
      setIsLoading(false);

      swal({
        title: `Ops`,
        text: "An error occurred please refresh the page and try again ",
        icon: "error",
        button: false,
        timer: 1200,
      });
    }
  }
  const fileType = "application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const fileExtension = '.xlsx';
  const exportToExcel = async (e) => {
    e.preventDefault()
    const ws = XLSX.utils.json_to_sheet(failedFileData);
    const wb = { Sheets: { "data": ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, 'failedUploadedItems' + fileExtension);
  }
  console.log('finaaaaaaaaaaaaaal true', fileData);
  console.log('finaaaaaaaaaaaaaal false', failedFileData);

  return (
    <Frame headerLabel="Price Bulk Adjustment">
      <React.Fragment>
        <form
          className="row m-0 p-0 justify-content-evenly p-4   "
          onSubmit={formSubmit}
        >
          <div className="col-6">
            <input
              type="file"
              className="form-control "
              onChange={(e) => {
                handleFile(e);
              }}
            />
          </div>
          <div className="col-6 row flex-nowrap m-0 p-0 ">
            <span htmlFor="effective_date" className="  fs-5  text-dark col-4">
              Effective Date : <span className="text-danger">*</span>
            </span>
            <input
              required
              min={minValue}
              value={effectDate}
              onChange={(e) => {
                if (moment(e.target.value).diff(new Date()) > 0) {
                  setEffectDate(e.target.value);
                } else {
                  setEffectDate(moment().add(1, "days").format("YYYY-MM-DD"));
                  swal({
                    title: `Ops`,
                    text: "An error occurred please refresh the page and try again ",
                    icon: "error",
                    button: false,
                    timer: 3000,
                  });
                }
              }}
              name="effective_date"
              id="effective_date"
              type="date"
              className=" col-6 "
            />
          </div>
          <div className="row pt-5">
            <div className="col-12">
              <h4>
                Download the template that should be used if you don't have it
              </h4>
            </div>
            <div className="col-12">
              <button className="btn bt-sm btn-success" onClick={downloadFile}>
                Download
              </button>
            </div>
          </div>
          {fileData != null && (
            <div
              className="display-6 h3 pt-5 pb-1 text-center text-capitalize text-muted"
              style={{
                fontSize: "1.5rem",
              }}
            >
              <span className="text-success fw-bold me-2">
                {fileData.length > 0 && fileData.length}
              </span>
              <span>Items uploaded</span>
            </div>
          )}
          {fileData.length > 0 && (
            <>
              <div
                className="row m-0 p-0 justify-content-evenly  border border-3 rounded-3 my-3 p-3 border-success "
                style={{ overflowY: "scroll", maxHeight: "65vh" }}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Lookup Code</th>
                      <th scope="col">Description</th>
                      <th scope="col">New Price</th>
                      <th scope="col">New Gourmet Gold/VIP Price</th>
                      <th scope="col">New Orange Gold/VIP Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      fileData.map((item, index) => <tr key={index}>
                        <th scope="row">{index}</th>
                        <td>{item["lookupcode"]}</td>
                        <td>{item["description"]}</td>
                        <td>{item["new_price"]}</td>
                        <td>{item["new_tierPriceC"]}</td>
                        <td>{item["new_orangePriceA"]}</td>
                      </tr>

                      )
                    }
                  </tbody>

                </table>
              </div>
              {console.log('failedFileData', failedFileData)}
              {
                failedFileData.length > 0 ? <button onClick={exportToExcel} className="bg-danger border-0 text-white  py-1 px-3 d-bolck ">Export Failed Items</button> : ""
              }
              <>
                <div className="col-12 me-auto  d-flex justify-content-end mt-4 ">
                  <MainButton
                    type="submit"
                    value={
                      isLoading ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        "Submit"
                      )
                    }
                  />


                </div>

              </>
            </>
          )}
        </form>
      </React.Fragment>
    </Frame>
  );
};

export default AdjustPriceBulk;
