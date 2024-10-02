import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import girlImage from "../assets/profilePageGril.jpg";
import boyImage from "../assets/profilePageBoy.jpg";
import axios from 'axios';
import { updateStart, updateFailure, updateSuccess } from '../redux/user/userSlice';


const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    gender: "",
    age: "",
  });

  const handleChatRedirect = () => {
    if (currentUser.gender === "Not specified" || currentUser.age === 0) {
      toast.error("Please complete your profile before proceeding to Chat");
      return;
    }
    navigate("/chat");
  };

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        gender: currentUser.gender || "",
        age: currentUser.age || "",
      });
      if (currentUser.gender === "Not specified" || currentUser.age === 0) {
        toast.error("Please complete your profile before proceeding");
      }
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Prevent age from being negative
    if (id === "age" && (value < 0 || value > 30)) {
      toast.error("Age cannot be negative");
      return;
    }

    setFormData((prevData) => ({ ...prevData, [id]: value.trim() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await axios.put(`/auth/update/${currentUser._id}`, formData, {
        withCredentials: true,
      });
      const data = res.data;

      if (res.status === 200) {
        dispatch(updateSuccess(data));
        toast.success("Profile updated successfully");
      } else {
        dispatch(updateFailure(data.message));
        toast.error(data.message);
      }
    } catch (err) {
      dispatch(updateFailure(err.message));
      toast.error(err.message);
    }
  };

  if (loading) {
    return <div className="spinner">Loading...</div>; // Add a loading spinner if necessary
  }

  return (
    <div className="font-serif min-h-screen pt-32 bg-[#f4ded1] text-[#012f2c]">
      <motion.div
        initial={{ y: 500 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="flex flex-col p-6 max-w-3xl mx-auto gap-5 shadow-2xl rounded-[28px] bg-white"
      >
        <h1 className="text-center text-3xl">Profile Page</h1>
        <div className="flex-row md:flex items-center gap-5 justify-center ">
          <div className="flex justify-center">
            <img
              src={formData.gender === "Male" ? boyImage : girlImage}
              alt="Profile"
              className="h-72 shadow-lg rounded-lg"
            />
          </div>
          <div className="flex-1 px-2 flex flex-col gap-4">
            <form className="" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="username"
                  className="text-sm font-semibold text-[#012f2c]"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#f36400] w-full"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-[#012f2c]"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  required
                  onChange={handleChange}
                  className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#f36400] w-full"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="gender"
                  className="text-sm font-semibold text-[#012f2c]"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  value={formData.gender}
                  required
                  onChange={handleChange}
                  className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#f36400] w-full"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="PreferNotToSay">Prefer not to say</option>
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="age"
                  className="text-sm font-semibold text-[#012f2c]"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  value={formData.age}
                  required
                  onChange={handleChange}
                  className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#f36400] w-full"
                />
              </div>
              <button
                disabled={loading}
                className="bg-[#f36400] text-white font-semibold mt-2 p-2 rounded-lg shadow-md transition duration-300 hover:bg-[#f3b000] w-full"
                type="submit"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
              <button
                onClick={handleChatRedirect}
                disabled={loading}
                className="bg-[#012f2c] text-white font-semibold mt-2 p-2 rounded-lg shadow-md transition duration-300 hover:bg-[#025b55] w-full"
                type="button"
              >
                {loading ? "Loading..." : "Chat Now"}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
