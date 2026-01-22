import "../app.css"
import { useState } from "react"

export default function Login(){

    const[regiterForm, setregisterForm] = useState({
      firstname : "", 
      lastname : "",
      email : "", 
      username: "", 
      password :"", 
      confirmpassword : "",
      photo: null
    })

    const handlechange =(e)=>{
      console.log("Dsd")
      const { name, value } = e.target;

        setregisterForm((prev) => {
          return {
           ...prev,
          [name]: value
          }
          })
    }

    const handleSubmit = (e)=>{
      console.log("Dsdsd")
      e.prevetdefault()
      console.log(regiterForm);
    }
    
          

    return(
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
                          <a href="#" class="btn btn-primary">
                            Go somewhere
                          </a>
                        </div>
                      </div>

                      <div class="card">
                        <div class="card-header">Featured</div>
                        <div class="card-body">
                          <h5 class="card-title">Special title treatment</h5>
                          <p class="card-text">
                            With supporting text below as a natural lead-in to
                            additional content.
                          </p>
                          <a href="#" class="btn btn-primary">
                            Go somewhere
                          </a>
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
                          <h5 class="card-title">Special title treatment</h5>
                          <p class="card-text">
                            With supporting text below as a natural lead-in to
                            additional content.
                          </p>
                          <a href="#" class="btn btn-primary">
                            Go somewhere
                          </a>
                        </div>
                      </div>

                      <div class="card">
                        <div class="card-header">Featured</div>
                        <div class="card-body">
                          <h5 class="card-title">Special title treatment</h5>
                          <p class="card-text">
                            With supporting text below as a natural lead-in to
                            additional content.
                          </p>
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
                    <form>
                      <div class="mb-3">
                        <label class="form-label">
                          Email address
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          placeholder="Enter email"
                        />
                      </div>

                      <div class="mb-3">
                        <label class="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Password"
                        />
                      </div>

                      <button type="submit" class="btn btn-primary">
                        Login
                      </button>
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
                        name = "firstname"
                        onChange={handlechange}
                      />

                      <label class="form-label">Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Last name"
                        name = "lastname"
                        onChange={handlechange}
                      />

                      <div class="mt-3">
                        <label class="form-label">Username</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Username"
                          name = "username"
                          onChange={handlechange}

                        />
                      </div>

                      <div class="mt-3">
                        <label class="form-label">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          placeholder="Email"
                          name = "email"
                          onChange={handlechange}
                        />
                      </div>

                      <div class="mt-3">
                        <label class="form-label">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Password"
                          name = "password"
                          onChange={handlechange}
                        />
                      </div>

                      <div class="mt-3">
                        <label class="form-label">Confirm Password</label>
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Confirm password"
                          name = "confirmpassword"
                          onChange={handlechange}
                        />
                      </div>

                      <div class="mt-3">
                        <label class="form-label">Profile Photo</label>
                        <input type="file" class="form-control" name = "photo" onChange={(prev)=>{
                          return {
                            ...prev, 
                            photo : e.target.file[0]
                          }
                        }} />
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
    )
}