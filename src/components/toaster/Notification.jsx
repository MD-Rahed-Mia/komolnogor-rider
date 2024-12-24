import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSocket } from "../../authContext/socketProvider";

export default function ToasterNotifation() {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState(null);

  const { socket } = useSocket();

  function playNotificationSound() {
    const audio = new Audio("/audio/audio.mp3");
    audio.play();
  }

  useEffect(() => {
    if (socket) {
      socket.on("orderIsReadyForPickup", (data) => {
        setShowModal(true);
        setModalText(`your order is ready for pickup.`);
        playNotificationSound();
      });
    }
  }, [socket]);

  useEffect(() => {
    if (showModal) {
      setInterval(() => {
        setShowModal(false);
      }, 10000);
    }
  }, [showModal]);

  return (
    <>
      {showModal ? (
        <div className="fixed min-w-40 top-4 z-50 right-3 bg-white border p-4 shadow-lg">
          {modalText}
        </div>
      ) : null}
    </>
  );
}
