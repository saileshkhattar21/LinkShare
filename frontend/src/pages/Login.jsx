import "../app.css";
import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

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

  const handleloginchange = (e) => {
    console.log("Dsd");
    const { name, value } = e.target;

    setloginForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlechange = (e) => {
    console.log("Dsd");
    const { name, value } = e.target;

    setregisterForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          loginId: loginForm.loginId,
          password: loginForm.password,
        },
        {
          withCredentials: true,
        },
      );

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Lorrrgin failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstname", registerForm.firstname);
    formData.append("lastname", registerForm.lastname);
    formData.append("username", registerForm.username);
    formData.append("email", registerForm.email);
    formData.append("password", registerForm.password);

    if (registerForm.photo) {
      formData.append("photo", registerForm.photo);
    }

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

  const handleforgetpassword = async () => {
    if (loginForm.loginId == "") {
      setloginhelpertext("Please Enter Email");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forget",
        { email: loginForm.loginId },
        {
          withCredentials: true,
        },
      );

      alert(res.data.message);
      navigate("/forget-password", {
        state: { email: loginForm.loginId },
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <div class="app-root p-3">
        <div class="container bg-dark">
          <div class="row bg-light p-3">
            <div class="col-8 bg-dark">
              <div class="d-flex flex-column bd-highlight p-3 gap-3">
                <div class="d-flex flex-column bd-highlight p-3 gap-3">
                  <div class="card">
                    <div class="card-header">Recent Posts</div>
                    <div class="card-body d-flex flex-column gap-3">
                      <div class="card">
                        <div class="card-header">Featured</div>
                        <div class="card-body">
                          <h5 class="card-title">Special title treatment</h5>
                          <p class="card-text">
                            With supporting text below as a natural lead-in to
                            additional content.
                          </p>
                          <NavLink
                            to="/somewhere"
                            class="btn btn-primary text-white"
                          >
                            Go somewhere
                          </NavLink>
                        </div>
                      </div>

                      <div class="card">
                        <div class="card-header">Post Title</div>
                        <div class="card-body">
                          <h5 class="card-title">Short Decription</h5>
                          <p class="card-text">Long Discription.........</p>
                          <NavLink
                            to="/somewhere"
                            class="btn btn-primary text-white"
                          >
                            Go somewhere
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card">
                    <div class="card-header">Top Posts</div>
                    <div class="card-body d-flex flex-column gap-3">
                      <div class="card">
                        <div class="card-header">Featured</div>
                        <div class="card-body">
                          <h5 class="card-title">Secendory heading</h5>
                          <p class="card-text">GREWRGERGERGERGERG</p>
                          <a href="#" class="btn btn-primary">
                            BUTTON
                          </a>
                        </div>
                      </div>

                      <div class="card">
                        <div class="card-header">Featured</div>
                        <div class="card-body">
                          <h5 class="card-title">Titile - 2</h5>
                          <p class="card-text">myumyumyumyumyumyumyumymhg</p>
                          <a href="#" class="btn btn-primary">
                            Go somewhere
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-4 bg-dark">
              <div class="d-flex flex-column bd-highlight pt-5 gap-3">
                <div class="card">
                  <div class="card-header">Login</div>
                  <div class="card-body">
                    <form onSubmit={handleLoginSubmit}>
                      <div class="mb-3">
                        <label class="form-label">Email address/Username</label>
                        <input
                          type="text"
                          class="form-control"
                          name="loginId"
                          onChange={handleloginchange}
                          placeholder="Enter email/username"
                        />
                      </div>

                      <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          name="password"
                          onChange={handleloginchange}
                          placeholder="Password"
                        />
                      </div>

                      <button
                        type="button"
                        className="btn text-primary hover-underline d-block m-auto"
                        onClick={handleforgetpassword}
                      >
                        Forgot Password?
                      </button>

                      <button
                        type="submit"
                        class="btn btn-primary d- block w-100"
                      >
                        Login
                      </button>
                      {loginhelpertext ? (
                        <small className="text-danger">{loginhelpertext}</small>
                      ) : null}
                    </form>
                  </div>
                </div>

                <div class="card">
                  <div class="card-header">Register</div>
                  <div class="card-body">
                    <form onSubmit={handleSubmit}>
                      <label class="form-label">First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="First name"
                        name="firstname"
                        onChange={handlechange}
                      />

                      <label class="form-label">Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Last name"
                        name="lastname"
                        onChange={handlechange}
                      />

                      <div class="mt-3">
                        <label class="form-label">Username</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Username"
                          name="username"
                          onChange={handlechange}
                        />
                      </div>

                      <div class="mt-3">
                        <label class="form-label">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          placeholder="Email"
                          name="email"
                          onChange={handlechange}
                        />
                      </div>

                      <div class="mt-3">
                        <label class="form-label">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Password"
                          name="password"
                          onChange={handlechange}
                        />
                      </div>

                      <div class="mt-3">
                        <label class="form-label">Confirm Password</label>
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Confirm password"
                          name="confirmpassword"
                          onChange={handlechange}
                        />
                      </div>

                      <div class="mt-3">
                        <label class="form-label">Profile Photo</label>
                        <input
                          type="file"
                          class="form-control"
                          name="photo"
                          onChange={(e) =>
                            setregisterForm((prev) => ({
                              ...prev,
                              photo: e.target.files[0],
                            }))
                          }
                        />
                      </div>

                      <button type="submit" class="btn btn-success mt-4">
                        Register
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
