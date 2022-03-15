import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginRoot = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #ccc;
  form {
    width: 300px;
    height: auto;
    padding: 10px;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    background-color: #fff;
    input {
      width: 100%;
      font-size: 16px;
      height: 35px;
      margin-bottom: 15px;
      border: 1px solid #cccc;
    }
    button {
      background-color: red;
      width: 100px;
      height: 40px;
    }
  }
`;

function Login() {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setCredential((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  };

  const submitHanlder = async (event) => {
    event.preventDefault();
    await localStorage.setItem("currentUser", JSON.stringify(credential));
    navigate("/dashboard");
  };

  return (
    <LoginRoot className="login">
      <form onSubmit={submitHanlder}>
        <h2>Login form</h2>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          value={credential.email}
          onChange={inputChangeHandler}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          value={credential.password}
          onChange={inputChangeHandler}
          required
        />
        <button type="submit">Login</button>
      </form>
    </LoginRoot>
  );
}

export default Login;
