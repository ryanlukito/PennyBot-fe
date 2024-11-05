import React from "react";
import NavBar from "../components/NavBar";
import { FaPlus } from "react-icons/fa6";

const page = () => {
  return (
    <section className="bg-[#F7F7F9] w-screen h-screen relative text-black flex items-center">
      <NavBar></NavBar>
      <div className=" h-full py-[1.6vw] px-[2vw]">
        <h1 className="text-[2.5vw] font-bold text-[#22B786]">New Expenses</h1>
        <div className="w-[39.323vw] h-[35vw] text-[1.042vw] mt-[2vw] flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <h1>Subject*</h1>
            <input
              type="text"
              className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw]"
            />
          </div>
          <div className="flex justify-between items-center">
            <h1>Merchant*</h1>
            <input
              type="text"
              className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw]"
            />
          </div>
          <div className="flex justify-between items-center">
            <h1>Date*</h1>
            <input
              type="text"
              className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw]"
            />
          </div>
          <div className="flex justify-between items-center">
            <h1>Total*</h1>
            <input
              type="text"
              className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw]"
            />
          </div>
          <div className="flex justify-between items-center">
            <h1>Category*</h1>
            <input
              type="text"
              className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw]"
            />
          </div>
          <div className="flex justify-between items-center">
            <h1>Description*</h1>
            <input
              type="text"
              className="bg-[#E2ECEA] w-[31.771vw] h-[5.938vw] rounded-[0.521vw]"
            />
          </div>
          <div className="flex justify-between items-center">
            <h1>
              Payment <br />
              Method*
            </h1>
            <input
              type="text"
              className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw]"
            />
          </div>
          <button className="w-[8.177vw] h-[2.865vw] font-bold text-[1.042vw] rounded-[0.521vw] bg-[#22B786] text-white hover:scale-[102%] ease-in-out duration-300 ml-[7.7vw]">
            Save
          </button>
        </div>
      </div>
      <div className="w-[26.302vw] h-[32.76vw] bg-[#E2ECEA] text-[1.042vw] mb-[3vw] flex items-center justify-center">
        <button className="flex flex-col items-center justify-center">
          <FaPlus className="text-[4vw]" />
          <h1>Upload an Invoice</h1>
        </button>
      </div>
    </section>
  );
};

export default page;
