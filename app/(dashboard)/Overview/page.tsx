import React from "react";
import NavBar from "@/app/components/NavBar";
import Image from "next/image";

const page = () => {
  return (
    <section className="bg-[#E2ECEA] w-screen h-screen relative text-black flex flex-row overflow-hidden">
      <NavBar></NavBar>
      <div className="flex flex-col">
        <div className="w-[75.469vw] h-[2.813vw] flex items-center justify-between mt-[1vw] ml-[1vw]">
          <div className="h-full flex items-center justify-center">
            <Image
              src="/image/overview.png"
              width={10000}
              height={10000}
              alt="overview"
              className="w-[2.969vw] h-[2.344vw]"
            />
            <h1 className="font-bold text-[1.8vw] ml-[0.5vw]">Overview</h1>
          </div>
          <div className="w-[20vw] h-[2.813vw] bg-white rounded-[0.521vw]"></div>
        </div>
        <div className="w-[69.531vw] h-[46vw] flex flex-col justify-between ml-[4.7vw] mt-[1.5vw]">
          <div className="w-full h-[25.031vw] flex justify-between">
            <div className="w-[13vw] h-full flex flex-col justify-between">
              <div className="w-full h-[7vw] bg-[#92E1C7] rounded-[0.521vw]"></div>
              <div className="w-full h-[7vw] bg-[#C8CEF7] rounded-[0.521vw]"></div>
              <div className="w-full h-[7vw] bg-[#F3BBBC] rounded-[0.521vw]"></div>
            </div>
            <div className="w-[54.344vw] h-full bg-white rounded-[0.521vw]">
              ini bar chart
            </div>
          </div>
          <div className="w-full h-[20vw] bg-white rounded-[0.521vw] mt-[1vw]"></div>
        </div>
      </div>
    </section>
  );
};

export default page;
