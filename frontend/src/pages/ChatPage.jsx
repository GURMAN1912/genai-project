import React, { useEffect, useState } from "react";
import ChatHeader from "../components/chat/ChatHeader";
import Sidebar from "../components/chat/Sidebar";
import MainContent from "../components/chat/MainContent";
import ChatSection from "../components/chat/ChatSection";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const showSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="min-h-screen max-h-full  w-screen max-w-full  bg-[#f4ded1] text-gray-200 flex">
      {/* Main Content */}
      <div
        className={`flex-1 font-serif flex flex-col transition-all duration-300 ease-in-out w-full`}
      >
        <ChatHeader showSidebar={showSidebar} isOpen={isOpen} />
        {/* <MainContent /> */}
        <div
          className={`h-full ${
            isOpen === true ? "sm:pl-[16rem]" : "pl-0"
          }  w-full`}
        >
          <ChatSection
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            showSidebar={showSidebar}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
