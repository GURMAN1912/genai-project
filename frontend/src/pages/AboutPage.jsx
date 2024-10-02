import React from "react";
import team from "../assets/team.jpg";
import { motion } from "framer-motion";
const AboutPage = () => {
  return (
    <motion.div
      initial={{ y: 500 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="w-full h-full font-serif mt-20 bg-[#f4ded1] py-12 px-4"
    >
      <div className="container md:w-2/3 bg-white rounded-xl shadow-xl p-8 mx-auto">
        {/* Main Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#012f2c] mb-4">About Us</h1>
          <p className="text-lg text-gray-600">
            We are passionate about creating meaningful experiences through our
            innovative solutions.
          </p>
        </div>

        {/* About Us Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="w-full md:w-1/2">
              <img
                src={team}
                alt="Our Team"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-semibold text-[#012f2c] mb-6">
                Who We Are
              </h2>
              <p className="text-gray-600 text-lg mb-4">
                We are a team of passionate final-year B.Tech students, driven
                by a shared vision to leverage cutting-edge technology for
                impactful solutions. Our mission is to create innovative,
                AI-powered products that provide mental health support and
                emotional well-being for students.
              </p>
              <p className="text-gray-600 text-lg">
                With a strong foundation in software development and artificial
                intelligence, we combine creativity, empathy, and technical
                expertise to build tools that make a difference. Through
                collaboration and dedication, we aim to empower individuals and
                help them navigate the challenges of student life with
                confidence and support.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="mb-16 bg-white p-10 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-center text-[#012f2c] mb-6">
            Our Mission
          </h2>
          <p className="text-gray-600 text-lg text-center mb-8">
            Our mission is to harness the power of artificial intelligence to
            create a compassionate and accessible solution that supports mental
            health and emotional well-being. We strive to build an AI-powered
            chatbot that not only understands but empathizes with the unique
            challenges faced by students.
          </p>
        </section>

        {/* Our Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center text-[#012f2c] mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQHH7XFkFvhDqQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1698765116944?e=1733356800&v=beta&t=kddkpW-ObUC9ZPp6zCzUcHP_amRthAAyXyoI4tmnems"
                alt="Team Member 1"
                className="rounded-full w-32 h-32 mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-[#012f2c]">Dhanraj</h3>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQEtpNxXBD81Zw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1670164439428?e=1733356800&v=beta&t=MxdDnyCj3q0d5ITjO33rWQFYR221kxWC5N4nBZZGtbk"
                alt="Team Member 2"
                className="rounded-full w-32 h-32 mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-[#012f2c]">Gurman</h3>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQFxKdZgMyYcFA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1683805473233?e=1733356800&v=beta&t=Bb3cpcE11A5FVoKdsRZ9gRh1qk7YbIC6gaDGedeQfVI"
                alt="Team Member 3"
                className="rounded-full w-32 h-32 mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-[#012f2c]">Krishan</h3>
            </div>
            {/* Team Member 4 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <img
                src="https://media.licdn.com/dms/image/v2/D4E03AQE4K5ZEfHaTmQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1720804839326?e=1733356800&v=beta&t=Px0Abp_iCG_zjviT9bkfSMWJSMWxWpOvZg7vh7oFypU"
                alt="Team Member 4"
                className="rounded-full w-32 h-32 mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-[#012f2c]">Suyash</h3>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-600 mt-16">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="italic font-sans">Mindful</span>. All rights
            reserved.
          </p>
        </footer>
      </div>
    </motion.div>
  );
};

export default AboutPage;
