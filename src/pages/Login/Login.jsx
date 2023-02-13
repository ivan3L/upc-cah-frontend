import { Card } from "@mui/material";
import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import { UserContext } from "../../context/UserContext";

export const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const handleUser = (data) =>{
    setUser(data)
  }

  const responseGoogle = (response) => {
    const { data } = response;
    handleUser(data)
    const token = data.access_token;
    if(token) navigate('/lobby')
  }

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
          onResolve={responseGoogle
        }
          onReject={(error) => {
            console.log("error", error);
          }}
        >
          <GoogleLoginButton />
        </LoginSocialGoogle>
        {/* <GoogleButton 
          onClick={() => {navigate('/lobby')}}
          /> */}
      </Card>
    </div>
  );
};
