import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../../Spinner/Spinner";

import axios from "axios";
import { API_URL } from '../../Components/apiConfig';
import MainButton from "../../Components/MainButton/MainButton";
import Frame from "../../Components/MainFrame/Frame";
import swal from "sweetalert";
const ViewRunningCampaign = () => {
  let user = JSON.parse(sessionStorage.getItem("userData"));
  let { Id } = useParams();
  let navigate = useNavigate();
  const [existProducts, setExistProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  let [state, setState] = useState({
    loading: false,
    products: [],
    errorMessage: "",
  });
  const [postLog, setPostLog] = useState({
    action: `${user.name} added a campaign details to Campaign: ${Id} `,
    user: user.id != null ? user.id : "",
    lookupcode: Id,
  });
  const [postCampaign, setPostCampaign] = useState([]);
  // Hardcoded mock data for static app
  const mockProductData = [
    {
      id: 1,
      ItemLookupCode: Id,
      Description: "Sample Running Campaign Product",
      Price: "35.99"
    }
  ];

  const mockCampaignData = [
    {
      id: 1,
      campaign_id: Id,
      enTitle: "Running Campaign",
      arTitle: "حملة جارية",
      cost: "1500",
      url: "https://example.com/running",
      start_date: "2024-01-01",
      end_date: "2024-01-31",
      user: 1,
      done: 0
    }
  ];

  const mockCampaignItems = [
    { id: 1, campaign_id: Id, product_id: 1, lookupcode: "RC001" },
    { id: 2, campaign_id: Id, product_id: 2, lookupcode: "RC002" }
  ];

  // MODIFIED FOR STATIC APP
  async function getTheProduct() {
    try {
      setState({ ...state, loading: true });

      // API calls commented out for static app
      // let response = await axios.get(`${API_URL}/show-product/${Id}`);
      // let campaignResponse = await axios.get(`${API_URL}/campaign/${Id}`);
      // let itemsResponse = await axios.get(`${API_URL}/campaign-items/${Id}`);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setExistProducts(mockCampaignItems);
      setPostCampaign(mockCampaignData);
      setState({
        ...state,
        loading: false,
        products: mockProductData,
      });
    } catch (error) {
      setState({ ...state, loading: false, errorMessage: error.message });
    }
  }

  useEffect(() => {
    getTheProduct();
  }, [Id]);

  // Submitting Form - MODIFIED FOR STATIC APP
  async function formSave(e) {
    e.preventDefault();
    setIsLoadingSave(true);
    try {
      // API calls commented out for static app
      // let response = await axios.post(`${API_URL}/update-campaign`, postCampaign[0]);
      // let responseLog = await axios.post(`${API_URL}/log`, postLog);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate successful response
      const mockResponse = { data: { success: true } };

      if (mockResponse) {
        setIsLoadingSave(false);
        swal({
          title: `Hi ${user.name}`,
          text: "Campaign data has been saved (Static Mode)",
          icon: "success",
          button: false,
          timer: 1800,
        });
        setTimeout(() => {
          navigate("/mainpage/content/CAMqueue", {
            replace: true,
          });
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
      setIsLoadingSave(false);
    }
  }
  // Saving form
  async function formSubmit(e) {
    postCampaign[0].done = 1;
    if (postCampaign[0].done == 1) {
      e.preventDefault();
      setIsLoading(true);
      try {
        // API calls commented out for static app
        // let response = await axios.post(`${API_URL}/update-campaign`, postCampaign[0]);
        // let responseLog = await axios.post(`${API_URL}/log`, postLog);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate successful response
        const mockResponse = { data: { success: true } };

        if (mockResponse) {
          setIsLoading(false);
          swal({
            title: `Hi ${user.name}`,
            text: "Campaign has been submitted (Static Mode)",
            icon: "success",
            button: false,
            timer: 1800,
          });
          setTimeout(() => {
            navigate("/mainpage/content/CAMqueue", {
              replace: true,
            });
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
        setIsLoading(false);
      }
    }
  }
  //  Handling input change

  const handleInputChange = (e, index) => {
    e.target.value = e.target.value.replace(
      /[’`~!#*$@_%+=^&(){}[\]|;”<>?\\]/g,
      ""
    );
    const { name, value } = e.target;
    const list = [...postCampaign];
    list[index][name] = value;
    setPostCampaign(list);
  };
  postCampaign.forEach((item) => {
    return (item.user = user.id != null ? user.id : "");
  });

  // Set MinDate to Today
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;

  let { loading, products } = state;
  return (
    <React.Fragment>
      <Frame headerLabel="Running Campaign">
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <form
              onSubmit={formSubmit}
              className="row   justify-content-evenly align-items-center "
            >
              {existProducts.length > 0
                ? existProducts.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="  col-12 row m-0  justify-content-evenly"
                    >
                      <div className="col-6 mt-3">
                        <label
                          htmlFor="productCode"
                          className=" ms-2 my-1  fs-5 text-dark"
                        >
                          Item Lookup Code
                        </label>
                        <input
                          value={item.lookupcode}
                          readOnly
                          id="productCode"
                          name="ItemLookupCode"
                          type="text"
                          className="form-control "
                        />
                      </div>

                      <div className="col-6 mt-3">
                        <label
                          htmlFor="productCodet"
                          className="ms-2 my-1 fs-5  text-dark"
                        >
                          Description
                        </label>
                        <input
                          readOnly
                          value={item.description}
                          id="productCode"
                          type="text"
                          className="form-control "
                        />
                      </div>
                    </div>
                  );
                })
                : ""}
              {loading == false &&
                products.map((item, index) => {
                  return (
                    <div key={index} className="col-6">
                      <label
                        htmlFor="productCodet"
                        className="ms-2 my-1 fs-5  text-dark"
                      >
                        RMS Description
                      </label>
                      <input
                        readOnly
                        id="productCode"
                        type="text"
                        className="form-control "
                        defaultValue={item.description}
                      />
                    </div>
                  );
                })}
              {postCampaign.length &&
                postCampaign.map((item, index) => {
                  return (
                    <div
                      className="col-12 row m-0 p-0 border-color border my-3 p-4 rounded-3 justify-content-evenly "
                      key={index}
                    >
                      <div className="col-4">
                        <label
                          htmlFor="productCodet"
                          className="ms-2 my-1 fs-5  text-dark"
                        >
                          English Title
                        </label>
                        <input
                          defaultValue={item.enTitle || ""}
                          disabled
                          autoComplete="off"
                          required
                          onChange={(e) => {
                            handleInputChange(e, index);
                          }}
                          name="enTitle"
                          id="enTitle"
                          type="text"
                          className="form-control "
                        />
                      </div>
                      <div className="col-4">
                        <label
                          htmlFor="productCodet"
                          className="ms-2 my-1 fs-5  text-dark"
                        >
                          Arabic Title
                        </label>
                        <input
                          defaultValue={item.arTitle || ""}
                          disabled
                          required
                          onChange={(e) => {
                            handleInputChange(e, index);
                          }}
                          name="arTitle"
                          id="arTitle"
                          type="text"
                          className="form-control "
                        />
                      </div>
                      <div className="col-4">
                        <label
                          htmlFor="productCodet"
                          className="ms-2 my-1 fs-5  text-dark"
                        >
                          Cost
                        </label>
                        <input
                          defaultValue={item.cost || ""}
                          disabled
                          autoComplete="off"
                          required
                          onChange={(e) => {
                            handleInputChange(e, index);
                          }}
                          name="cost"
                          id="cost"
                          type="number"
                          min={0}
                          className="form-control "
                        />
                      </div>
                      <div className="col-4">
                        <label
                          htmlFor="productCodet"
                          className="ms-2 my-1 fs-5  text-dark"
                        >
                          URL
                        </label>
                        <input
                          defaultValue={item.url || ""}
                          disabled
                          autoComplete="off"
                          required
                          onChange={(e) => {
                            handleInputChange(e, index);
                          }}
                          name="url"
                          id="url"
                          type="url"
                          placeholder="https://example.com"
                          pattern="https://.*"
                          size="30"
                          className="form-control "
                        />
                      </div>
                      <div className="col-4">
                        <label
                          htmlFor="productCodet"
                          className="ms-2 my-1 fs-5  text-dark"
                        >
                          Start Date
                        </label>
                        <input
                          defaultValue={item.start_date || ""}
                          disabled
                          autoComplete="off"
                          required
                          onChange={(e) => {
                            handleInputChange(e, index);
                          }}
                          name="start_date"
                          id="start_date"
                          type="date"
                          className="form-control "
                        />
                      </div>
                      <div className="col-4">
                        <label
                          htmlFor="productCodet"
                          className="ms-2 my-1 fs-5  text-dark"
                        >
                          End Date
                        </label>
                        <input
                          defaultValue={item.end_date || ""}
                          disabled
                          autoComplete="off"
                          required
                          onChange={(e) => {
                            handleInputChange(e, index);
                          }}
                          name="start_date"
                          id="start_date"
                          type="date"
                          className="form-control "
                        />
                      </div>
                      <div className="col-4">
                        <label
                          htmlFor="productCodet"
                          className="ms-2 my-1 fs-5  text-dark"
                        >
                          Impression
                        </label>
                        <input
                          defaultValue={item.impression || ""}
                          maxLength={25}
                          autoComplete="off"
                          required
                          onChange={(e) => {
                            handleInputChange(e, index);
                          }}
                          name="impression"
                          id="impression"
                          type="text"
                          className="form-control "
                        />
                      </div>
                      <div className="col-4">
                        <label
                          htmlFor="productCodet"
                          className="ms-2 my-1 fs-5  text-dark"
                        >
                          Engagement
                        </label>
                        <input
                          defaultValue={item.engagement || ""}
                          autoComplete="off"
                          required
                          onChange={(e) => {
                            handleInputChange(e, index);
                          }}
                          name="engagement"
                          id="engagement"
                          type="text"
                          className="form-control "
                        />
                      </div>
                      <div className="col-4">
                        <label
                          htmlFor="productCodet"
                          className="ms-2 my-1 fs-5  text-dark"
                        >
                          Spent
                        </label>
                        <input
                          defaultValue={item.spent || ""}
                          required
                          onChange={(e) => {
                            handleInputChange(e, index);
                          }}
                          name="spent"
                          id="spent"
                          type="number"
                          min={0}
                          autoComplete="off"
                          className="form-control "
                        />
                      </div>
                      <div className="col-4">
                        <label
                          htmlFor="productCodet"
                          className="ms-2 my-1 fs-5  text-dark"
                        >
                          Media Sales
                        </label>
                        <input
                          defaultValue={item.media_sales || ""}
                          required
                          onChange={(e) => {
                            handleInputChange(e, index);
                          }}
                          name="media_sales"
                          id="media_sales"
                          type="text"
                          maxLength={30}
                          autoComplete="off"
                          className="form-control "
                        />
                      </div>
                      <div className="col-4">
                        <label
                          htmlFor="productCodet"
                          className="ms-2 my-1 fs-5  text-dark"
                        >
                          Reach
                        </label>
                        <input
                          defaultValue={item.reach || ""}
                          required
                          onChange={(e) => {
                            handleInputChange(e, index);
                          }}
                          name="reach"
                          id="reach"
                          type="text"
                          maxLength={30}
                          autoComplete="off"
                          className="form-control "
                        />
                      </div>
                      <div className="col-4">
                        <label
                          htmlFor="productCodet"
                          className="ms-2 my-1 fs-5  text-dark"
                        >
                          ROI
                        </label>
                        <input
                          defaultValue={item.roi || ""}
                          required
                          onChange={(e) => {
                            handleInputChange(e, index);
                          }}
                          name="roi"
                          id="roi"
                          type="text"
                          maxLength={30}
                          autoComplete="off"
                          className="form-control "
                        />
                      </div>
                      <div className="col-4">
                        <label
                          htmlFor="productCodet"
                          className="ms-2 my-1 fs-5  text-dark"
                        >
                          Clicks
                        </label>
                        <input
                          defaultValue={item.clicks || ""}
                          required
                          onChange={(e) => {
                            handleInputChange(e, index);
                          }}
                          name="clicks"
                          id="clicks"
                          type="number"
                          min={0}
                          autoComplete="off"
                          className="form-control "
                        />
                      </div>
                      <fieldset className="col-12 row border border-success rounded-3 my-3  ">
                        <legend className="legend">Objective</legend>
                        <div className=" col-4">
                          <div className="fs-4 ">
                            <input
                              disabled
                              defaultChecked={item.tReach == 1 ? true : false}
                              className="mt-0  "
                              name="reach"
                              type="checkbox"
                              id="reach"
                            />{" "}
                            <span className="text-dark">Reach</span>
                          </div>
                        </div>
                        <div className=" col-4">
                          <div className="fs-4 ">
                            <input
                              disabled
                              defaultChecked={
                                item.tEngagement == 1 ? true : false
                              }
                              className="mt-0  "
                              name="engagment"
                              type="checkbox"
                              id="engagment"
                            />{" "}
                            <span className="text-dark">Engagment</span>
                          </div>
                        </div>
                        <div className=" col-4">
                          <div className="fs-4 ">
                            <input
                              disabled
                              className="mt-0  "
                              defaultChecked={
                                item.tConversion == 1 ? true : false
                              }
                              name="conversion"
                              type="checkbox"
                              id="conversion"
                            />{" "}
                            <span className="text-dark">Conversion</span>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  );
                })}
              <div className="col-8 p-1 text-center m-auto my-4 alert-danger alert">
                <p className=" my-1 fs-5  text-dark fw-bold">
                  Note:Submit button will end the campaign
                </p>
              </div>
              <div className="col-12 row justify-content-between mt-5 ">
                {" "}
                <MainButton
                  moreCSS="col-3"
                  className="col-3"
                  type="submit"
                  value={
                    isLoading ? (
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : (
                      "Submit"
                    )
                  }
                />
                <MainButton
                  moreCSS="col-3"
                  onClick={formSave}
                  type="button"
                  value={
                    isLoadingSave ? (
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : (
                      "Save"
                    )
                  }
                />
              </div>

              <div className="col-12 p-1 row justify-content-between m-auto my-4 ">
                <Link
                  to="/mainpage/content/CAMqueue"
                  className="col-2 btn-hover text-center G-link  fs-3 text-decoration-none text-dark border border-top-0 border-start-0 border-end-0"
                >
                  New Search
                </Link>
                <Link
                  to="/mainpage"
                  className="col-2 text-center G-link  btn-hover fs-3 text-decoration-none text-dark border border-top-0 border-start-0 border-end-0"
                >
                  Home
                </Link>
              </div>
            </form>
          </React.Fragment>
        )}
      </Frame>
    </React.Fragment>
  );
};

export default ViewRunningCampaign;
