import "../app.css";
import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { usePublicResource } from "../Hooks/userPublcServices.js";

export default function Login() {
  const navigate = useNavigate();

  const [registerForm, setregisterForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
    photo: null,
  });

  const [loginForm, setloginForm] = useState({
    loginId: "",
    password: "",
  });

  const [loginhelpertext, setloginhelpertext] = useState("");
  const { recentPosts } = usePublicResource();

  /* ================= LOGIN ================= */

  const handleloginchange = (e) => {
    const { name, value } = e.target;
    setloginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginForm,
        { withCredentials: true },
      );

      alert(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  /* ================= REGISTER ================= */

  const handlechange = (e) => {
    const { name, value } = e.target;
    setregisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(registerForm).forEach((key) => {
      if (key === "photo") {
        if (registerForm.photo) formData.append("photo", registerForm.photo);
      } else {
        formData.append(key, registerForm[key]);
      }
    });

    formData.append("uploadType", "profile");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
      );

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  /* ================= FORGET PASSWORD ================= */

  const handleforgetpassword = async () => {
    if (!loginForm.loginId) {
      setloginhelpertext("Please Enter Email");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forget",
        { email: loginForm.loginId },
        { withCredentials: true },
      );

      alert(res.data.message);
      navigate("/forget-password", {
        state: { email: loginForm.loginId },
      });
    } catch (err) {
      alert(err.message);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="app-root p-3">
      <div className="container dark-container">
        <div class="d-flex flex-column justify-content-center align-items-center w-100">
          <h1 className="display-3">Welcome To</h1>
          <h3 className="display-5">Linkshare</h3>
          <h7 className="display-9">Share,Subscribe and Discuss!!!!</h7>
        </div>
        <div className="row p-3">
          {/* LEFT SECTION */}

          <div className="col-8">
            <div className="d-flex flex-column gap-4">
              {/* Recent Posts Panel */}

              <div className="dark-panel">
                <h5 className="mb-3 ">Recent Posts</h5>

                <div
                  className="d-flex flex-column gap-3 overflow-scroll"
                  style={{ height: "300px" }}
                >
                  {recentPosts.map((post) => (
                    <div className="card dark-card" key={post._id}>
                      <div className="card-header dark-card-header">
                        {post.topic.name}
                      </div>

                      <div className="card-body">
                        <h6>{post.createdBy.username}</h6>

                        <p>{post.description}</p>

                        {post.type === "Document" ? (
                          <iframe
                            src={post.content}
                            title="doc"
                            width="100%"
                            height="120"
                          />
                        ) : (
                          <a href={post.url} target="_blank" rel="noreferrer">
                            {post.url}
                          </a>
                        )}

                        <NavLink
                          to="/post"
                          className="btn btn-primary mt-2 w-100"
                        >
                          View Post
                        </NavLink>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Posts Panel */}

              <div className="dark-panel">
                <h5 className="mb-3">Top Posts</h5>

                <div className="card dark-card">
                  <div className="card-body">
                    <h6>Featured</h6>
                    <p>Example top post content</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}

          <div className="col-4">
            <div className="d-flex flex-column gap-4 pt-5">
              {/* LOGIN */}

              <div className="card dark-card">
                <div className="card-header dark-card-header">Login</div>

                <div className="card-body">
                  <form onSubmit={handleLoginSubmit}>
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Email / Username"
                      name="loginId"
                      onChange={handleloginchange}
                    />

                    <input
                      type="password"
                      className="form-control mb-3"
                      placeholder="Password"
                      name="password"
                      onChange={handleloginchange}
                    />

                    <button
                      type="button"
                      className="btn btn-link text-primary w-100"
                      onClick={handleforgetpassword}
                    >
                      Forgot Password?
                    </button>

                    <button className="btn btn-primary w-100">Login</button>

                    {loginhelpertext && (
                      <small className="text-danger">{loginhelpertext}</small>
                    )}
                  </form>
                </div>
              </div>

              {/* REGISTER */}

              <div className="card dark-card">
                <div className="card-header dark-card-header">Register</div>

                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <input
                      className="form-control mb-2"
                      placeholder="First Name"
                      name="firstname"
                      onChange={handlechange}
                    />

                    <input
                      className="form-control mb-2"
                      placeholder="Last Name"
                      name="lastname"
                      onChange={handlechange}
                    />

                    <input
                      className="form-control mb-2"
                      placeholder="Username"
                      name="username"
                      onChange={handlechange}
                    />

                    <input
                      className="form-control mb-2"
                      placeholder="Email"
                      name="email"
                      onChange={handlechange}
                    />

                    <input
                      type="password"
                      className="form-control mb-2"
                      placeholder="Password"
                      name="password"
                      onChange={handlechange}
                    />

                    <input
                      type="password"
                      className="form-control mb-2"
                      placeholder="Confirm Password"
                      name="confirmpassword"
                      onChange={handlechange}
                    />

                    <input
                      type="file"
                      className="form-control mb-3"
                      onChange={(e) =>
                        setregisterForm((prev) => ({
                          ...prev,
                          photo: e.target.files[0],
                        }))
                      }
                    />

                    <button className="btn btn-success w-100">Register</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
