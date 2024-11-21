"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget
      .elements as typeof event.currentTarget.elements & {
      name: HTMLInputElement;
      email: HTMLInputElement;
      telephone: HTMLInputElement;
      password: HTMLInputElement;
    };

    const payload = {
      name: formElements.name.value,
      email: formElements.email.value,
      telephone: formElements.telephone.value,
      password: formElements.password.value,
    };

    try {
      const { data } = await axios.post("/api/auth/login", payload);
      alert(JSON.stringify(data));
      // redirect the user to /Overview
      push("/Overview");
    } catch (e) {
      const error = e as AxiosError;
      alert(error.message);
    }
  };

  return (
    <section className="bg-[#F7F7F9] w-screen min-h-screen relative text-black overflow-hidden">
      <div className="w-[24.167vw] h-[8.385vw] py-[5vw] flex flex-col justify-center items-center ml-[12.656vw]">
        <h1 className="font-bold text-[#22B786] text-[3.646vw]">PennyTrack</h1>
        <p className="text-[#7a7575] text-[1.302vw]">
          Create Your Account to Start
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-[27.865vw] h-[34.896vw] flex flex-col items-center justify-between ml-[11vw]">
          <div>
            <p className="text-[1.042vw] mb-[0.7vw]">Name</p>
            <input
              type="text"
              className="w-[27.865vw] h-[3.594vw] bg-[#22B786] bg-opacity-[15%] rounded-[0.521vw] shadow-md shadow-gray-300 px-[1vw]"
              placeholder="Your Name"
              id="name"
              name="name"
              required
            />
          </div>
          <div>
            <p className="text-[1.042vw] mb-[0.7vw]">Email</p>
            <input
              type="text"
              className="w-[27.865vw] h-[3.594vw] bg-[#22B786] bg-opacity-[15%] rounded-[0.521vw] shadow-md shadow-gray-300 px-[1vw]"
              placeholder="example@gmail.com"
              id="email"
              name="email"
              required
            />
          </div>
          <div>
            <p className="text-[1.042vw] mb-[0.7vw]">Phone Number</p>
            <input
              type="text"
              className="w-[27.865vw] h-[3.594vw] bg-[#22B786] bg-opacity-[15%] rounded-[0.521vw] shadow-md shadow-gray-300 px-[1vw]"
              placeholder="08xxxxxxxx"
              id="telephone"
              name="telephone"
              required
            />
          </div>
          <div>
            <p className="text-[1.042vw] mb-[0.7vw]">Password</p>
            <input
              type="password"
              className="w-[27.865vw] h-[3.594vw] bg-[#22B786] bg-opacity-[15%] rounded-[0.521vw] shadow-md shadow-gray-300 px-[1vw]"
              placeholder="Your Password"
              id="password"
              name="password"
              required
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
          <button
            type="submit"
            className="w-[19.271vw] h-[3.073vw] font-bold text-[0.938vw] rounded-[0.521vw] bg-[#22B786] shadow-sm shadow-gray-300 text-white hover:scale-[102%] ease-in-out duration-300"
          >
            Create your account
          </button>
        </div>
      </form>
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

export default SignUpPage;
