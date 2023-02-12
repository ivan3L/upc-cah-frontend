import { Card } from "@mui/material";
import React from "react";
import logo from "../../assets/logo.png";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <Card
        className="card-login"
        sx={{
          width: "40%",
          minHeight: "75%",
          borderRadius: "15px",
          backgroundColor: "#C1C1C1",
        }}
      >
        <img src={logo} style={{ width: "70vh", height: "45vh" }} />
        <LoginSocialGoogle
          client_id="796613161165-8viuck8dada3igblrniqb8qipp0nmdk1.apps.googleusercontent.com"
          onResolve={(response) => {
            const {data} = response
            const token = data.access_token
            localStorage.setItem('user', JSON.stringify(data))
            localStorage.setItem('token', JSON.stringify(token))
            navigate("/lobby")

          }}
          onReject={(error) => {
            console.log("error", error);
          }}
        >
          <GoogleLoginButton
          />
        </LoginSocialGoogle>
        {/* <GoogleButton 
          onClick={() => {navigate('/lobby')}}
          /> */}
      </Card>
    </div>
  );
};
