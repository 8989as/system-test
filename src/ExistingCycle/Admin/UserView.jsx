import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../../Spinner/Spinner";
import axios from "axios";
import { API_URL } from '../../Components/apiConfig';
import MainButton from "../../Components/MainButton/MainButton";
import swal from "sweetalert";
export default function UserView() {
  let { Id } = useParams();
  //This line uses the useParams() hook from React Router to get the Id parameter from the URL.

  let navigate = useNavigate();

  //This line uses the useNavigate() hook from React Router to get the navigate function, which can be used to programmatically navigate to other pages in the application.

  const [isLoading, setIsLoading] = useState(false);
  //This line initializes a state variable called isLoading and a function called setIsLoading to update it. The initial value of isLoading is false.

  let [state, setState] = useState({
    loading: false,
    errorMessage: "",
  });
  //This line initializes a state variable called state and a function called setState to update it. The initial value of state is an object with two properties: loading (initialized to false) and errorMessage (initialized to an empty string).

  let [users, setUsers] = useState([]);
  //This line initializes a state variable called users and a function called setUsers to update it. The initial value of users is an empty array.

  // Hardcoded mock users data for static app
  const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role_id: 1, status: 1, reason: "" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role_id: 2, status: 1, reason: "" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role_id: 3, status: 2, reason: "" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", role_id: 4, status: 1, reason: "" },
    { id: 5, name: "David Brown", email: "david@example.com", role_id: 5, status: 0, reason: "Incomplete documentation" }
  ];

  // Getting users data - MODIFIED FOR STATIC APP
  async function getUsers() {
    try {
      setState({ ...state, loading: true });

      // API call commented out for static app
      // let response = await axios.get(`${API_URL}/users`);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setState({ ...state, loading: false });
      setUsers(mockUsers);
    } catch (error) {
      setState({ loading: false, errorMessage: error.message });
    }
  }
  //This function fetches user data from an API using the Axios library. It updates the loading property in the state object to true before making the API call, and sets it back to false after the call is completed. It also sets the users state variable to the array of users returned by the API. If an error occurs, it sets the errorMessage property in the state object to the error message.

  // End if it
  useEffect(() => {
    getUsers();
  }, []);
  //This useEffect() hook is used to call the getUsers() function when the component mounts. The second argument (an empty array) ensures that the function is only called once when the component mounts, rather than being called repeatedly on subsequent re-renders.

  // Updating values
  const handleUserChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...users];
    list[index][name] = value;
    setUsers(list);
  };
  //This function handles changes to user data in the form. It creates a copy of the users array using the spread operator, modifies the appropriate property of the specified user object, and sets the users state variable to the updated array.

  // End
  // Submiting updates - MODIFIED FOR STATIC APP
  async function formSubmit(e, user) {
    e.preventDefault();
    setIsLoading(true);
    try {
      // API call commented out for static app
      // let response = await axios.put(`${API_URL}/users/${Id}`, user);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate successful response
      const mockResponse = { data: { success: true } };

      if (mockResponse) {
        setIsLoading(false);
        swal({
          title: `Hi ${user.name}`,
          text: "User Data updated successfully (Static Mode)",
          icon: "success",
          button: false,
          timer: 1200,
        });
        setTimeout(() => {
          navigate("/mainpage/adminview", { replace: true });
        }, 1500);
      }
    } catch (error) {
      swal({
        title: `Hi ${user.name}`,
        text: "An error occurred please refresh the page and try again  ",
        button: false,
        timer: 1200,
        icon: "error",
      });
    }
  }
  //async function formSubmit(e, user) { ... }: This is an asynchronous function that is called when the form is submitted. It sends an HTTP PUT request to update the user's data in the API. If the request is successful, it displays a success message using the swal library and navigates to the adminview page. If an error occurs, it displays an error message using the swal library.

  // End
  // Des props os state
  let { loading } = state;
  // End
  return (
    <React.Fragment>
      <section
        id="HomeSec"
        className="main-section w-100 vh-100   position-relative  overflow-hidden  "
      >
        <div className="HomeLayout"></div>

        <div className="row my-0 flex-wrap g-0 w-100 h-100 justify-content-center overflow-hidden  align-items-center position-relative ">
          <div className="col-6 row justify-content-center m-auto text-center">
            {" "}
            <motion.div className=" text-white col-8 ">
              <h1 className="fw-bolder my-3 ">
                <Link to="">
                  <img
                    src="/itemcreation/images/logo-01.svg"
                    alt="Logo is not here"
                    className=" w-100"
                  />
                </Link>
              </h1>
              {loading ? (
                <Spinner />
              ) : (
                <React.Fragment>
                  {users.length > 0 &&
                    users.map((user, index) => {
                      if (user.id == Id) {
                        return (
                          <motion.form
                            onSubmit={(e) => {
                              formSubmit(e, user);
                            }}
                            className=" row p-4   overflow-hidden"
                            key={index}
                          >
                            <div className="mb-3 col-12 position-relative inputs-group">
                              <input
                                onChange={(e) => {
                                  handleUserChange(e, index);
                                }}
                                defaultValue={user.name}
                                name="name"
                                type="text"
                                className="form-control rounded-3 "
                              />
                            </div>
                            <div className="mb-3 col-12 position-relative inputs-group">
                              <input
                                readOnly
                                value={user.email}
                                name="email"
                                type="email"
                                className="form-control rounded-3 "
                              />
                            </div>
                            <div className="mb-3 col-12 position-relative inputs-group">
                              <select
                                onChange={(e) => {
                                  handleUserChange(e, index);
                                }}
                                defaultValue={user.role_id}
                                name="role_id"
                                type="text"
                                className="form-control rounded-3 "
                              >
                                <option type="text" name="role_id" value="1">
                                  Admin
                                </option>
                                <option type="text" name="role_id" value="2">
                                  Buying
                                </option>
                                <option type="text" name="role_id" value="3">
                                  Content
                                </option>
                                <option type="text" name="role_id" value="4">
                                  Photography
                                </option>
                                <option type="text" name="role_id" value="5">
                                  Assortment
                                </option>
                                <option type="text" name="role_id" value="6">
                                  Media buying
                                </option>
                                <option type="text" name="role_id" value="7">
                                  Buying/Assortment
                                </option>
                                <option type="text" name="role_id" value="8">
                                  Loyality
                                </option>
                              </select>
                            </div>
                            <div className="mb-3 col-12 position-relative inputs-group">
                              <select
                                onChange={(e) => {
                                  handleUserChange(e, index);
                                }}
                                defaultValue={user.status}
                                name="status"
                                type="text"
                                className="form-control rounded-3 "
                              >
                                <option type="text" name="role_id" value="0">
                                  Rejected
                                </option>
                                <option type="text" name="role_id" value="1">
                                  Approved
                                </option>
                                <option type="text" name="role_id" value="2">
                                  Pending
                                </option>
                              </select>
                            </div>
                            {user.status == 0 ? (
                              <div className="mb-3 col-12 position-relative inputs-group">
                                <input
                                  onChange={(e) => {
                                    handleUserChange(e, index);
                                  }}
                                  value={user.reason}
                                  name="reason"
                                  placeholder="Enter rejection reason"
                                  type="text"
                                  required
                                  className="form-control rounded-3 "
                                />
                              </div>
                            ) : (
                              ""
                            )}

                            <div className="col-12  mt-2 row m-0 p-2 g-2 justify-content-center ">
                              {" "}
                              <div className="col ">
                                <Link to="/mainpage/adminview">
                                  <MainButton
                                    type="button"
                                    moreCSS="fs-5"
                                    value="Back"
                                  />
                                </Link>
                              </div>
                              <div className="col ">
                                <MainButton
                                  type="submit"
                                  moreCSS="fs-5"
                                  value={
                                    isLoading ? (
                                      <i class="fa-solid fa-spinner fa-spin"></i>
                                    ) : (
                                      "Submit"
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </motion.form>
                        );
                      }
                    })}
                </React.Fragment>
              )}
            </motion.div>
          </div>
          <div className="col-6"></div>
        </div>
      </section>
    </React.Fragment>
  );
}
