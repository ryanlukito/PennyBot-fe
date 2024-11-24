"use client";

import React, { useState } from "react";
import NavBar from "@/app/components/NavBar";
import Image from "next/image";
// import Link from "next/link";
import {
  UpdateUserPayload,
  UpdateIncomePayload,
} from "@/app/typesCollections/types";
import { updateUser, updateIncome } from "@/app/connections/connectToDB";

const SettingsPage = () => {
  const [activeDiv, setActiveDiv] = useState(1);

  const handleSubmitUpdateUser = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formElements = event.currentTarget
      .elements as typeof event.currentTarget.elements & {
      firstName: HTMLInputElement;
      lastName: HTMLInputElement;
      occupation: HTMLInputElement;
      nationality: HTMLInputElement;
      address: HTMLInputElement;
      country: HTMLInputElement;
    };
    const payload: UpdateUserPayload = {
      firstName: formElements.firstName.value,
      lastName: formElements.lastName.value,
      occupation: formElements.occupation.value,
      nationality: formElements.nationality.value,
      address: formElements.address.value,
      country: formElements.country.value,
    };

    console.log(payload);

    // Input expense into database
    try {
      const response = await updateUser(payload);
      console.log(`Response from API: ${response.data}`);
    } catch (error) {
      console.error("Error logging expense:", error);
    }
  };

  const handleSubmitIncome = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formElements = event.currentTarget
      .elements as typeof event.currentTarget.elements & {
      income: HTMLInputElement;
    };
    const payload: UpdateIncomePayload = {
      income: parseInt(formElements.income.value),
    };

    console.log(payload);

    // Input expense into database
    try {
      const response = await updateIncome(payload);
      console.log(`Response from API: ${response.data}`);
    } catch (error) {
      console.error("Error logging expense:", error);
    }
  };

  return (
    <section className="w-screen h-screen flex flex-row">
      <NavBar />
      <div className="h-full w-[80.365vw] flex flex-col justify-between">
        <div className="w-full h-[9.427vw] flex flex-row items-center p-[1vw] border-b-black border-b-[0.1vw]">
          <Image
            src="/image/Settings.png"
            width={10000}
            height={10000}
            alt="Settings"
            className="w-[2.604vw] h-[2.604vw]"
          />
          <h1 className="text-[#22B786] font-bold text-[2.5vw] ml-[0.5vw] ">
            Settings
          </h1>
        </div>
        <div className="w-full h-[6.771vw] flex flex-row justify-around border-b-black border-b-[0.1vw]">
          <button className="p-[1vw] " onClick={() => setActiveDiv(1)}>
            Update Profile User
          </button>
          <button className="p-[1vw] " onClick={() => setActiveDiv(2)}>
            Update Income
          </button>
        </div>

        {activeDiv == 1 && (
          <div className="h-[40.052vw] w-full flex justify-center items-center">
            <form
              className="w-[62.552vw] h-[23vw] relative"
              onSubmit={handleSubmitUpdateUser}
            >
              <div className="flex justify-between">
                <div>
                  <div className="mb-[1vw]">
                    <p className="text-[1.042vw] mb-[0.5vw]">First Name</p>
                    <input
                      type="text"
                      className="w-[27.865vw] h-[3.594vw] rounded-[0.52vw] bg-[#22B786] px-[1vw] bg-opacity-[15%]"
                      id="firstName"
                      name="firstName"
                      required
                    />
                  </div>
                  <div className="mb-[1vw]">
                    <p className="text-[1.042vw] mb-[0.5vw]">Occupation</p>
                    <input
                      type="text"
                      className="w-[27.865vw] h-[3.594vw] rounded-[0.52vw] bg-[#22B786] px-[1vw] bg-opacity-[15%]"
                      id="occupation"
                      name="occupation"
                      required
                    />
                  </div>
                  <div>
                    <p className="text-[1.042vw] mb-[0.5vw]">Address</p>
                    <input
                      type="text"
                      className="w-[27.865vw] h-[3.594vw] rounded-[0.52vw] bg-[#22B786] px-[1vw] bg-opacity-[15%]"
                      id="address"
                      name="address"
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-[1vw]">
                    <p className="text-[1.042vw] mb-[0.5vw]">Last Name</p>
                    <input
                      type="text"
                      className="w-[27.865vw] h-[3.594vw] rounded-[0.52vw] bg-[#22B786] px-[1vw] bg-opacity-[15%]"
                      id="lastName"
                      name="lastName"
                      required
                    />
                  </div>
                  <div className="mb-[1vw]">
                    <p className="text-[1.042vw] mb-[0.5vw]">Nationality</p>
                    <input
                      type="text"
                      className="w-[27.865vw] h-[3.594vw] rounded-[0.52vw] bg-[#22B786] px-[1vw] bg-opacity-[15%]"
                      id="nationality"
                      name="nationality"
                      required
                    />
                  </div>
                  <div>
                    <p className="text-[1.042vw] mb-[0.5vw]">Country</p>
                    <input
                      type="text"
                      className="w-[27.865vw] h-[3.594vw] rounded-[0.52vw] bg-[#22B786] px-[1vw] bg-opacity-[15%]"
                      id="country"
                      name="country"
                      required
                    />
                  </div>
                </div>
              </div>
              <button className="bg-[#22B786] px-[1vw] py-[0.5vw] rounded-[0.52vw] font-bold text-white absolute left-0 bottom-0">
                Update Profile
              </button>
            </form>
          </div>
        )}

        {activeDiv == 2 && (
          <div className="w-full h-[40.052vw] flex justify-center">
            <form
              onSubmit={handleSubmitIncome}
              className="w-[25vw] h-[10.729vw] text-center flex flex-col mt-[2vw] relative"
            >
              <div className="flex items-center justify-between">
                <h1 className="text-[1.823vw] font-bold">Your Income:</h1>
                <input
                  type="text"
                  placeholder="Rp3.000.000"
                  className="bg-[#22B78626] rounded-[0.52vw] px-[1vw] py-[1.5vw]"
                  id="income"
                  name="income"
                  required
                />
              </div>
              <button className=" bg-[#22B786] font-bold text-white px-[1vw] py-[0.5vw] rounded-[0.52vw] absolute right-0 bottom-[2vw]">
                Update Balance
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default SettingsPage;
