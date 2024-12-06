import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./authProvider";
import { socketServer } from "../../secret";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const { id, rider } = useAuth();

  // console.log(rider) 

  useEffect(() => {
    if (!id) return; // Only connect if the token is available
    console.log(id);
    const newSocket = io(socketServer, {
      auth: {
        token: id,
      },
    });

    newSocket.on("connect", () => {
      console.log("Socket is connected.");
    });

    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    newSocket.emit("auth", id);

    newSocket.on("connectionStatus", (data) => {
      console.log(data.status);
      if (data.status === "connected") {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    });

    setSocket(newSocket);
  }, [rider]); // Re-run effect when rider changes

  return (
    <SocketContext.Provider value={{ socket, isActive }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
