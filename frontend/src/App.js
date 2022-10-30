import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LogIn from "./pages/LogIn";
import Tutorship from "./pages/Tutorship";

import { PrivateRoute } from "./utils/PrivateRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="login" element={<LogIn />} />
          <Route element={<PrivateRoute />}>
            <Route path="perfil" element={<Profile />} />
            <Route path="tutorias" element={<Tutorship />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
