import React from "react";
import image from "../../assets/herobanner.jpg";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TbArrowRight } from "react-icons/tb";


const HeroBanner = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="bg-[#f4ded1] font-sans pt-28 min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center text-center w-full px-8 max-w-6xl gap-5">
        <div className="mt-10 flex justify-center w-full">
          <img
            src={image}
            alt="hero-banner"
            className="w-[300px] h-[150px] md:w-[500px] md:h-[200px] object-cover rounded-full shadow-lg"
          />
        </div>
        {/* Text Section */}
        <div className="w-full">
          <h1 className="text-4xl md:text-5xl font-serif   font-bold leading-tight">
            Your{" "}
            <span className="italic font-sans font-medium">mental health</span>{" "}
            matters. <br />
            <span className="italic font-sans font-medium">Trust</span> in us,{" "}
            <span className="italic font-sans font-medium">Trust</span> in
            yourself.
          </h1>
          <p className="my-6 font-serif text-lg md:text-xl">
            Where trust meets care. Empowering your mental well-being with
            Generative AI
          </p>
          <div className="flex justify-center items-center">

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 8px rgba(0, 255, 0, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            type="submit"
            onClick={() => navigate(currentUser===null ? "/sign-in" :currentUser.gender==="Not specified" || currentUser.age===0 ?  "/profile" : "/chat")}
            className="font-serif bg-gradient-to-r text-2xl from-green-900 to-green-950 text-white py-3 px-6 rounded-full flex items-center justify-center gap-2 font-medium hover:shadow-lg "
          >
            <p>{currentUser ? "Chat Now" : "Get Started"}</p>
            <TbArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HeroBanner;
