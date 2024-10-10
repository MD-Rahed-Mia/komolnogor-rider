import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { apiAuthToken, apiPath } from "../../secret";
import useFetch from "../customHooks/useFetch";

const UserContext = createContext();

const localRider = JSON.parse(localStorage.getItem("rider"));

const AuthProvider = ({ children }) => {
  const [rider, setRider] = useState(localRider);

  console.log(document.cookie);

  useEffect(() => {
    async function getRiderProfile() {
      if (!localRider) return;
      try {
        axios
          .get(`${apiPath}/rider/profile/${localRider?.id}`, {
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
  }, [localRider?.id]);

  return (
    <UserContext.Provider value={{ localRider, rider }}>
      {children}
    </UserContext.Provider>
  );
};

export { AuthProvider, UserContext };
export const useAuth = () => useContext(UserContext);
