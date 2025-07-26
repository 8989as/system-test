import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import axios from "axios";
import { API_URL } from '../../Components/apiConfig';
import Spinner from "../../Spinner/Spinner";
import Frame from "../../Components/MainFrame/Frame";
const CampaignQueue = () => {
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
  //  End of it
  let list = [];
  let campaignList = [];
  let campaignListUp = [];
  let campaignListDone = [];
  const [campaignQueue, setCampaignQueue] = useState([]);
  const [state, setState] = useState({
    loading: false,
    errorMessage: "",
  });

  let user = JSON.parse(sessionStorage.getItem("userData"));

  // Hardcoded mock data for static app
  const mockCampaigns = [
    {
      id: 1,
      cName: "Summer Sale Campaign",
      enTitle: "Summer Sale",
      arTitle: "تخفيضات الصيف",
      start_date: "2024-06-01",
      end_date: "2024-06-30",
      done: 0,
      rCampaign: 1,
      upCampaign: 0
    },
    {
      id: 2,
      cName: "Back to School Campaign",
      enTitle: "Back to School",
      arTitle: "العودة للمدرسة",
      start_date: "2024-08-01",
      end_date: "2024-08-31",
      done: 0,
      rCampaign: 0,
      upCampaign: 1
    },
    {
      id: 3,
      cName: "Winter Collection Campaign",
      enTitle: "Winter Collection",
      arTitle: "مجموعة الشتاء",
      start_date: "2023-12-01",
      end_date: "2023-12-31",
      done: 1,
      rCampaign: 1,
      upCampaign: 0
    }
  ];

  useEffect(() => {
    async function getContentQueue() {
      try {
        setState({ ...state, loading: true });

        // API call commented out for static app
        // let responseData = await axios.get(`${API_URL}/campaigns`);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        setCampaignQueue(mockCampaigns);
        setState({ ...state, loading: false });
      } catch (error) {
        setState({ ...state, loading: false, errorMessage: "Error loading data" });
      }
    }
    getContentQueue();
  }, []);

  for (let i = 0; i < campaignQueue.length; i++) {
    if (
      campaignQueue[i].done == 0 &&
      campaignQueue[i].rCampaign == 1 &&
      campaignQueue[i].upCampaign == 0
    ) {
      campaignList.push(campaignQueue[i]);
    }
  }
  for (let i = 0; i < campaignQueue.length; i++) {
    if (
      campaignQueue[i].done == 0 &&
      campaignQueue[i].rCampaign == 0 &&
      campaignQueue[i].upCampaign == 1
    ) {
      campaignListUp.push(campaignQueue[i]);
    }
  }
  for (let i = 0; i < campaignQueue.length; i++) {
    if (campaignQueue[i].done == 1 && campaignQueue[i].rCampaign == 1) {
      campaignListDone.push(campaignQueue[i]);
    }
  }
  for (let i = 0; i < campaignQueue.length; i++) {
    if (today >= campaignQueue[i].start_date) {
      campaignQueue[i].upCampaign = 0;
      campaignQueue[i].rCampaign = 1;
    }
  }

  return (
    <React.Fragment>
      <Frame headerLabel="Campaigns Queue">
        {" "}
        {state.loading ? (
          <Spinner />
        ) : (
          <div className="row justify-content-between py-5  ">
            <div
              className="col-4 row text-center  overflow-scroll align-content-start     "
              style={{ height: "70vh" }}
            >
              <div className="col-12 ">
                <h2 className="fs-4">
                  Upcoming Campaigns --{" "}
                  <span className="fs-4 text-danger">
                    {campaignListUp.length}
                  </span>{" "}
                  Campaigns Found
                </h2>
              </div>
              {campaignQueue.length > 0 &&
                campaignQueue.map((item, index) => {
                  return item.done == 0 &&
                    item.rCampaign == 0 &&
                    item.upCampaign == 1 ? (
                    <Link
                      to={`/mainpage/content/UCAMqueue/${item.cName}`}
                      key={index}
                      className="card col-12 rounded-4 my-2  overflow-hidden text-decoration-none text-dark"
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.1,
                        }}
                        className="fs-6 card-body overflow-hidden fst-italic fs-5 p-4"
                      >
                        <h5 className="fs-6 card-title">
                          Campaign Name:{" "}
                          <span className="fs-6  text-success fw-bolder">
                            {item.cName}
                          </span>{" "}
                        </h5>
                        <h5 className="fs-6 card-title">
                          Start Date:{" "}
                          <span className="fs-6  text-success fw-bolder">
                            {item.start_date}
                          </span>{" "}
                        </h5>
                        <h5 className="fs-6 card-title">
                          End Date:{" "}
                          <span className="fs-6 text-success fw-bolder">
                            {item.end_date}
                          </span>{" "}
                        </h5>

                        {/* <p className="card-text">Arabic Name : {item.arTitle}</p> */}
                      </motion.div>
                    </Link>
                  ) : (
                    ""
                  );
                })}
            </div>
            <div
              className="fs-4 col-4 row text-center  overflow-scroll align-content-start     "
              style={{ height: "70vh" }}
            >
              <div className="col-12 fs-4 ">
                <h2 className="fs-4">
                  Running Campaigns --{" "}
                  <span className="fs-4 text-danger">
                    {campaignList.length}
                  </span>{" "}
                  Campaigns Found
                </h2>
              </div>
              {campaignQueue.length > 0 &&
                campaignQueue.map((item, index) => {
                  return item.done == 0 && item.rCampaign == 1 ? (
                    <Link
                      to={`/mainpage/content/RCAMqueue/${item.cName}`}
                      key={index}
                      className="card col-12 rounded-4 my-2  overflow-hidden text-decoration-none text-dark"
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.1,
                        }}
                        className="card-body overflow-hidden fst-italic fs-6 p-4"
                      >
                        <h5 className="fs-6 card-title">
                          Campaign Name:{" "}
                          <span className="fs-6 text-success fw-bolder">
                            {item.cName}
                          </span>{" "}
                        </h5>
                        <h5 className="fs-6 card-title">
                          Start Date:{" "}
                          <span className="fs-6 text-success fw-bolder">
                            {item.start_date}
                          </span>{" "}
                        </h5>
                        <h5 className="fs-6 card-title">
                          End Date:{" "}
                          <span className="fs-6 text-success fw-bolder">
                            {item.end_date}
                          </span>{" "}
                        </h5>

                        {/* <p className="card-text">Arabic Name : {item.arTitle}</p> */}
                      </motion.div>
                    </Link>
                  ) : (
                    ""
                  );
                })}
            </div>
            <div
              className="col-4 row text-center  overflow-scroll align-content-start     "
              style={{ height: "70vh" }}
            >
              <div className="col-12 ">
                <h2 className="fs-4">
                  Ended Campaigns --{" "}
                  <span className="fs-4 text-danger">
                    {campaignListDone.length}
                  </span>{" "}
                  Campaigns Found
                </h2>
              </div>
              {campaignQueue.length > 0 &&
                campaignQueue.map((item, index) => {
                  return item.done == 1 && item.rCampaign == 1 ? (
                    <Link
                      to={`/mainpage/content/ECAMqueue/${item.cName}`}
                      key={index}
                      className="card col-12 rounded-4 my-2  overflow-hidden text-decoration-none text-dark"
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.1,
                        }}
                        className="fs-6 card-body overflow-hidden fst-italic fs-5 p-4"
                      >
                        <h5 className="fs-6 card-title">
                          Campaign Name:{" "}
                          <span className="fs-6 text-success fw-bolder">
                            {item.cName}
                          </span>{" "}
                        </h5>
                        <h5 className="fs-6 card-title">
                          Start Date:{" "}
                          <span className="fs-6 text-success fw-bolder">
                            {item.start_date}
                          </span>{" "}
                        </h5>
                        <h5 className="fs-6 card-title">
                          End Date:{" "}
                          <span className="fs-6 text-success fw-bolder">
                            {item.end_date}
                          </span>{" "}
                        </h5>

                        {/* <p className="card-text">Arabic Name : {item.arTitle}</p> */}
                      </motion.div>
                    </Link>
                  ) : (
                    ""
                  );
                })}
            </div>
          </div>
        )}
      </Frame>
    </React.Fragment>
  );
};

export default CampaignQueue;
