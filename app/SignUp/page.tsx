import React from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <section className="bg-[#F7F7F9] w-screen min-h-screen relative text-black">
      <div className="w-[24.167vw] h-[8.385vw] py-[5vw] flex flex-col justify-center items-center ml-[12.656vw]">
        <h1 className="font-bold text-[#22B786] text-[3.646vw]">PennyTrack</h1>
        <p className="text-[#7a7575] text-[1.302vw]">
          Create Your Account to Start
        </p>
      </div>
      <div className="w-[27.865vw] h-[34.896vw] flex flex-col items-center justify-between mt-[2vw] ml-[11vw]">
        <div>
          <p className="text-[1.042vw] mb-[0.7vw]">Name*</p>
          <input
            type="text"
            className="w-[27.865vw] h-[3.594vw] bg-[#22B786] bg-opacity-[15%] rounded-[0.521vw] shadow-md shadow-gray-300 px-[1vw]"
            placeholder="Your Name"
          />
        </div>
        <div>
          <p className="text-[1.042vw] mb-[0.7vw]">Email*</p>
          <input
            type="text"
            className="w-[27.865vw] h-[3.594vw] bg-[#22B786] bg-opacity-[15%] rounded-[0.521vw] shadow-md shadow-gray-300 px-[1vw]"
            placeholder="example@gmail.com"
          />
        </div>
        <div>
          <p className="text-[1.042vw] mb-[0.7vw]">Phone Number*</p>
          <input
            type="text"
            className="w-[27.865vw] h-[3.594vw] bg-[#22B786] bg-opacity-[15%] rounded-[0.521vw] shadow-md shadow-gray-300 px-[1vw]"
            placeholder="+62-xxx-xxxx-xxxx"
          />
        </div>
        <div>
          <p className="text-[1.042vw] mb-[0.7vw]">Password*</p>
          <input
            type="password"
            className="w-[27.865vw] h-[3.594vw] bg-[#22B786] bg-opacity-[15%] rounded-[0.521vw] shadow-md shadow-gray-300 px-[1vw]"
            placeholder="Your Password"
          />
          <div className="flex items-center w-full mt-[1vw]">
            <input type="checkbox" className="w-[0.781vw] h-[0.781vw]" />
            <p className="text-[0.677vw] ml-[0.5vw]">
              By creating an account you agree to our{" "}
              <Link href="/" className="text-blue-700">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/" className="text-blue-700">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
        <button className="w-[19.271vw] h-[3.073vw] font-bold text-[0.938vw] rounded-[0.521vw] bg-[#92E1C7] shadow-sm shadow-gray-300 text-white hover:scale-[102%] ease-in-out duration-300">
          Create your account
        </button>
      </div>
      <div className="w-[50vw] h-full z-0 absolute top-0 right-0">
        <Image
          src="/image/bgSignUp.png"
          layout="fill"
          objectFit="cover"
          alt="sign up login"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-green-500 opacity-30"></div>
      </div>
    </section>
  );
};

export default page;
