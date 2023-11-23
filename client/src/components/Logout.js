import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Logout() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate]);
  const Logout = () => {
    setCookie("token", "");
    navigate("/signup");
  };

  return (
    <a className="header-link" href="/" onClick={Logout}>
      Logout
    </a>
  );
}

export default Logout;
