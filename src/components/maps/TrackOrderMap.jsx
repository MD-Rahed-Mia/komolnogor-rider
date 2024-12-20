import React, { useEffect, useState, useRef } from "react";
import {
  LoadScript,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useSocket } from "../../authContext/socketProvider";

export default function TrackOrderMap({ coords }) {
  const { socket } = useSocket();
  const mapRef = useRef(null);

  const [riderCoordinates, setRiderCoordinates] = useState({
    lat: 22.865322,
    lng: 91.097044,
  });
  const [userCoordinates, setUserCoordinates] = useState({
    lat: coords.lat,
    lng: coords.long,
  });
  const [directions, setDirections] = useState(null);
  const [lastUpdatedLocation, setLastUpdatedLocation] = useState(null);
  const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false);

  const mapStyles = {
    height: "500px",
    width: "100%",
  };

  const updateThreshold = 100; // Minimum distance in meters to trigger updates

  /**
   * Calculate distance between two coordinates using Haversine formula.
   */
  const calculateDistance = (coord1, coord2) => {
    const R = 6371e3; // Earth's radius in meters
    const lat1 = (coord1.lat * Math.PI) / 180;
    const lat2 = (coord2.lat * Math.PI) / 180;
    const deltaLat = lat2 - lat1;
    const deltaLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  /**
   * Calculate and update directions between rider and user.
   */
  const calculateRoute = () => {
    if (!isGoogleApiLoaded) {
      console.error("Google Maps API is not loaded yet.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: riderCoordinates,
        destination: userCoordinates,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  };

  /**
   * Watch rider's location and update route only if the threshold is exceeded.
   */
  const watchCurrentLocation = () => {
    if ("geolocation" in navigator) {
      console.log("Geolocation available. Tracking real-time location...");
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newCoordinates = { lat: latitude, lng: longitude };

          // Check if the location has changed significantly
          if (
            lastUpdatedLocation &&
            calculateDistance(newCoordinates, lastUpdatedLocation) <
              updateThreshold
          ) {
            return;
          }

          // Update rider's coordinates and last updated location
          setRiderCoordinates(newCoordinates);
          setLastUpdatedLocation(newCoordinates);

          // Emit the updated location to the server via socket
          if (socket) {
            socket.emit("riderCurrentPosition", {
              riderId: "rider123", // Replace with actual rider ID
              coords: newCoordinates,
            });
          }

          // Recalculate route
          calculateRoute();
        },
        (error) => {
          console.error("Error watching position:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported.");
    }
  };

  useEffect(() => {
    if (isGoogleApiLoaded) {
      watchCurrentLocation();
    }

   
  }, [socket, isGoogleApiLoaded]);

  return (
    <div>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY} // Use env variable
        onLoad={() => setIsGoogleApiLoaded(true)} // Set API load state
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          center={riderCoordinates}
          zoom={15}
          options={{
            gestureHandling: "greedy",
            fullscreenControl: false,
            streetViewControl: false,
          }}
        >
          {/* Rider's Marker */}
          <Marker position={riderCoordinates} label="Rider" />

          {/* Directions Renderer */}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
