import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";

const SecureRoutes = ({ children }) => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

function PageRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <SecureRoutes>
              <Dashboard />
            </SecureRoutes>
          }
        />
        <Route
          path="dashboard"
          element={
            <SecureRoutes>
              <Dashboard />
            </SecureRoutes>
          }
        />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default PageRoutes;
