import { Card } from "@mui/material";
import React, { useContext, useEffect } from "react";
import logo from "../../assets/logo.png";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import { UserContext } from "../../context/UserContext";
import { v4 as uuidv4 } from "uuid";

export const Login = () => {
  const navigate = useNavigate();
  const idUni = uuidv4();
  const { user, setUser } = useContext(UserContext);
  const handleUser = (data) => {
    setUser(data);
  };

  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item) {
      handleUser(JSON.parse(item));
      navigate("/lobby");
    }
  }, []);

  const responseGoogle = async (response) => {
    const { data } = response;
    const token = data.access_token;
    data.id = idUni;
    if (token) {
      handleUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/lobby");
    }
  };

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
          onResolve={responseGoogle}
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
