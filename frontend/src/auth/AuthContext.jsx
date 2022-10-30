import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Api from "../utils/Api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  let navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();

    let response = await Api.post(
      "token/",
      { username: e.target.username.value, password: e.target.password.value },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.status === 200) {
      setAuthTokens(response.data);
      setUser(jwt_decode(response.data.access));
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      navigate("/");
    } else {
      alert("Something went wrong");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    let verifyUser = async () => {
      if (!user) return;

      await Api.get().catch((err) => {
        if (err.response.status === 401) {
          logoutUser();
        }
      });
    };

    verifyUser();
  }, []);

  let contextData = {
    authTokens: authTokens,
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
