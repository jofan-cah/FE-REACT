import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"; // Pastikan path file Navbar sesuai
import axios from "axios";

const ProfileDetail = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-900 flex items-center justify-center">
          <p className="text-white text-lg">Loading...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-900 flex items-center justify-center">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-900 p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Profile Details
        </h2>
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-xl">
          {/* Name */}
          <div className="mb-6 flex items-center">
            <div className="mr-4">
              <i className="fas fa-user text-blue-600 text-2xl"></i> {/* Icon Name */}
            </div>
            <div>
              <p className="text-lg font-medium text-gray-800">
                <strong className="text-gray-600">Name:</strong> {profile.name || "N/A"}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="mb-6 flex items-center">
            <div className="mr-4">
              <i className="fas fa-envelope text-blue-600 text-2xl"></i> {/* Icon Email */}
            </div>
            <div>
              <p className="text-lg font-medium text-gray-800">
                <strong className="text-gray-600">Email:</strong> {profile.email || "N/A"}
              </p>
            </div>
          </div>

          {/* Gender */}
          <div className="mb-6 flex items-center">
            <div className="mr-4">
              <i className="fas fa-venus-mars text-blue-600 text-2xl"></i> {/* Icon Gender */}
            </div>
            <div>
              <p className="text-lg font-medium text-gray-800">
                <strong className="text-gray-600">Gender:</strong> {profile.gender || "N/A"}
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ProfileDetail;
