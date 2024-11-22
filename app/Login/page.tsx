"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget
      .elements as typeof event.currentTarget.elements & {
      username: HTMLInputElement;
      password: HTMLInputElement;
    };

    const payload = {
      username: formElements.username.value,
      password: formElements.password.value,
    };

    try {
      const { data } = await axios.post(
        "https://api.ambagandalf.site/auth/login",
        payload,
        {
          withCredentials: true,
        }
      );
      alert(JSON.stringify(data));
      const token = data.token;
      console.log(`token ${token}`);
      push("/");
    } catch (e) {
      const error = e as AxiosError;
      alert(error.message);
    }
  };

  return (
    <section className="bg-[#F7F7F9] w-screen min-h-screen relative text-black overflow-hidden">
      <div className="w-[29.375vw] h-[4.688vw] flex items-center justify-start ml-[2.396vw] py-[3.5vw]">
        <Image
          src="/image/wallet.png"
          width={10000}
          height={10000}
          className="w-[4.115vw] h-[3.75vw]"
          alt="wallet"
        />
        <h1 className="font-bold text-[#22B786] text-[3.646vw] ml-[1vw]">
          PennyTrack
        </h1>
      </div>
      <div className="w-[27.865vw] h-[23.958vw] ml-[9.375vw] flex flex-col justify-between items-center mt-[4vw]">
        <h1 className="font-bold text-[2.083vw] w-full">
          LOGIN TO YOUR ACCOUNT
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <p className="text-[0.781vw] mb-[0.5vw]">Email or Phone Number</p>
            <input
              type="text"
              className="w-[27.865vw] h-[3.594vw] bg-[#22B786] bg-opacity-[15%] rounded-[0.521vw] shadow-md shadow-gray-300 px-[1vw] mb-[1vw]"
              placeholder="example@gmail.com"
              id="username"
              name="username"
              required
            />
          </div>
          <div>
            <p className="text-[0.781vw] mb-[0.5vw]">Password</p>
            <input
              type="password"
              className="w-[27.865vw] h-[3.594vw] bg-[#22B786] bg-opacity-[15%] rounded-[0.521vw] shadow-md shadow-gray-300 px-[1vw] mb-[1vw]"
              placeholder="Your Password"
              id="password"
              name="password"
              required
            />
          </div>
          <div className="text-[0.781vw] w-full mb-[1vw]">
            Doesn’t have any account yet?{" "}
            <Link href="/SignUp" className="font-bold">
              Sign Up Here
            </Link>
          </div>
          <button
            type="submit"
            className="w-[19.271vw] h-[3.073vw] font-bold text-[1.302vw] rounded-[0.521vw] bg-[#22B786] shadow-sm shadow-gray-300 text-white hover:scale-[102%] ease-in-out duration-300"
          >
            Login
          </button>
        </form>
      </div>
      <div className="w-[50vw] h-screen z-[0] absolute top-0 right-0">
        <Image
          src="/image/bgLogin.png"
          width={10000}
          height={10000}
          className="object-cover"
          alt="background login"
        />
      </div>
    </section>
  );
};

export default LoginPage;
