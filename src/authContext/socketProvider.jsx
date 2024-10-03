import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./authProvider";
import { socketServer } from "../../secret";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { rider } = useAuth();

  useEffect(() => {
    if (!rider?.token) return; // Only connect if the token is available

    const newSocket = io(socketServer, {
      auth: {
        token: rider.token,
      },
    });

    newSocket.on("connect", () => {
      console.log("Socket is connected.");
    });

    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    setSocket(newSocket);

  }, [rider]); // Re-run effect when rider changes

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
