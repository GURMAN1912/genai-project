import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import image from "../assets/sign-in-page.jpg";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice"; // Import your Redux actions
import OAuth from "../components/OAuth";

const SignInPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      dispatch(signInFailure("Enter all the fields..."));
      return;
    }
    try {
      dispatch(signInStart());
      const res = await axios.post("/auth/sign-in", formData,{withCredentials:true});
      const data = res.data;
        if (res.status === 200) {
            toast.success("Sign in successful!");
            dispatch(signInSuccess(data));
            navigate('/');
        } else {
          toast.error(data.message);
            dispatch(signInFailure(data.message));
        }
    } catch (err) {
      toast.error("wrong email or password");
      dispatch(signInFailure(err.message));
    }
    finally {
      dispatch(signInFailure(null));
  };
}

  return (
    <div className='font-serif flex items-center min-h-screen pt-32 bg-[#f4ded1] text-[#012f2c]'>
      <motion.div 
        initial={{ y: 500 }} 
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="flex p-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 shadow-2xl rounded-[28px] bg-white"
      >
        <div className="flex-1 gap-4">
          <Link to={"/"}>
            <h1 className="font-bold font-sans italic text-5xl flex flex-wrap text-[#f36400]">
              Mindful
            </h1>
          </Link>
          <p className="text-md mt-5">
            Sign in with your email and password to get started.
          </p>
          <div className="py-4">
            <img
              src={image}
              alt="Sign In"
              className="mx-auto h-64 rounded-lg shadow-md"
            />
          </div>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {["email", "password"].map((field, index) => (
              <div className="flex flex-col" key={index}>
                <label
                  htmlFor={field}
                  className="text-sm font-semibold text-[#012f2c]"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "password" ? "password" : "email"}
                  placeholder={`Enter you ${field}`}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#f36400]"
                />
              </div>
            ))}

            <button
              disabled={loading}
              className="bg-[#f36400] text-white font-semibold p-2 rounded-lg shadow-md transition duration-300 hover:bg-[#f3b000]"
              type="submit"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
            <OAuth />
          </form>

          <div className="text-sm flex gap-2 mt-2">
            <span>Don't have an account?</span>
            <Link className="underline text-[#00a884]" to={"/sign-up"}>
              Sign Up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignInPage;
