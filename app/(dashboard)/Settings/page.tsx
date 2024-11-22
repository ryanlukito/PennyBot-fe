import React from "react";
import NavBar from "@/app/components/NavBar"
import Image from "next/image";
import Link from "next/link";
import ProfileUserPage from "@/app/(dashboard)/ProfileUser/page"
import IncomePage from "@/app/(dashboard)/Income/page";

const SettingsPage = () => {
    return <section className="w-screen h-screen flex flex-row">
        <NavBar/>
        <div className="h-full w-full flex flex-col justify-between">
            <div className="w-full h-[9.427vw] flex flex-row items-center p-[1vw]">
                <Image
                    src="/image/Settings.png"
                    width={10000}
                    height={10000}
                    alt="Settings"
                    className="w-[2.604vw] h-[2.604vw]"
                />
                <h1 className="text-[#22B786] font-bold text-[2.5vw] ml-[0.5vw]">Settings</h1>
            </div>
            <div className="w-full h-[6.771vw] flex flex-row px-[7vw]">
                <button className="w-[20vw]">Update Profile User</button>
                <button className="ml-[7vw] ">Update Income</button>
            </div>
            <div className="w-full h-[40.052vw] ">
                    <form action="" className="w-[29vw] h-[10.729vw] ml-[7vw] text-center flex flex-col mt-[2vw] relative">
                        <div className="flex items-center">
                            <h1 className="text-[1.823vw] font-bold">Your Income:</h1>
                            <input type="text" placeholder="Rp3.000.000" className="bg-[#22B78626] rounded-[0.52vw] px-[1vw] py-[2vw] ml-[2vw]"/>
                        </div>
                        <button className=" bg-[#22B786] font-bold text-white px-[1vw] py-[0.5vw] rounded-[0.52vw] absolute right-0 bottom-0">Update Balance</button>
                    </form>
            </div>
        </div>
    </section>
};

export default SettingsPage;