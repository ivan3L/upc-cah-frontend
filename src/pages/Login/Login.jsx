import { Card } from "@mui/material";
import React, { useContext, useEffect } from "react";
import logo from "../../assets/WTM Logo.png";
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
      navigate("/login");
    }
  }, []);

  const responseGoogle = async (response) => {
    const { data } = response;
    const token = data.access_token;
    data.id = idUni;
    if (token) {
      handleUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/home");
    }
  };

  return (
    <div className="login-container">
      <Card
        className="card-login"
        sx={{
          width: "40%",
          minHeight: "75%",
          backgroundColor: "rgba(193, 193, 193, 0)",
          border: "none",
          boxShadow: "none",
        }}
      >
        <img src={logo} style={{ width: "45%", height: "45%", marginBottom: "10px"  }} />
        <LoginSocialGoogle
          client_id="796613161165-8viuck8dada3igblrniqb8qipp0nmdk1.apps.googleusercontent.com"
          onResolve={responseGoogle}
          onReject={(error) => {}}
        >
          <GoogleLoginButton />
        </LoginSocialGoogle>
      </Card>
    </div>
  );
};
