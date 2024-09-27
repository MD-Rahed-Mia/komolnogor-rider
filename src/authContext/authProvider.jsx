import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { apiPath } from "../../secret";

const UserContext = createContext();

const localRider = JSON.parse(localStorage.getItem("rider"));

const AuthProvider = ({ children }) => {
  
  const [rider, setRider] = useState(localRider);


  useEffect(() => {
    async function getRiderProfile() {
      try {
        axios.get(`${apiPath}/rider/profile/${localRider?.id}`).then((res) => {
          setRider(res.data.result.riderProfile);
        });
      } catch (error) {
        throw new Error(error);
      }
    }
    getRiderProfile();
  }, [localRider?.id]);

  return (
    <UserContext.Provider value={{ localRider, rider}}>
      {children}
    </UserContext.Provider>
  );
};

export { AuthProvider, UserContext };
export const useAuth = () => useContext(UserContext);
