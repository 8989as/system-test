import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_URL } from '../../Components/apiConfig';
import Spinner from "../../Spinner/Spinner";
import Frame from "../../Components/MainFrame/Frame";
const AssortmentQueue = () => {
  let list = [];
  let checkupList = [];
  const [assortmentQueue, setAssortmentQueue] = useState([]);
  const [contentLength, setContentLength] = useState(0);
  const [state, setState] = useState({
    loading: false,
    errorMessage: "",
  });

  let user = JSON.parse(sessionStorage.getItem("userData"));

  // Hardcoded mock data for static app
  const mockAssortmentProducts = [
    {
      id: 1,
      lookupcode: "AQ001",
      description: "Sample Product for Assortment Queue 1",
      pAccepted: 1,
      pRejected: 1,
      checkup: 0,
      ready: 0,
      photo: 0,
      reason: "Needs price adjustment"
    },
    {
      id: 2,
      lookupcode: "AQ002",
      description: "Sample Product for Assortment Queue 2",
      pAccepted: 0,
      pRejected: 1,
      checkup: 1,
      ready: 0,
      photo: 1,
      reason: "Missing supplier information"
    },
    {
      id: 3,
      lookupcode: "AQ003",
      description: "Sample Product for Assortment Queue 3",
      pAccepted: 0,
      pRejected: 1,
      checkup: 0,
      ready: 0,
      photo: 0,
      reason: "Category mismatch"
    }
  ];

  useEffect(() => {
    async function getContentQueue() {
      try {
        setState({ ...state, loading: true });

        // API call commented out for static app
        // let responseData = await axios.get(`${API_URL}/new-non-web`);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        setAssortmentQueue(mockAssortmentProducts);
        setState({ ...state, loading: false });
      } catch (error) {
        setState({ ...state, loading: false, errorMessage: "Error loading data" });
      }
    }
    getContentQueue();
  }, []);
  for (let i = 0; i < assortmentQueue.length; i++) {
    if (assortmentQueue[i].pRejected == 1) {
      list.push(assortmentQueue[i]);
    }
  }
  for (let i = 0; i < assortmentQueue.length; i++) {
    if (
      assortmentQueue[i].checkup == 1 &&
      assortmentQueue[i].ready == 0 &&
      assortmentQueue[i].photo == 1
    ) {
      checkupList.push(assortmentQueue[i]);
    }
  }

  return (
    <Frame headerLabel="Buying Queue">
      <React.Fragment>
        {state.loading ? (
          <Spinner />
        ) : (
          <div className="row justify-content-between py-5  ">
            <div
              className="col-6 text-center row  overflow-scroll align-content-start "
              style={{ height: "70vh" }}
            >
              <div className="col-12 fs-4">
                <h2 className="fs-4">
                  Rejection Queue --{" "}
                  <span className=" text-danger fs-4">{list.length}</span> New
                  Products Found
                </h2>
              </div>
              {assortmentQueue.length > 0 &&
                assortmentQueue.map((item, index) => {
                  return item.pRejected == 1 ? (
                    <Link
                      to={`/mainpage/content/Aqueue/${item.lookupcode}`}
                      key={index}
                      className="card fs-6 col-12 rounded-4 my-2 text-center  overflow-hidden text-decoration-none text-dark"
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.1,
                        }}
                        className=" fs-6 card-body overflow-hidden fst-italic fs-6 p-4"
                      >
                        <h5 className="card-title my-0">
                          Item Lookup Code:{" "}
                          <span className="fs-6 text-success fw-bolder">
                            {item.lookupcode}
                          </span>{" "}
                        </h5>
                        <p className="fs-6 card-text  my-0">
                          {item.description}
                        </p>
                        <p className="fs-6 card-text my-0 ">
                          Reason:{" "}
                          <span className=" fs-6 my-0 text-danger fw-bold">
                            {item.reason}
                          </span>
                        </p>
                      </motion.div>
                    </Link>
                  ) : (
                    ""
                  );
                })}
            </div>
            <div
              className="col-6 row   overflow-scroll align-content-start  text-center    "
              style={{ height: "70vh" }}
            >
              <div className="col-12 fs-5">
                <h2 className="fs-4">
                  Checkup Queue --{" "}
                  <span className=" text-danger fs-4">
                    {checkupList.length}
                  </span>{" "}
                  New Products Found
                </h2>
              </div>
              {assortmentQueue.length > 0 &&
                assortmentQueue.map((item, index) => {
                  return item.checkup == 1 &&
                    item.pAccepted == 1 &&
                    item.ready == 0 &&
                    item.photo == 1 ? (
                    <Link
                      to={`/mainpage/content/Acheckup/${item.lookupcode}`}
                      key={index}
                      className="card col-12 rounded-4 my-2  overflow-hidden text-decoration-none text-dark"
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.1,
                        }}
                        className="card-body overflow-hidden fst-italic fs-6 p-4"
                      >
                        <h5 className="card-title">
                          Item Lookup Code:{" "}
                          <span className=" text-success fw-bolder">
                            {item.lookupcode}
                          </span>{" "}
                        </h5>
                        <p className="card-text">{item.description}</p>
                        <p className="card-text"></p>
                      </motion.div>
                    </Link>
                  ) : (
                    ""
                  );
                })}
            </div>
          </div>
        )}
      </React.Fragment>
    </Frame>
  );
};

export default AssortmentQueue;
