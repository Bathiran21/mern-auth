import { useEffect, useState } from "react";
import API from "../api/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const token = Cookies.get("token");

      const res = await API.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch {
      navigate("/login");
    }
  };

  const logout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand">
          MERN Authentication
        </span>

        <button
          className="btn btn-outline-light"
          onClick={logout}
        >
          Logout
        </button>
      </nav>

      <div className="container mt-5">

        <div className="card shadow border-0">

          <div className="card-body p-5">

            <h2 className="mb-4">
              Dashboard
            </h2>

            <div className="alert alert-success">
              Login Successful
            </div>

            <table className="table">

              <tbody>

                <tr>
                  <th width="180">Name</th>
                  <td>{user.name}</td>
                </tr>

                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </>
  );
};

export default Dashboard;