import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from '../../Components/apiConfig';
import Spinner from "../../Spinner/Spinner";
import Frame from "../../Components/MainFrame/Frame";

const AdminView = () => {
  let navigate = useNavigate();
  let [state, setState] = useState({
    loading: false,
    users: [],
    filteredusers: [],
    errorMessage: "",
  });

  // Hardcoded mock users data for static app
  const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role_id: 1, status: 1 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role_id: 2, status: 1 },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role_id: 3, status: 2 },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", role_id: 4, status: 1 },
    { id: 5, name: "David Brown", email: "david@example.com", role_id: 5, status: 0 }
  ];

  async function getUsers() {
    try {
      setState({ ...state, loading: true });

      // API call commented out for static app
      // const response = await axios.get(`${API_URL}/users`);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Use hardcoded data instead
      setState({ ...state, loading: false, users: mockUsers });
    } catch (error) {
      setState({ loading: false, errorMessage: error.message });
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  let { users, loading } = state;

  return (
    <React.Fragment>
      <Frame headerLabel="Admin View">
        {loading ? (
          <Spinner />
        ) : (
          <div className="viewPage">
            <div className="my-2 p-5">
              <table
                className="table table-bordered"
                style={{ backgroundColor: "#00a888" }}
              >
                <thead>
                  <tr className="text-center">
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role ID</th>
                    <th scope="col">Status</th>
                    <th scope="col">Update</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 &&
                    users.map((user, index) => {
                      return (
                        <tr key={user.id} className="text-center text-light">
                          <th scope="row">{user.id}</th>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            {user.role_id === 1
                              ? "Admin"
                              : user.role_id === 2
                                ? "Buying"
                                : user.role_id === 3
                                  ? "Content"
                                  : user.role_id === 4
                                    ? "Photography"
                                    : user.role_id === 5
                                      ? "Assortment"
                                      : user.role_id === 6
                                        ? "Media Buying"
                                        : user.role_id === 7
                                          ? "Buying/Assortment"
                                          : "Other"}
                          </td>
                          <td
                            className={
                              user.status === 1
                                ? "text-dark fw-bold"
                                : user.status === 2
                                  ? "text-warning"
                                  : "text-danger fw-bold"
                            }
                          >
                            {user.status === 2
                              ? "Pending"
                              : user.status === 1
                                ? "Active"
                                : user.status === 0
                                  ? "Rejected"
                                  : ""}
                          </td>
                          <td>
                            <Link to={`/mainpage/adminview/${user.id}`}>
                              <i className="fa-solid fa-pen-to-square text-light fs-3"></i>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Frame>
    </React.Fragment>
  );
};

export default AdminView;
