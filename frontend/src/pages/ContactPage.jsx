import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceID = "service_kwa00u9";
    const templateID = "template_6t5abtv";
    const publicKey = "Yu_vD7UVTICZDhxb8";

    const templateParams = {
      from_name: name,
      to_email: email,
      message: message,
    };

    // Sending email using emailjs with the form reference
    emailjs.sendForm(serviceID, templateID, form.current, publicKey).then(
      (response) => {
        setSuccessMessage(
          "Thank you for contacting us. We will get back to you shortly."
        );
        toast.success("Message sent successfully.");

        // Reset form fields
        setName("");
        setEmail("");
        setMessage("");
      },
      (error) => {
        console.error("Failed to send email.", error.text);
        toast.error("Sorry, something went wrong. Please try again later.");
      }
    );
  };

  return (
    <motion.div
      initial={{ y: 500 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="font-serif mt-20 bg-[#f4ded1] md:w-full w-full rounded-lg shadow-xl mx-auto h-full py-12 px-10"
    >
      <div className="container md:w-2/3 p-8 rounded-xl shadow-xl bg-white mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-lg text-[#012f2c]">
            Have questions or want to get in touch? We're here to help.
          </p>
        </div>

        {/* Contact Form Section */}
        <section className="mb-16">
          <div className="bg-white p-10 rounded-lg shadow-md">
            <form
              ref={form}
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="col-span-2">
                <label className="block text-[#012f2c] text-lg mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[#012f2c] text-lg mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[#012f2c] text-lg mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your Message"
                  className="w-full p-3 border border-gray-300 rounded-md h-32"
                  required
                />
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                >
                  Send Message
                </button>
              </div>
            </form>
            {successMessage && (
              <p className="text-green-600 text-center mt-4">
                {successMessage}
              </p>
            )}
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Email
              </h3>
              <p className="text-lg text-[#012f2c]">dhanraj02025@gmail.com</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Location
              </h3>
              <p className="text-lg text-[#012f2c]">Sector 56, Noida, India</p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Find Us
          </h2>
          <div className="w-full h-64 bg-gray-200 rounded-lg shadow-md">
            {/* Embedded Google Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7005.741471825604!2d77.33641514538908!3d28.603654452721983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce51a5f85fd55%3A0x553ee1a290ac09f9!2sSector%2056%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1727680176286!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
          </p>
        </footer>
      </div>
    </motion.div>
  );
};

export default ContactPage;
