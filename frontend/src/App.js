import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";

import { PrivateRoute } from "./utils/PrivateRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>/* Add your routes here */</Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
