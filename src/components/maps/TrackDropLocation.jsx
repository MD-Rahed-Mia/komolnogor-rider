import React, { useEffect, useMemo, useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";

export default function TrackDropLocation({ dropLocation }) {
  const [location, setLocation] = useState({
    user: {
      lat: dropLocation.lat,
      long: dropLocation.long,
    },
    rider: {
      lat: 0,
      long: 0,
    },
  });

  function getCurrentLocationAndUpdate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        //  console.log("current location is : ", position);

        setLocation((prev) => ({
          ...prev,
          rider: {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          },
        }));
      });
    } else {
      console.log("geo location is not available.");
    }
  }

  useEffect(() => {
    getCurrentLocationAndUpdate();
  }, []);

  return (
    <>
      <a
        className="text-2xl border block w-fit px-4 hover:bg-purple-600 hover:text-white transition-all py-1 rounded-md border-purple-600 text-purple-600"
        href={`https://www.google.com/maps?saddr=(${location?.rider.lat},${location?.rider.long})&daddr=${location.user.lat},${location?.user.long}`}
        target="_blank"
      >
        <FaLocationArrow />
      </a>
    </>
  );
}
