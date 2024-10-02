import React, { useRef, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { useLocation, Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
const Footer = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const form = useRef(); // Create a reference for the form
  const location = useLocation().pathname.split("/")[1];
  if (location === "chat") {
    return null; // Don't render footer if on chat page
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const serviceID = "service_kwa00u9";
    const templateID = "template_6t5abtv";
    const publicKey = "Yu_vD7UVTICZDhxb8";

    const templateParams = {
      to_email: email,
      to_name: email,
      reply_to: email,
      note: "Sign up for our newsletter",
    };

    console.log("Sending email to:", templateParams.to_email); // Log the recipient's email

    // Use the form reference with sendForm
    emailjs.sendForm(serviceID, templateID, form.current, publicKey).then(
      (response) => {
        console.log("Email sent successfully!", response.status, response.text);
        setMessage("Thank you for subscribing to our newsletter!");
        setEmail(""); // Reset email input
        toast.success("Thank you for subscribing to our newsletter!"); // Display success toast
      },
      (error) => {
        console.error("Failed to send email.", error.text); // Log error details
        setMessage("Sorry, something went wrong. Please try again later.");
      }
    );
  };

  return (
    <footer className="bottom-0 flex flex-col bg-[#012f2c] text-[#fbf7f0] w-full pb-10">
      <div className="flex flex-col items-center mt-10">
        <h1 className="italic text-[#e0bf40] font-sans text-7xl mb-8">
          Mindful
        </h1>
      </div>
      <div className="newsletter text-center font-serif mt-4 px-5">
        <h2 className="font-semibold">Join Our Newsletter</h2>
        <p className="mb-4">
          Mental health and wellness tips, our latest guides, resources, and
          more.
        </p>
        <form
          ref={form}
          onSubmit={handleNewsletterSubmit}
          className="flex font-serif justify-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email address"
            name="to_email" // Ensure the input has a name attribute matching your template parameters
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Capture email input
            required // Add required validation
            className="rounded-full bg-[#3a4f4b] text-[#fbf7f0] px-4 focus:outline-none focus:ring-2 focus:ring-[#e0bf40] focus:ring-opacity-50"
          />
          <button
            type="submit" // Set button type to submit
            className="bg-[#1e675a] text-[#fbf7f0] py-2 px-4 rounded hover:bg-[#1b5a4c] transition duration-200"
          >
            Sign Up
          </button>
        </form>
        {message && <p className="mt-4 text-green-500">{message}</p>}{" "}
        {/* Display message if exists */}
      </div>
      <hr className="border-white my-6 mx-10" />
      <div className="font-semibold text-[#fbf7f0] font-serif flex-col mx-auto md:flex-row flex justify-center mt-6 gap-10 md:gap-40">
        <div>
          <ul className="flex flex-col gap-2">
            <Link
              to="/about"
              className="hover:text-[#e0bf40] hover:underline font-bold text-xl mb-2"
            >
              About Us
            </Link>
            <Link to="/about" className="hover:text-[#e0bf40] hover:underline">
              Meet Our Team
            </Link>
            <Link to="/about" className="hover:text-[#e0bf40] hover:underline">
              Our Story
            </Link>
            <Link to="/about" className="hover:text-[#e0bf40] hover:underline">
              Advisory Council
            </Link>
          </ul>
        </div>
        <div>
          <ul className="flex flex-col gap-2">
            <Link className="hover:text-[#e0bf40] hover:underline font-bold text-xl mb-2">
              Resources
            </Link>
            <Link className="hover:text-[#e0bf40] hover:underline">
              Harvard Health
            </Link>
            <Link className="hover:text-[#e0bf40] hover:underline">
              Meditation
            </Link>
            <Link className="hover:text-[#e0bf40] hover:underline">
              Newsletter
            </Link>
          </ul>
        </div>
        <div>
          <ul className="flex flex-col gap-2">
            <Link
              to="/contact"
              className="hover:text-[#e0bf40] hover:underline font-bold text-xl mb-2"
            >
              Get In Touch
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#e0bf40] hover:underline"
            >
              Contact Us
            </Link>
            <Link className="hover:text-[#e0bf40] hover:underline font-extralight flex gap-1 text-sm">
              <CiLocationOn className="h-5 w-5" />
              B74 Sector 56 Noida
            </Link>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
