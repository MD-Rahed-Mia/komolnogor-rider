import React, { useEffect, useRef, useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useSocket } from "../../authContext/socketProvider";

export default function HomeMap() {
  const mapRef = useRef(null);

  const { socket } = useSocket();

  const [coordinates, setCoordinates] = useState(null);

  const mapStyles = {
    height: "300px",
    width: "100%",
  };

  const setCurrentLocation = () => {
    if ("geolocation" in navigator) {
      console.log(`geolocation is available.`);

      const watchId = navigator.geolocation.watchPosition((position) => {
        // console.log(
        //   `rider current position is : ${position.coords.latitude} & ${position.coords.longitude}`
        // );

        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        // sending rider location with socket
        if (socket) {
          socket.emit(
            "riderCurrentPosistion",
            JSON.stringify({
              riderId: "saflkowsdasowe",
              coords: {
                lat: position.coords.latitude,
                long: position.coords.longitude,
              },
            })
          );
        }
      });
    } else {
      console.log(`geolocation is not supported.`);
    }
  };

  useEffect(() => {
    setCurrentLocation();
  }, []);

  const onLoad = (mapInstance) => {
    mapRef.current = mapInstance;
    addCenterMarker();
  };

  // toast flag
  const [isToastShow, setIsToastShow] = useState(false);

  const handleMapIdle = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      const updatedCoordinates = {
        lat: parseFloat(center.lat().toFixed(6)),
        lng: parseFloat(center.lng().toFixed(6)),
      };

      // Update both coordinates state and newAddress
      setCoordinates(updatedCoordinates);

      // Validate delivery zone
    }
  };

  const addCenterMarker = () => {
    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
      console.error("Map container not found!");
      return;
    }

    const centerMarker = document.createElement("div");
    centerMarker.style.background = 'url("/img/Location.png") no-repeat center';
    centerMarker.style.backgroundSize = "contain";
    centerMarker.style.height = "80px";
    centerMarker.style.width = "80px";
    centerMarker.style.position = "absolute";
    centerMarker.style.top = "50%";
    centerMarker.style.left = "50%";
    centerMarker.style.marginTop = "-40px";
    centerMarker.style.marginLeft = "-40px";
    document.getElementById("map").appendChild(centerMarker);
  };

  return (
    <>
      {coordinates && (
        <LoadScript googleMapsApiKey="AIzaSyBbE_BV395ODtFKApBX_oK0KselqP0Tjcs">
          <GoogleMap
            id="map"
            mapContainerStyle={mapStyles}
            center={coordinates}
            zoom={15}
            onLoad={onLoad}
            onIdle={handleMapIdle}
            options={{
              gestureHandling: "greedy",
              fullscreenControl: false,
              streetViewControl: false,
            }}
          >
            <Marker position={coordinates} />
          </GoogleMap>
        </LoadScript>
      )}
    </>
  );
}
