import { useState } from "react";
import API from "../api/axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", form);

      Cookies.set("token", res.data.token);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-lg border-0" style={{ width: "420px" }}>
        <div className="card-body p-4">

          <h2 className="text-center fw-bold mb-4">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-success w-100">
              Login
            </button>

          </form>

          <p className="text-center mt-3">
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;