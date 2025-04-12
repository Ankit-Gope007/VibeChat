"use client";
import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import axios from "axios";
import { contactMeRoute } from "@/apiRoutes";
import { toast } from "sonner";

const page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data Submitted:", formData);
    const response = await axios.post(contactMeRoute, formData, { withCredentials: true });
    if (response.status === 201) {
      toast.success("Message sent successfully!");
    }
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };


  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "hidden"; // Reset on unmount
    };
  }, []);
  return (
    <div className="pb-10 w-full min-h-screen bg-blue-50 text-gray-900 ">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center p-10">
        <motion.img
          src="https://media.licdn.com/dms/image/v2/D4E03AQEzmn_j7VjItg/profile-displayphoto-shrink_800_800/B4EZUprcRLH0Ac-/0/1740161010300?e=1748476800&v=beta&t=424rDzvIIJt7CK6CBAQd3DSj-CuRlWqFKey7LiS4W2M"
          alt="Profile"
          className="w-40 h-40 rounded-full shadow-lg mb-5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <h1 className="text-4xl font-bold">Ankit Gope</h1>
        <p className="text-lg text-gray-600">Passionate Web Developer | Full Stack Enthusiast</p>
      </section>

      {/* Bio Section */}
      <section className="max-w-4xl mx-auto p-10">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-700 leading-relaxed">
          💻 I’m a self-driven full-stack web developer with a strong passion for problem-solving and building scalable applications. I specialize in the MERN stack (MongoDB, Express.js, React.js, Node.js) and have hands-on experience in Next.js, Tailwind CSS, and Firebase. I love working on projects that challenge my skills, whether it’s backend API development, frontend UI/UX, or full-stack applications.

          Currently, I’m pursuing Civil Engineering at NIT Durgapur, but my true passion lies in coding, web development, and exploring new technologies. My goal is to build impactful digital solutions, contribute to open-source, and grow as a software developer. 🚀
        </p>
      </section>

      {/* Skills Section */}
      <section className="max-w-4xl mx-auto p-10">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {['JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Next.js', 'Figma',].map((skill, index) => (
            <motion.span
              key={index}
              className="px-4 py-2 bg-blue-200 rounded-md text-blue-900 font-semibold"
              whileHover={{ scale: 1.1 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </section>

      {/* Social Links */}
      <section className="max-w-4xl mx-auto p-10">
        <h2 className="text-2xl font-semibold mb-4">Connect with Me</h2>
        <div className="flex gap-5 text-3xl">

          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Ankit-Gope007" className="cursor-pointer text-gray-900 hover:text-blue-600">
            <FaGithub />
          </a>

          <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/ankit-gope-b85313324/" className="cursor-pointer text-gray-900 hover:text-blue-600">
            <FaLinkedin />
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://x.com/ankitgope106" className="cursor-pointer text-gray-900 hover:text-blue-600">
            <FaTwitter />
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/im_madara_og/?hl=en" className="cursor-pointer text-gray-900 hover:text-blue-600">
            <AiFillInstagram />
          </a>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-4xl mx-auto p-10 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Contact Me</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <textarea
            rows="4"
            name="message"

            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default page;
