import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbTrash,
  TbTrashOff,
} from "react-icons/tb";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { signOut } from "../../redux/user/userSlice";
import axios from "axios";

export default function Sidebar({
  showSidebar,
  isOpen,
  setIsOpen,
  chatHistory,
  setChatHistory,
}) {
  const { currentUser } = useSelector((state) => state.user);
  const [chatTitle, setChatTitle] = useState("New Chat");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Media query hook
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }, [matches, query]);
    return matches;
  };

  // Handle title update when sending a message
  const handleSendMessage = async () => {
    if (!chatHistory.length || chatTitle !== "New Chat") return;

    const userInput = chatHistory[0]?.message || "Welcome";
    const customPrompt =
      "Give a single title only for this in strictly 2-4 words.";
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        temperature: 0.5,
        maxTokens: 100,
      });

      const combinedPrompt = `The prompt is ${userInput}. ${customPrompt}`;
      const result = await model.generateContent(combinedPrompt);
      const responseText = await result.response.text();
      setChatTitle(responseText.trim());
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setChatTitle("Error generating title");
    }
  };

  // Update title in the database
  useEffect(() => {
    const putTitle = async () => {
      if (chatTitle === "New Chat") return; // Skip if the title hasn't changed
      try {
        const res = await axios.put(`/chat/${currentUser._id}`, {
          title: chatTitle,
        });
        setChatTitle(res.data.title);
      } catch (error) {
        console.error("Error updating chat title:", error);
      }
    };
    putTitle();
  }, [chatTitle, currentUser._id]);

  // Delete chat
  const handleDeleteChat = async () => {
    try {
      await axios.delete(`/chat/${currentUser._id}`);
      toast.success("Chat deleted successfully!");
      setChatTitle("New Chat");
      navigate("/chat");
      setChatHistory([]);
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  // Handle chat message effect
  useEffect(() => {
    if (chatHistory.length) {
      handleSendMessage();
    }
  }, [chatHistory]);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      dispatch(signOut());
      toast.success("Sign out successful!");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const isMediumToLargeScreen = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (isMediumToLargeScreen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isMediumToLargeScreen, setIsOpen]);

  return (
    <aside
      className={`fixed top-0 left-0 h-full py-4 w-64 bg-[#012f2c] text-white transform transition-transform duration-700 ease-in-out z-50
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Header with toggle and edit icons */}
      <div className="flex w-full justify-between shadow-lg font-serif items-center m pt-4 pb-5  md:mb-4">
        <TbLayoutSidebarLeftCollapseFilled
          className="cursor-pointer ml-6"
          size={28}
          onClick={showSidebar}
        />
        <FaEdit className="cursor-pointer mr-2" size={25} />
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
        <ul className="space-y-2"></ul>
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
