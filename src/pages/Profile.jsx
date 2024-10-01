import React from "react";
import RiderLayout from "./layout/RiderLayout";

export default function Profile() {
  return (
    <RiderLayout>
      <div>
        <div className="w-32 h-32 rounded-full border-2 mx-auto mt-8 object-cover relative ">
          <div>
            <img src="/images/profile.png" alt="profile" />
            {/* <input
              type="file"
              name="image"
              hidden
              id="profileImage"
              accept="jpeg/jpg/png/webp"
            />
            <label
              htmlFor="profileImage"
              className="absolute top-0 left-0 h-full w-full bg-transparent"
            ></label> */}
          </div>
        </div>
        <div>
          <h1 className="text-center mt-4 text-xl  font-extrabold text-gray-500">
            Jonathon Return
          </h1>
          <h1 className="text-center text-lg font-normal text-gray-500">
            rider
          </h1>
          <button className="text-center w-4/5 px-4 py-2 rounded-md text-white bg-blue-800 block mx-auto mt-8">
            Edit
          </button>
        </div>

        <div className="w-4/5 mx-auto mt-8 bg-slate-200 py-4 px-2 rounded-md">
          <h1>
            Phone number :<span>01575088264</span>
          </h1>
          <h1>
            Email ID :<span>rider@gmail.com</span>
          </h1>
          <h1>
            Address :
            <span>Kulgaon, Jalalabad, Baizid bostami, Chattogram.</span>
          </h1>
        </div>
      </div>
    </RiderLayout>
  );
}
