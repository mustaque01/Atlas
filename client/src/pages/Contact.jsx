import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4 py-12 bg-black">
      <div className="w-full max-w-5xl bg-gray-900/50 backdrop-blur-sm shadow-2xl rounded-2xl p-6 md:p-10">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-rose-500 text-center transition-all">
          We Are Here to Help
        </h2>
        <p className="text-base md:text-lg text-gray-300 mt-4 text-center max-w-2xl mx-auto">
          Have a question or need assistance? Contact us and our team will get back to you as soon as possible.
        </p>

        {/* Contact Information Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: FaPhoneAlt, title: "Call Us", info: "+1 (800) 123-4567" },
            { icon: FaEnvelope, title: "Email Us", info: "support@atlasbank.com" },
            { icon: FaMapMarkerAlt, title: "Visit Us", info: "123 Finance Street, NY, USA" }
          ].map((item, index) => (
            <div key={index} className="p-6 bg-gray-800/50 rounded-xl shadow-lg hover:bg-gray-800/70 transition-all duration-300 border border-gray-700/50">
              <item.icon className="text-rose-500 text-3xl md:text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-100">{item.title}</h3>
              <p className="text-gray-300 mt-2">{item.info}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="mt-12">
          <h3 className="text-2xl md:text-3xl font-semibold text-rose-500 text-center mb-8">
            Send Us a Message
          </h3>
          <form className="max-w-3xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg 
                         text-gray-100 placeholder-gray-400
                         focus:ring-2 focus:ring-rose-500 focus:border-transparent
                         transition-all duration-300"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg 
                         text-gray-100 placeholder-gray-400
                         focus:ring-2 focus:ring-rose-500 focus:border-transparent
                         transition-all duration-300"
              />
            </div>
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg 
                       text-gray-100 placeholder-gray-400
                       focus:ring-2 focus:ring-rose-500 focus:border-transparent
                       transition-all duration-300"
            ></textarea>
            <button
              type="submit"
              className="w-full p-4 bg-rose-500 text-white font-semibold rounded-lg
                       hover:bg-rose-600 active:bg-rose-700
                       transition-all duration-300 transform hover:scale-[0.99]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}