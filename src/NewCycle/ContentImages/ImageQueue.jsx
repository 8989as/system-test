import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_URL } from '../../Components/apiConfig';
import Spinner from "../../Spinner/Spinner";
import Frame from "../../Components/MainFrame/Frame";
const ImageQueue = () => {
  let list = [];
  const [imageQueue, setImageQueue] = useState([]);
  const [state, setState] = useState({
    loading: false,
    errorMessage: "",
  });
  // Hardcoded mock data for static app
  const mockImageProducts = [
    {
      id: 1,
      lookupcode: "IQ001",
      description: "Sample Product for Image Queue 1",
      pAccepted: 1,
      pRejected: 0,
      photo: 0
    },
    {
      id: 2,
      lookupcode: "IQ002",
      description: "Sample Product for Image Queue 2",
      pAccepted: 1,
      pRejected: 0,
      photo: 0
    },
    {
      id: 3,
      lookupcode: "IQ003",
      description: "Sample Product for Image Queue 3",
      pAccepted: 1,
      pRejected: 0,
      photo: 0
    }
  ];

  useEffect(() => {
    async function getContentQueue() {
      try {
        setState({ ...state, loading: true });

        // API call commented out for static app
        // let responseData = await axios.get(`${API_URL}/content-queue`);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        setImageQueue(mockImageProducts);
        setState({ ...state, loading: false });
      } catch (error) {
        setState({ ...state, loading: false, errorMessage: "Error loading data" });
      }
    }
    getContentQueue();
  }, []);
  for (let i = 0; i < imageQueue.length; i++) {
    if (imageQueue[i].pAccepted == 1 && imageQueue[i].photo == 0) {
      list.push(imageQueue[i]);
    }
  }

  return (
    <React.Fragment>
      {state.loading ? (
        <Spinner />
      ) : (
        <Frame headerLabel="  Photography Queue">
          <div className="row justify-content-between py-5   ">
            <div
              className="col-12 row  overflow-scroll align-content-start "
              style={{ height: "70vh" }}
            >
              <div className="fs-4 col-12 text-center">
                <h2 className="fs-4">
                  Images Queue --{" "}
                  <span className="fs-4 text-danger">{list.length}</span> New
                  Products Found
                </h2>
              </div>
              {imageQueue.length > 0 &&
                imageQueue.map((item, index) => {
                  return item.pAccepted == 1 && item.photo == 0 ? (
                    <Link
                      to={`/mainpage/content/Iqueue/${item.lookupcode}`}
                      key={index}
                      className="fs-6 card col-12 rounded-4 my-2 text-center  overflow-hidden text-decoration-none text-dark"
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.1,
                        }}
                        className="fs-6 card-body overflow-hidden fst-italic  p-4"
                      >
                        <h5 className="card-title">
                          Item Lookup Code:{" "}
                          <span className="fs-6 text-success fw-bolder">
                            {item.lookupcode}
                          </span>{" "}
                        </h5>

                        <p className="fs-6 card-text">{item.description}</p>
                      </motion.div>
                    </Link>
                  ) : (
                    ""
                  );
                })}
            </div>
          </div>
        </Frame>
      )}
    </React.Fragment>
  );
};

export default ImageQueue;
