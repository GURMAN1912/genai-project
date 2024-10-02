import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/home/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { Toaster } from "react-hot-toast";
import Footer from "./components/footer/Footer";
import ChatPage from "./pages/ChatPage";
import ChatSection from "./components/chat/ChatSection";
import ArticlePage from "./components/articles/ArticlePage";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="font-serif">
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
