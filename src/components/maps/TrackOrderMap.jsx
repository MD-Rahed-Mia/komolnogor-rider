import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 23.777176,
  lng: 90.39945,
};

const API_KEY = "AIzaSyBbE_BV395ODtFKApBX_oK0KselqP0Tjcs";

function getCurrentLocationAndUpdate(setCurrentLocation) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
    //  console.log("current location is : ", position);

      setCurrentLocation(() => {
        return {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };
      });
    });
  } else {
    console.log("geo location is not available.");
  }
}

function TrackOrderMap({ userCoords }) {
  const [currentLocation, setCurrentLocation] = useState({
    lat: null,
    long: null,
  });

  console.log("user coords is : ", userCoords);

  useEffect(() => {
    getCurrentLocationAndUpdate(setCurrentLocation);
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "googleMaps",
    googleMapsApiKey: API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: currentLocation?.lat, lng: currentLocation?.long }}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* You can add other components here, like markers, info windows, etc. */}
      <Marker
        position={{ lat: currentLocation?.lat, lng: currentLocation?.long }}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default TrackOrderMap;
