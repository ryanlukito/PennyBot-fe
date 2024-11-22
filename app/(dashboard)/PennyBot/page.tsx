"use client";

import React from "react";
import NavBar from "@/app/components/NavBar";
import { useState, useRef, useEffect, FormEvent } from "react";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

function formatText(text: string): string {
  // Menggantikan ** dengan tag <strong> untuk teks tebal
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Mengubah item bahan yang diawali dengan '*' menjadi <ul><li>..</li></ul>
  formattedText = formattedText.replace(/(\*\s.*?)(\r?\n|$)/g, "<li>$1</li>");
  formattedText = formattedText
    .replace(/<li>/g, "<ul><li>")
    .replace(/<\/li>/g, "</li></ul>");

  // Memisahkan setiap langkah atau paragraf menjadi <p>..</p>
  formattedText = formattedText.replace(/(\d+\.\s.*?)\:/g, "<p>$1:</p>");

  // Mengganti langkah-langkah dalam urutan nomor dengan <ol> dan <li>
  formattedText = formattedText.replace(
    /(\d+\.\s)(.*?)(\r?\n|$)/g,
    "<li>$2</li>"
  );
  formattedText = formattedText
    .replace(/<li>/g, "<ol><li>")
    .replace(/<\/li>/g, "</li></ol>");

  // Memastikan bahwa list hanya memiliki satu <ul> atau <ol> di sekitar
  formattedText = formattedText.replace(/<\/ul><ul>/g, "");
  formattedText = formattedText.replace(/<\/ol><ol>/g, "");

  // Menambahkan tag <br> untuk tiap line break yang tidak ditangani
  formattedText = formattedText.replace(/\n/g, "<br>");

  return formattedText;
}

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "applications/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage: Message = {
          id: Date.now() + 1,
          sender: "bot",
          text: data.response,
        };
        setMessages((prev) => [...prev, botMessage]);
        console.log(botMessage.text);
      } else {
        const errorMessage: Message = {
          id: Date.now() + 1,
          sender: "bot",
          text: data.error || "Something went wrong.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error fetching chat:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: "An unexpected error occurred.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#E2ECEA] relative text-black flex">
      <NavBar />
      <div className="w-[80.365vw] h-full flex flex-col bg-gray-100">
        <header className="bg-white shadow px-[1.5vw] py-[1.5vw]">
          <h1 className="text-[2.5vw] font-semibold text-gray-800">
            Chat with PennyBot
          </h1>
        </header>
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-xl ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
              ></div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="flex space-x-5"></div>
              <span className="block mx-1 w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
              <span className="block mx-1 w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></span>
              <span className="block mx-1 w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-400"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex p-4 bg-white shadow"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            className="ml-4 bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 focus:outline-none disabled:bg-blue-300"
            disabled={loading}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
