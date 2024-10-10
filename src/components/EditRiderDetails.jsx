import React, { useEffect, useState } from "react";

import { FaFileUpload } from "react-icons/fa";
import { apiAuthToken, apiPath } from "../../secret";
import { useAuth } from "../authContext/authProvider";
import { toast } from "alert";
import Loading from "./Loading";

export default function EditRiderDetails() {
  const { rider } = useAuth();
  const [loading, setLoading] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    profileImage: null,
  });

  function handleProfileImage(event) {
    const file = event.target.files[0];
    setFormData(() => ({ ...formData, profileImage: file }));
  }

  async function handleSubmitForm(event) {
    event.preventDefault();

    if (!formData?.name || !formData?.email || !formData?.address) {
      toast("Rider name, email, address cannot empty.");
      return false;
    }

    const form = new FormData();

    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      setLoading(true);
      const apiResponse = await fetch(
        `${apiPath}/rider/edit-rider-detail/${rider?.id}`,
        {
          method: "PUT",
          headers: {
            "x-auth-token": apiAuthToken,
          },
          body: form,
        }
      );

      const result = await apiResponse.json();

      toast(result?.message);
      setLoading(false);

      console.log(result);
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    setFormData({
      name: rider?.name || "",
      email: rider?.email || "",
      address: rider?.address || "",
    });
  }, [rider]);

  return (
    <div className="w-4/5 mx-auto bg-slate-200 px-3 py-8 border-2">
      <form action="" encType="multipart/form-data" onSubmit={handleSubmitForm}>
        <div>
          <label
            htmlFor="profileImage"
            className="px-5 w-full py-2 bg-blue-600 text-white rounded-md flex items-center justify-center gap-4"
          >
            <FaFileUpload /> upload profile image
          </label>
          <input
            type="file"
            name="profileImage"
            id="profileImage"
            accept="image/*"
            hidden
            onChange={handleProfileImage}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="name">name</label>
          <input
            className="w-full px-2 py-2 rounded-md border-2 block"
            type="text"
            name="name"
            id="name"
            value={formData?.name}
            placeholder="rider name"
            onChange={(event) =>
              setFormData(() => ({ ...formData, name: event.target.value }))
            }
          />
        </div>
        <div className="mt-4">
          <label htmlFor="address">address</label>
          <input
            className="w-full px-2 py-2 rounded-md border-2 block"
            type="text"
            name="address"
            id="address"
            value={formData?.address}
            placeholder="rider address"
            onChange={(event) =>
              setFormData(() => ({ ...formData, address: event.target.value }))
            }
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email">email</label>
          <input
            className="w-full px-2 py-2 rounded-md border-2 block"
            type="email"
            name="email"
            id="email"
            value={formData?.email}
            placeholder="rider email"
            onChange={(event) =>
              setFormData(() => ({ ...formData, email: event.target.value }))
            }
          />
        </div>

        <div>{loading ? <Loading /> : null}</div>

        <div>
          <button
            type="submit"
            className="px-2 py-2 bg-blue-500 text-white rounded-md block w-full mt-8"
          >
            update profile info
          </button>
        </div>
      </form>
    </div>
  );
}
