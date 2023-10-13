import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

export default function Signup(props) {


  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const { name, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //on submit Creates new user
  const onsubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/createuser",
        user
      );

      console.log( response.data);

      if (response.data === "User Created!!") {
       // console.log(user.name)
       props.showAlert(
          "User Created Successfully Login to Use iBook !!!",
          "success"
        );
        setSubmitted(true);
        navigate("/login");
      
      } else if (
        response.data ===
        "User With this name Already Exist Please Enter different Name"
      ) {
      props.showAlert(
          "User With this Name Already Exist Please Enter different Name!!!",
          "warning"
        );
      } else {
        props.showAlert("An error occurred while creating the user.", "error");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      props.showAlert("An error occurred while creating the user.", "error");
    }
  };

  return (
    <>
    
      <div>
        <div className="container my-3" style={{ width: "45%" }}>
          {!submitted ? (
             
            <form onSubmit={(e) => onsubmit(e)}>
             
              <h1
                className="container"
                style={{ color: props.mode === "light" ? "black" : "gray",marginTop:"90px" }}
              >
                Create Account
              </h1>
              <div className="mb-3" style={{ marginTop: "82px" }}>
                <label
                  htmlFor="exampleInputEmail1"
                  style={{ color: props.mode === "light" ? "black" : "gray" }}
                  className="form-label"
                >
                  User Name
                </label>
                <input
                  type="text"
                  style={{
                    backgroundColor:
                      props.mode === "light" ? "gray" : "#161414",
                    color: props.mode === "light" ? "black" : "gray",
                    border: props.mode === "light" ? "white" : "gray",
                  }}
                  name="name"
                  value={name}
                  required
                  minLength={5}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  style={{ color: props.mode === "light" ? "black" : "gray" }}
                  className="form-label"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  style={{
                    backgroundColor:
                      props.mode === "light" ? "gray" : "#161414",
                    color: props.mode === "light" ? "black" : "gray",
                    border: props.mode === "light" ? "white" : "gray",
                  }}
                  required
                  minLength={6}
                  value={password}
                  autoComplete="current-password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <button
                type="submit"
                className={`btn btn-${
                  props.mode === "light" ? "dark" : "light"
                }`}
                style={{ marginTop: "15px" }}
              >
                Submit
              </button>
            </form>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
}
