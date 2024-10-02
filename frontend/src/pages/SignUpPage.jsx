import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import image from "../assets/sign-in-page.jpg";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import OAuth from "../components/OAuth";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    isStudent: true,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "age" && (value < 0 || value > 30)) {
      toast.error("Age cannot be negative and less than 30");
      return;
    }
    setFormData((prevData) => ({ ...prevData, [id]: value.trim() }));
  };

  const validateForm = () => {
    const { username, email, password, age } = formData;
    if (!username || !email || !password || !age) {
      toast.error("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.isStudent === false) {
      toast.error("Only students can sign up for this platform");
      return;
    }
    if (!validateForm()) return;

    try {
      setLoading(true);
      const res = await axios.post("auth/sign-up", formData);

      if (res.status === 200) {
        toast.success("Sign up successful!");
        navigate("/sign-in");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      isStudent: e.target.value === "true" ? true : false,
    });
  };
  // console.log(formData);
  return (
    <div className="font-serif min-h-screen  pt-32 p-6 bg-[#f4ded1] text-[#012f2c]">
      <motion.div
        initial={{ y: 500 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="flex p-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 shadow-2xl rounded-[28px] bg-white"
      >
        <div className="flex-1 gap-4">
          <Link to={"/"}>
            <h1 className="font-bold text-5xl flex flex-wrap font-sans italic text-[#f36400]">
              Mindful
            </h1>
          </Link>
          <p className="text-md mt-5">
            Sign up with your email and password to get started.
          </p>
          <div className="py-4">
            <img
              src={image}
              alt="Sign Up"
              className="mx-auto h-64 rounded-lg shadow-md"
            />
          </div>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {["username","name", "email", "age", "gender", "password"].map(
              (field, index) => (
                <div className="flex flex-col" key={index}>
                  <label
                    htmlFor={field}
                    className="text-sm font-semibold text-[#012f2c]"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  {field === "gender" ? (
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#f36400]"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="PerferNotToSay">Perfer not to say</option>
                    </select>
                  ) : (
                    <input
                      type={
                        field === "password"
                          ? "password"
                          : field === "age"
                          ? "number"
                          : "text"
                      }
                      placeholder={`Enter your ${field}`}
                      id={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#f36400]"
                    />
                  )}
                </div>
              )
            )}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[#012f2c]">
                Are you a student?
              </label>
              <div className="flex items-center gap-5 mt-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="student"
                    name="isStudent"
                    value={true}
                    checked={formData.isStudent === true}
                    onChange={handleRadioChange}
                    className="mr-2"
                  />
                  <label htmlFor="student">Yes</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="notStudent"
                    name="isStudent"
                    value={false}
                    checked={formData.isStudent === false}
                    onChange={handleRadioChange}
                    className="mr-2"
                  />
                  <label htmlFor="notStudent">No</label>
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              className="bg-[#f36400] text-white font-semibold p-2 rounded-lg shadow-md transition duration-300 hover:bg-[#f3b000]"
              type="submit"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
            <OAuth />
          </form>

          <div className="text-sm flex gap-2 mt-2">
            <span>Have an account?</span>
            <Link className="underline text-[#00a884]" to={"/sign-in"}>
              Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
