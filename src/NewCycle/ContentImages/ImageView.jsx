import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../../Spinner/Spinner";
import FormData from "form-data";
import axios from "axios";
import { API_URL } from '../../Components/apiConfig';
import swal from "sweetalert";
import { saveAs } from "file-saver";
import MainButton from "../../Components/MainButton/MainButton";
import Frame from "../../Components/MainFrame/Frame";
const ImageView = () => {
  const [isValidSize, setIsValidSize] = useState(false);
  const [product_id, setProduct_id] = useState("");
  const [lookupcode, setLookupCode] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [shape, setShape] = useState("");
  const [length, setLength] = useState("");

  const [selectedFiles, setSelectedFiles] = useState([]);
  let user = JSON.parse(sessionStorage.getItem("userData"));
  let { Id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [photo, setPhoto] = useState({
    id: "",
    photo: true,
  });
  // Product Json
  const [productInfo, setProductInfo] = useState({
    loading: false,
    errorMessage: "",
  });
  // logs
  const [postLog, setPostLog] = useState({
    lookupcode: Id,
    action: `${user.name} added images to product: ${Id} `,
    user: user.id != null ? user.id : "",
  });
  //  logs end

  const [existProduct, setExistProduct] = useState("");
  // Hardcoded mock product data for static app
  const mockProductData = [
    {
      id: 1,
      ItemLookupCode: Id,
      Description: "Sample Product for Images",
      Price: "35.99"
    }
  ];

  // Calling APIs of departments and supplier - MODIFIED FOR STATIC APP
  async function getDepartment() {
    try {
      setProductInfo({ ...productInfo, loading: true });

      // API call commented out for static app
      // let responseProduct = await axios.get(`${API_URL}/show-product/${Id}`);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setLookupCode(Id);
      setProduct_id(mockProductData[0].id);
      setExistProduct(mockProductData);
      setPhoto({ ...photo, id: mockProductData[0].id });
      setProductInfo({
        ...productInfo,
        loading: false,
      });
    } catch (error) {
      setProductInfo({
        ...productInfo,
        loading: false,
        errorMessage: error.message,
      });
    }
  }
  useEffect(() => {
    getDepartment();
  }, []);
  // Handling images change
  const HandleImages = (e) => {
    setSelectedFiles([]);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo) => {
      if (isValidSize == false) {
        return (
          <img className="p-2 col-2 " src={photo} alt="not found" key={photo} />
        );
      }
    });
  };

  // Submit the product

  // MODIFIED FOR STATIC APP
  async function formSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    var files = e.target[6].files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file[]", files[i]);
      formData.append("product_id", product_id);
      formData.append("height", height);
      formData.append("width", width);
      formData.append("length", length);
      formData.append("shape", shape);
      formData.append("lookupcode", lookupcode);
    }

    try {
      // API calls commented out for static app
      // let response = await axios.post(`${API_URL}/photos`, formData);
      // let responseLog = await axios.post(`${API_URL}/log`, postLog);
      // let photoResponse = await axios.post(`${API_URL}/update-queue`, photo);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate successful response
      const mockResponse = { data: { success: true } };

      if (mockResponse) {
        setIsLoading(false);
        swal(`Great!!`, "Images uploaded successfully (Static Mode)", "success");
        swal({
          title: `Hi ${user.name}`,
          text: "Images uploaded successfully (Static Mode)",
          icon: "success",
          button: false,
          timer: 1800,
        });
        setTimeout(() => {
          navigate("/mainpage/content/Iqueue", { replace: true });
        }, 2000);
      }
    } catch (error) {
      swal({
        title: `Hi ${user.name}`,
        text: "An error occurred please refresh the page and try again  ",
        button: false,
        timer: 1500,
        icon: "error",
      });
      setProductInfo({ ...productInfo, errorMessage: error.message });
      setIsLoading(false);
    }
  }
  // Limited file size
  const handleFileSize = (e) => {
    for (let i = 0; i < e.target.files.length; i++)
      if (e.target.files[i].size > 1 * 1048576) {
        swal(`Hi ${user.name}`, "Max size is 1 MB ", "error");
        setIsValidSize(true);
        e.target.value = "";
      } else {
        setIsValidSize(false);
      }
  };
  // Downloading images
  const downloadImage = () => {
    saveAs("image_url", "image.jpg"); // Put your image url here.
  };
  // Destructing props

  const { loading } = productInfo;

  return (
    <React.Fragment>
      <Frame headerLabel="Images View ">
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            {existProduct.length > 0
              ? existProduct.map((item, index) => {
                return (
                  <form className=" p-3" key={index} onSubmit={formSubmit}>
                    {" "}
                    <div
                      className="row justify-content-evenly rounded-3 row-shadow g-3  "
                      style={{
                        overflowX: "hidden",
                        overflowY: "scroll",
                        maxHeight: "90vh",
                      }}
                    >
                      <div className="col-6">
                        <div className=" position-relative ">
                          <label
                            htmlFor="ProductNumber"
                            className="  text-dark fw-bolder px-4"
                          >
                            Item Lookup Code{" "}
                            <span className=" fw-bolder text-danger">*</span>
                          </label>
                          <input
                            defaultValue={item.lookupcode}
                            readOnly
                            id="ProductNumber"
                            name="lookupcode"
                            type="text"
                            className="form-control rounded-3  border-3 border   "
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className=" position-relative ">
                          <label
                            htmlFor="rms_desc"
                            className="  text-dark fw-bolder px-4"
                          >
                            RMS Description{" "}
                            <span className=" fw-bolder text-danger">*</span>
                          </label>
                          <input
                            defaultValue={item.description}
                            readOnly
                            id="rms_desc"
                            name="description"
                            type="text"
                            className="form-control rounded-3  border-3 border   "
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className=" position-relative ">
                          <label
                            htmlFor="width"
                            className="  text-dark fw-bolder px-4"
                          >
                            Product Width
                          </label>
                          <input
                            onChange={(e) => {
                              setWidth(e.target.value);
                            }}
                            id="width"
                            name="width"
                            type="text"
                            maxLength={10}
                            autoComplete="off"
                            className="form-control rounded-3  border-3 border   "
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className=" position-relative ">
                          <label
                            htmlFor="height"
                            className="  text-dark fw-bolder px-4"
                          >
                            Product Height
                          </label>
                          <input
                            onChange={(e) => {
                              setHeight(e.target.value);
                            }}
                            id="height"
                            name="height"
                            type="text"
                            maxLength={10}
                            autoComplete="off"
                            className="form-control rounded-3  border-3 border   "
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className=" position-relative ">
                          <label
                            htmlFor="shape"
                            className="  text-dark fw-bolder px-4"
                          >
                            Product Shape
                          </label>
                          <input
                            onChange={(e) => {
                              setShape(e.target.value);
                            }}
                            id="shape"
                            name="shape"
                            type="text"
                            maxLength={10}
                            autoComplete="off"
                            className="form-control rounded-3  border-3 border   "
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className=" position-relative ">
                          <label
                            htmlFor="length"
                            className="  text-dark fw-bolder px-4"
                          >
                            Product length
                          </label>
                          <input
                            required
                            onChange={(e) => {
                              setLength(e.target.value);
                            }}
                            id="length"
                            name="length"
                            type="text"
                            maxLength={10}
                            autoComplete="off"
                            className="form-control rounded-3  border-3 border   "
                          />
                        </div>
                      </div>

                      <div className="input-group col-12">
                        <input
                          onChange={(e) => {
                            HandleImages(e);
                            handleFileSize(e);
                          }}
                          type="file"
                          required
                          data-maxFileSize="2"
                          className="form-control "
                          id="file"
                          multiple
                          name="file[]"
                          aria-describedby="inputGroupFileAddon04"
                          aria-label="Upload"
                        />
                      </div>
                      <div className="  w-100   col-12 row g-1 ">
                        {renderPhotos(selectedFiles)}
                      </div>

                      <div className="col-12 me-auto text-end">
                        <div className=" position-relative ">
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
                      </div>
                      {isSubmitted ? (
                        <div className="col-8 p-1 text-center m-auto my-4 alert-primary alert">
                          <p className=" my-1 fs-5  text-dark fw-bold">
                            Photos have been uploaded
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </form>
                );
              })
              : ""}
          </React.Fragment>
        )}
      </Frame>
    </React.Fragment>
  );
};

export default ImageView;
