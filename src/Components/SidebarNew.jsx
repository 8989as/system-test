import React, { Fragment, useCallback, useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdPreview, MdCampaign, MdOutlineAdminPanelSettings, MdHistory, MdOutlineLogout } from "react-icons/md"
import axios from "axios";
import { API_URL } from './apiConfig';
import { useMemo } from "react";
const SidebarNew = (props) => {
    console.log(props)
    let user = JSON.parse(sessionStorage.getItem("userData"));
    console.log("user", user)
    const [items, setItems] = useState({})
    const getUserRole = useCallback(async () => {
        // Bypass backend: always set admin screens
        setItems({
            Screens: [
                { sb_link: '/mainpage/content/pqueue', sb_description: 'Assortment Queue', icon: 'fa-list' },
                { sb_link: '/mainpage/content/Aqueue', sb_description: 'Buying Queue', icon: 'fa-cart-shopping' },
                { sb_link: '/mainpage/content/Iqueue', sb_description: 'Image Queue', icon: 'fa-camera' },
                { sb_link: '/mainpage/content/existing', sb_description: 'Content', icon: 'fa-book' },
                { sb_link: '/mainpage/content/CRqueue', sb_description: 'Content Review', icon: 'fa-eye' },
                { sb_link: '/mainpage/content/CAMqueue', sb_description: 'Media Buying Queue', icon: 'fa-facebook' },
                { sb_link: '/mainpage/content/Mediaqueue', sb_description: 'Create Campaign', icon: 'fa-bullhorn' },
                // Add more admin screens as needed
            ]
        });
    }, []);
    useEffect(() => {
        getUserRole();
    }, []);
    useEffect(() => {
        props.reportsData(items.Reports);


    }, [items]);

    const [isHovered, setIsHovered] = useState(false);
    const [subSideBar, setSubSideBar] = useState(true)
    console.log(props);
    const hoverHandler = (e) => {
        console.log(e.target.innerHTML);
        if (e.target.innerHTML == 'Content') {
            setSubSideBar(true);
        }
    }
    return (
        <React.Fragment>
            <motion.section
                id="SideBar"
                // initial={{ width: "20vw" }}
                whileHover={{ width: "40vh" }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="position-fixed start-0 bottom-0"
                style={{
                    height: `${props.height}`,
                    zIndex: 99999,
                }}
            >
                <Fragment>
                    <ul
                        className="sideCss list-group row flex-nowrap position-relative align-content-center align-items-start m-0 rounded-0 "
                        style={{
                            height: "100%",
                            overflow: "scroll",
                            backgroundColor: "#00a886",
                        }}
                    >
                        <>
                            {
                                Object.keys(items).length > 0 ? items.Screens.map((item, index) => {
                                    return <motion.li
                                        className="list-group-item col-12 row m-0 overflow-hidden border-0"
                                        style={{ backgroundColor: "transparent" }}
                                        key={index}
                                    >
                                        <Link
                                            to={`${item.sb_link}`}
                                            className="btn col-12 d-flex flex-nowrap overflow-hidden border-0 align-items-center "
                                        >
                                            <motion.div className="w-25 m-auto ">
                                                {/* <RiListUnordered className="text-light fs-5 " /> */}
                                                <i className={`${item.icon.includes('facebook') ? 'fa-brands' : 'fa-solid'} ${item.icon} fs-6 text-white`} ></i>
                                            </motion.div>
                                            {isHovered && (
                                                <motion.div onMouseEnter={hoverHandler}
                                                    transition={{ duration: 0.3 }}
                                                    className="w-75 text-start text-white fs-6 "
                                                >
                                                    {item.sb_description}

                                                </motion.div>
                                            )}

                                        </Link>

                                    </motion.li>

                                }) : ""
                            }
                            <motion.li
                                className="list-group-item col-12 row m-0 overflow-hidden border-0"
                                style={{ backgroundColor: "transparent" }}
                            >
                                <Link
                                    onClick={() => {
                                        sessionStorage.removeItem("setIsAuth");
                                        sessionStorage.removeItem("userData");
                                    }}
                                    to="/login"
                                    refresh="true"
                                    className="btn col-12 d-flex flex-nowrap overflow-hidden border-0 align-items-center "
                                >
                                    <motion.div className="w-25 m-auto">
                                        <i className="fs-6 text-white fa-solid fa-person-walking-dashed-line-arrow-right"></i>
                                    </motion.div>
                                    {isHovered && (
                                        <motion.div
                                            transition={{ duration: 0.3 }}
                                            className="w-75 text-start text-white fs-6 "
                                        >
                                            LOG OUT
                                        </motion.div>
                                    )}
                                </Link>
                            </motion.li>
                        </>
                    </ul>
                </Fragment>
            </motion.section>
        </React.Fragment>
    );
};

export default SidebarNew;
