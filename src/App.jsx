import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RiderHome from "./pages/RiderHome";
import RiderLogin from "./pages/RiderLogin";
import PrivateRoute from "./authContext/PrivateRoute";
import { AuthProvider, useAuth } from "./authContext/authProvider";
import RiderProfile from "./pages/RiderProfile";
import RIderWaiting from "./pages/RIderWaiting";
import { useEffect, useRef } from "react";
import { Toaster } from "alert";

function App() {
  return (
    <>
      <Toaster position="top-right"/>
      <BrowserRouter>
        <Routes>
          <Route path="/rider/login" element={<RiderLogin />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <RiderHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/rider/order-waiting"
            element={
              <PrivateRoute>
                <RIderWaiting />
              </PrivateRoute>
            }
          />
          <Route path="/rider/profile" element={<RiderProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const WrappedApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default WrappedApp;
