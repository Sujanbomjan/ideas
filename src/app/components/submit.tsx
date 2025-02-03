"use client";

import { useState } from "react";
import { Button } from "rizzui";

const SubmitForm = () => {
  const [name, setName] = useState(""); // State for the name
  const [message, setMessage] = useState(""); // State for the message

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/submissions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }), // Include name and message in the request body
      }
    );

    if (res.ok) {
      alert("Your thoughts have been shared with the universe! 🌟");
      setName(""); // Reset the name field
      setMessage(""); // Reset the message field
    } else {
      alert("Something went wrong. Try again and let your words flow.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full transform transition-all duration-300 hover:scale-105">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4 animate-pulse">
          What&#39;s on your mind?
        </h1>
        <p className="text-center text-gray-600 mb-6 italic">
          Every thought is a story waiting to be told. Share yours with us.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <input
            type="text"
            id="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border-2 border-gray-300 text-black focus:ring-2 focus:ring-indigo-300 rounded-lg p-3"
          />

          {/* Message Input */}
          <textarea
            id="message"
            placeholder="Write your thoughts, dreams, or confessions here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full border-2 border-gray-300 text-black focus:ring-2 focus:ring-indigo-300 rounded-lg p-3"
          />

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              color="primary"
              className="px-6 py-2 text-lg font-semibold bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              Send Your Thoughts 🚀
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitForm;