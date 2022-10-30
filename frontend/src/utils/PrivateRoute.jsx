import { useContext } from "react";

import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export function PrivateRoute({ authPath = "login" }) {
  let { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to={{ pathname: authPath }} />;
}
