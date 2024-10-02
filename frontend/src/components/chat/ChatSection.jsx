import React, { useState, useRef, useEffect, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";
import "react-quill/dist/quill.snow.css";
import arrow from "../../assets/arrow.gif";
import axios from "axios";
import { useSelector } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";
import Sidebar from "./Sidebar";

const ChatSection = ({ isOpen, setIsOpen, showSidebar }) => {
  const { currentUser } = useSelector((state) => state.user);
  // const [typedResponse, setTypedResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const customPrompt =
    "Provide empathetic advice and use emojis to show encouragement.";
  const lastMessageRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(`/chat/${currentUser._id}`);
        const chatData = response.data;
        console.log("Chat History (Fetched):", chatData);

        if (Array.isArray(chatData.messages)) {
          setChatHistory(chatData.messages);
        } else {
          console.error("Messages is not an array:", chatData.messages);
          setChatHistory([]);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchChatHistory();
  }, [currentUser._id]);
  useEffect(() => {
    if (lastMessageRef.current && chatContainerRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  const handleSendMessage = useCallback(async () => {
    if (!userInput.trim()) return;
    if (loading) return;

    // Adding user message to chat history
    const newChatHistory = [
      ...chatHistory,
      { sender: "user", message: userInput },
    ];
    setChatHistory(newChatHistory);
    setLoading(true);

    try {
      // Build the conversation context for the AI model
      const previousMessages = newChatHistory
        .map((message) => `${message.sender === 'user' ? 'User' : 'Bot'}: ${message.message}`)
        .join("\n");
      
      const combinedPrompt = `${previousMessages}\n${customPrompt}`;

      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);
      const model = genAI.getGenerativeModel({
        model: "tunedModels/mental-health-model-v343l4826azy",
      });

      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };

      const history = chatHistory.map((message) => ({
        role: message.sender === "user" ? "user" : "model",
        parts: [{ text: message.message }],
      }));

      const chatSession = model.startChat({
        generationConfig,
        history: [
          ...history,
          {
            role: "user",
            parts: [{ text: userInput }],
          },
        ],
      });

      const result = await chatSession.sendMessage(
        userInput + "," + customPrompt
      );
      const responseText = result.response
        ? result.response.text()
        : "Sorry, I didn't understand that.";

      // Adding AI-generated message to chat history
      setChatHistory((prevChat) => [
        ...prevChat,
        { sender: "bot", message: responseText },
      ]);
      await axios.post("/chat/user-message", {
        message: userInput,
        userId: currentUser._id,
      });
      await axios.post("/chat/bot-message", {
        message: responseText,
        userId: currentUser._id,
      });
    } catch (error) {
      console.error("Error fetching story:", error);
      setChatHistory((prevChat) => [
        ...prevChat,
        {
          sender: "bot",
          message: "Sorry, I encountered an issue. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
      setUserInput(""); // Clear input field
    }
  }, [userInput, loading, chatHistory, customPrompt, currentUser._id]);

  const usernameVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      ref={chatContainerRef}
      className="lg:w-[50rem] md:w-[40rem] sm:w-[30rem] w-[20rem] max-w-full mx-auto p-6 bg-[#f4ded1] flex flex-col justify-between h-full pt-24"
    >
      <Sidebar
        showSidebar={showSidebar}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        chatHistory={chatHistory}
        setChatHistory={setChatHistory}
      />
      {chatHistory.length === 0 && (
        <div className="flex flex-col h-full justify-center items-center gap-2">
          <h1 className="md:text-6xl sm:text-4xl text-3xl font-semibold text-gray-800 flex  items-end">
            Hello ,
            <motion.span
              variants={usernameVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.9 }}
              className="ml-2 bg-gradient-to-r from-orange-400 to-orange-700 bg-clip-text text-transparent mr-1 "
            >
              {currentUser.name}
            </motion.span>
          </h1>
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-semibold text-gray-600 flex mt-3 ml-8 text-nowrap">
            <p>How can I help you today?😊</p>
          </h1>
          <p className="mt-4 md:text-2xl sm:text-xl text-xl font-semibold text-gray-500 text-center ">
            &quot;Mental health is not a destination, but a process. It&apos;s
            about how you drive, not where you&apos;re going.&quot;
          </p>
          <div className="flex justify-between w-full mt-5 max-md:hidden">
            <div>
              <img src={arrow} alt="" style={{ transform: "scaleX(-1)" }} />
            </div>
            <div className="mt-5">
              <img src={arrow} alt="" />
            </div>
          </div>
        </div>
      )}

      <div className="w-full">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            ref={index === chatHistory.length - 1 ? lastMessageRef : null}
            className={`mb-3 md:mb-4  md:p-5 p-3 ${
              message.sender === "user"
                ? "bg-[#f3e5ac] text-gray-800 text-right rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl w-full"
                : "bg-[#f6e6f6] text-gray-800 text-left rounded-tr-2xl rounded-br-2xl rounded-tl-2xl w-full"
            }`}
          >
            <p className="sm:text-lg  text-sm">
              {message.message || "no text available"}
            </p>
          </div>
        ))}

        {loading && (
          <div className="items-center">
            <SyncLoader color="#34495e" size={10} />  
          </div>
        )}
      </div>

      <div className="relative p-4 w-full flex items-center">
        <input
          type="text"
          className={`bg-gray-300 p-3 pl-4 rounded-full w-full outline-none ${loading?"cursor-not-allowed":""}   text-gray-800 placeholder-gray-900 pr-12 shadow-lg`}
          value={userInput}
          disabled={loading}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <button
          onClick={handleSendMessage}
          className={`absolute right-5 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 ${userInput==""?"hidden":"visible"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="sm:h-6 sm:w-6 h-5 w-5 text-gray-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
