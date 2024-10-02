import RiderLayout from "./layout/RiderLayout";
import EditRiderDetails from "../components/EditRiderDetails";
import { useEffect, useState } from "react";
import { useAuth } from "../authContext/authProvider";

export default function Profile() {
  const [editProfile, setEditProfile] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const { rider } = useAuth();

  useEffect(() => {
    if (rider?.profileImage) {
      // Convert binary image data to Base64 string for rendering
      setProfileImage(rider?.profileImage);
    } else {
      // Set a default image if no profile image is available
      setProfileImage("images/profile.png");
    }
  }, [rider]);

  return (
    <RiderLayout>
      <div className="w-full h-[80vh] overflow-y-scroll overflow-x-hidden">
        <div className="w-32 h-32 rounded-full border-2 mx-auto mt-8 object-cover relative">
          <img
            src={profileImage}
            alt="profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-center mt-4 text-xl font-extrabold text-gray-500">
            {rider?.name || "Unknown Rider"}
          </h1>
          <h2 className="text-center text-lg font-normal text-gray-500">
            Rider
          </h2>
        </div>

        <div className="w-4/5 mx-auto mt-8 bg-slate-200 py-4 px-2 rounded-md">
          <h1>
            Phone number: <span>{rider?.phoneNumber || "N/A"}</span>
          </h1>
          <h1>
            Email ID: <span>{rider?.email || "N/A"}</span>
          </h1>
          <h1>
            Address: <span>{rider?.address || "N/A"}</span>
          </h1>
        </div>

        <div>
          <button
            className="text-center w-4/5 px-4 py-2 rounded-md text-white bg-blue-800 block mx-auto mt-8"
            onClick={() => setEditProfile(!editProfile)}
          >
            {editProfile ? "Cancel" : "Edit"}
          </button>
        </div>

        {editProfile && <EditRiderDetails />}
      </div>
    </RiderLayout>
  );
}
