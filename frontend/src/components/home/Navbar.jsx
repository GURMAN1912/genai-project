import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/user/userSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BsList } from "react-icons/bs";
import { PiSignOut, PiUser } from "react-icons/pi";
import { CiLogin } from "react-icons/ci";
import { SiGnuprivacyguard } from "react-icons/si";

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation().pathname.split("/")[1];
  const [showMenu, setShowMenu] = useState(false);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  const handleSignOut = async () => {
    try {
      const res = await axios.post("/auth/sign-out");
      const data = await res.data;
      if (res.status === 200) {
        toast.success("Sign out successful");
        dispatch(signOut());
        navigate("/sign-in");
        setShowMenu(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollY > 130) {
      controls.start({
        height: "70px",
        backgroundColor: "#fff",
        paddingTop: "0px",
        transition: { duration: 0.5 },
      });
    } else {
      controls.start({
        height: "100px",
        paddingTop: "10px",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        transition: { duration: 0.5 },
      });
    }
  }, [scrollY, controls]);

  if (location === "chat") {
    return null;
  }

  return (
    <>
      <motion.div
        animate={controls}
        initial={{
          height: "100px",
          paddingTop: "20px",
          backgroundColor: "rgba(255, 255, 255, 0)",
        }}
        style={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          boxShadow: scrollY > 150 ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        className=""
      >
        <div className="w-full p-4 flex hover:cursor-pointer text-[#012f2c] items-center md:justify-evenly justify-between px-10">
          <div onClick={() => navigate("/")}>
            <h1 className="italic text-4xl font-sans font-semibold">Mindful</h1>
          </div>

          <div className="font-serif hidden md:flex">
            <ul className="flex gap-8 text-xl">
              <li
                className="cursor-pointer hover:underline hover:text-[#00a884] transition-colors"
                onClick={() => navigate("/")}
              >
                Home
              </li>
              <li
                className="cursor-pointer hover:underline hover:text-[#00a884] transition-colors"
                onClick={() => navigate("/about")}
              >
                About
              </li>
              <li
                className="cursor-pointer hover:underline hover:text-[#00a884] transition-colors"
                onClick={() => navigate("/contact")}
              >
                Contact
              </li>
            </ul>
          </div>

          <div className="md:flex font-serif text-xl gap-4 hidden">
            {currentUser ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Profile"
                  onClick={() => navigate("/profile")}
                  className="flex gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-[#fefefd] transition-transform duration-200"
                >
                  <p>Profile</p>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Sign Out"
                  onClick={handleSignOut}
                  className="px-5 py-2 flex gap-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-[#fefefd] transition-transform duration-200"
                >
                  <p>Sign out</p>
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Log In"
                  onClick={() => navigate("/sign-in")}
                  className="px-5 flex gap-2 py-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-[#fefefd] transition-transform duration-200"
                >
                  <p>Log In</p>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Sign Up"
                  onClick={() => navigate("/sign-up")}
                  className="px-5 flex gap-2 py-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-[#fefefd] transition-transform duration-200"
                >
                  <p>Sign Up</p>
                </motion.button>
              </>
            )}
          </div>

          <div className="md:hidden">
            {showMenu ? (
              <IoClose
                className="text-2xl"
                onClick={() => setShowMenu(!showMenu)}
              />
            ) : (
              <BsList
                className="text-2xl"
                onClick={() => setShowMenu(!showMenu)}
              />
            )}
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="font-serif z-[99999] block shadow-2xl mt-[70px] p-4  bg-[#ffffff] text-[#012f2c] text-xl fixed top-0 left-0 w-full z-1000">
          <div className="flex flex-col">
            <Link
              to={"/"}
              className="cursor-pointer hover:underline hover:text-[#00a884] transition-colors"
              onClick={() => setShowMenu(!showMenu)}
            >
              Home
            </Link>
            <Link
              to={"/about"}
              className="cursor-pointer hover:underline hover:text-[#00a884] transition-colors"
              onClick={() => setShowMenu(!showMenu)}
            >
              About
            </Link>
            <Link
              to={"/contact"}
              className="cursor-pointer hover:underline hover:text-[#00a884] transition-colors"
              onClick={() => setShowMenu(!showMenu)}
            >
              Contact
            </Link>
            {currentUser ? (
              <>
                <Link
                  to={"/profile"}
                  className="cursor-pointer hover:underline hover:text-[#00a884] transition-colors"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  Profile
                </Link>
                <div
                  className="cursor-pointer hover:underline hover:text-[#00a884] transition-colors"
                  onClick={handleSignOut}
                >
                  Sign Out
                </div>
              </>
            ) : (
              <>
                <Link
                  to={"/sign-in"}
                  className="cursor-pointer hover:underline hover:text-[#00a884] transition-colors"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  Log In
                </Link>
                <Link
                  to={"/sign-up"}
                  className="cursor-pointer hover:underline hover:text-[#00a884] transition-colors"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
