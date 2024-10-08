import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./authContext/PrivateRoute";
import { AuthProvider, useAuth } from "./authContext/authProvider";
import { Toaster } from "alert";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Waiting from "./pages/Waiting";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import RecentDeliveries from "./pages/RecentDeliveries";
import Register from "./pages/Register";
import Wallet from "./pages/Wallet";
import { SocketProvider } from "./authContext/socketProvider";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/rider/order-waiting"
            element={
              <PrivateRoute>
                <Waiting />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/change-password"
            element={
              <PrivateRoute>
                <ChangePassword />
              </PrivateRoute>
            }
          />

          <Route
            path="/recent-deliveries"
            element={
              <PrivateRoute>
                <RecentDeliveries />
              </PrivateRoute>
            }
          />
          <Route
            path="/wallet"
            element={
              <PrivateRoute>
                <Wallet />
              </PrivateRoute>
            }
          />

          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const WrappedApp = () => (
  <AuthProvider>
    <SocketProvider>
      <App />
    </SocketProvider>
  </AuthProvider>
);

export default WrappedApp;
