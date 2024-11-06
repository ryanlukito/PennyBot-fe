"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const sources = [
  {
    src: "/image/overview.png",
    width: "w-[1.563vw]",
    height: "h-[1.563vw]",
    text: "Overview",
    linkto: "/Overview",
  },
  {
    src: "/image/expensesDetail.png",
    width: "w-[1.563vw]",
    height: "h-[1.563vw]",
    text: "Expenses Detail",
    linkto: "/ExpensesDetail",
  },
  {
    src: "/image/expenses.png",
    width: "w-[1.563vw]",
    height: "h-[1.563vw]",
    text: "Expenses",
    linkto: "/InputExpenses",
  },
  {
    src: "/image/pennybot.png",
    width: "w-[1.563vw]",
    height: "h-[1.563vw]",
    text: "PennyBot",
    linkto: "/PennyBot",
  },
];

const NavBar = () => {
  return (
    <div className="h-full w-[19.635vw] bg-[#F7F7F9] shadow-[0.208vw_0_0.208vw_rgba(0,0,0,0.3)] flex flex-col items-center relative">
      <div className="w-[11.615vw] h-[15.104vw] flex flex-col justify-between items-center mt-[1.5vw]">
        <h1 className="text-[1.667vw] font-bold text-[#22B786]">PennyTrack</h1>
        <Image
          src="/image/profilePicture.png"
          width={10000}
          height={10000}
          alt="profile picture"
          className="w-[8.17vw] h-[8.17vw]"
        />
        <h1 className="text-[1.042vw] font-bold text-black">Adam Miah</h1>
      </div>
      <div className="w-[11.367vw] h-[15.99vw] text-[1.042vw] font-bold mt-[2vw] flex flex-col justify-around items-start">
        {sources.map((client, index) => (
          <Link href={client.linkto} className="flex items-center" key={index}>
            <Image
              src={client.src}
              width={10000}
              height={10000}
              alt={client.text}
              className={`${client.width} ${client.height} object-cover`}
            />
            <h1 className="text-[1.042vw] ml-[0.5vw]">{client.text}</h1>
          </Link>
        ))}
      </div>
      <Link
        href="/Login"
        className="flex items-center justify-center absolute bottom-[2vw] left-[4.2vw]"
      >
        <Image
          src="/image/logout.png"
          width={10000}
          height={10000}
          alt="log out"
          className="w-[1.563vw] h-[1.563vw] object-cover"
        />
        <h1 className="text-[1.042vw] font-bold ml-[0.5vw]">Log Out</h1>
      </Link>
    </div>
  );
};

export default NavBar;
