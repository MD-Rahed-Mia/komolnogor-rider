import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { apiAuthToken, apiPath } from "../../secret";
import useFetch from "../customHooks/useFetch";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const [rider, setRider] = useState(null);
 // const navigate = useNavigate();

 const id = Cookies.get("token");
  useEffect(() => {
    async function getRiderProfile() {

      if (!id || id === undefined) {
      //  navigate("/login");
        return;
      }

      try {
        axios
          .get(`${apiPath}/rider/profile/${id}`, {
            headers: {
              "x-auth-token": apiAuthToken,
            },
          })
          .then((res) => {
            setRider(res.data.result.riderProfile);
          });
      } catch (error) {
        throw new Error(error);
      }
    }
    getRiderProfile();
  }, []);

  return (
    <UserContext.Provider value={{ id, rider }}>
      {children}
    </UserContext.Provider>
  );
};

export { AuthProvider, UserContext };
export const useAuth = () => useContext(UserContext);
