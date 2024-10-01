import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { PiList } from 'react-icons/pi';
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { signOut } from "../../redux/user/userSlice";

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
  
    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      media.addEventListener('change', listener);
  
      return () => media.removeEventListener('change', listener);
    }, [matches, query]);
  
    return matches;
  };

export default function Sidebar({ showSidebar, isOpen, setIsOpen }) {
    
    // Custom prompt for the AI
    const userInput =
    "Today I scored very low on my test.Now i am sad and dont know what to do?";
    
    const customPrompt = 
    "give a single title only for this in strictly 2-4 words."
    
    const [chatTitle, setChatTitle] = useState("");

    useEffect(() => {
        handleSendMessage();
        // Empty dependency array ensures this runs only once
    }, []);
    
    const handleSendMessage = async () => {
        
        try {
            console.log(import.meta.env.GEMINI_API);
            const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);
            const model = genAI.getGenerativeModel(
          { model: "gemini-1.5-flash" },
          {
            temperature: 0.5,
            maxTokens: 100,
            responseLength: 1000,
        }
    );
    const combinedPrompt = `${userInput}. ${customPrompt}`;
    
    const result = await model.generateContent(combinedPrompt);
    const responseText = result.response.text();
    setChatTitle(responseText);
    
} catch (error) {
    console.error("Error fetching story:", error);
} 
}

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignOut = () => {
        try {
          dispatch(signOut());
          toast.success("Sign out successful!");
          navigate("/");
        } catch (err) {
          console.log(err);
        }
      };

      const isMediumToLargeScreen = useMediaQuery('(min-width: 768px)'); 

      useEffect(() => {
        // Set default value based on the screen size
        if (isMediumToLargeScreen) {
          setIsOpen(true); // Open sidebar for medium-to-large devices
        } else {
          setIsOpen(false); // Close sidebar for small devices
        }
      }, [isMediumToLargeScreen]);

  return (
    <aside
      className={`fixed top-0 left-0 h-full py-4 w-64 bg-[#eae2b1] text-[#012f2c] transform transition-transform duration-700 ease-in-out z-50
            ${ isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      {/* Header with toggle and edit icons */}
      <div className="flex w-full justify-between font-serif items-center m py-3 md:mb-4">
        <TbLayoutSidebarLeftCollapseFilled 
          className=" cursor-pointer ml-6"
          size={28}
          onClick={showSidebar}  
        />
        <FaEdit className=" cursor-pointer mr-2" size={25} />
      </div>

      {/* Content */}
      <div className="flex flex-col items-start ml-2 font-serif text-left">
        <p className="text-xl font-semibold">Today:</p>
        <ul className="py-2 w-60">

          <li className="flex justify-between bg-[#ecce7e] border-2 text-gray-800 font-semibold border-[#012f2c] rounded-full p-2 cursor-pointer">
            <span>{chatTitle || "New Chat"}</span>
            <button onClick={handleDeleteChat}>
              <TbTrash className="text-red-500" size={20} />
            </button>
          </li>
        </ul>
      </div>

      {/* Previous 7 Days Section */}
      <div className="flex flex-col items-start ml-2 font-serif text-left">
        <p className="text-xl my-2 font-semibold">Previous 7 Days:</p>
        <ul className="space-y-2">
        </ul>
      </div>

      {/* Log out button */}
      <div className="my-4 absolute font-serif bottom-0 w-full">
        <button
           onClick={handleSignOut} //handleSignOut
          className="bg-[#f36400] w-56 py-2 mx-4 rounded-full  text-xl font-semibold  hover:bg-[#fc8f41] transition duration-800 ease-in-out hover:border-0 hover:border-[#ffffff]"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
