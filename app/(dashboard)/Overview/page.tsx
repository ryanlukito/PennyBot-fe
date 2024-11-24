"use client";

import React, { useEffect, useState } from "react";
import NavBar from "@/app/components/NavBar";
import Image from "next/image";
import BarChart from "@/app/components/BarChart";
import PieChart from "@/app/components/PieChart";
import { ChartData, ChartOptions } from "chart.js";
import { getOverview } from "@/app/connections/connectToDB";

const OverviewPage: React.FC = () => {
  const [dataSummary, setDataSummary] = useState(null);

  useEffect(() => {
    const kontol = async () => {
    const data = await getOverview();
      await setDataSummary(data);
    }
    kontol();
    console.log(dataSummary);
  }, []);

  const colorBase = "#22B786";
  const data: ChartData<"bar"> = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2],
        backgroundColor: colorBase,
        borderColor: colorBase,
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data2: ChartData<"pie"> = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Cyan"], // Added Orange and Cyan
    datasets: [
      {
        label: "Dataset 1",
        data: [300, 50, 100, 75, 125, 200, 150], // Added values for the new colors
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // Red
          "rgba(54, 162, 235, 0.2)", // Blue
          "rgba(255, 206, 86, 0.2)", // Yellow
          "rgba(75, 192, 192, 0.2)", // Green
          "rgba(153, 102, 255, 0.2)", // Purple
          "rgba(255, 159, 64, 0.2)", // Orange
          "rgba(0, 255, 255, 0.2)", // Cyan
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Red
          "rgba(54, 162, 235, 1)", // Blue
          "rgba(255, 206, 86, 1)", // Yellow
          "rgba(75, 192, 192, 1)", // Green
          "rgba(153, 102, 255, 1)", // Purple
          "rgba(255, 159, 64, 1)", // Orange
          "rgba(0, 255, 255, 1)", // Cyan
        ],
        borderWidth: 1,
      },
    ],
  };

  const options2: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "right", // Position the legend to the right
        labels: {
          boxWidth: 20, // Width of the color box
          padding: 10, // Padding between labels
        },
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
    },
  };

  // try {
  //   const response = getOverview();
  //   console.log(`Response from API: ${response}`);
  // } catch (error) {
  //   console.log("gagal karena ga ada user_id");
  //   console.error("Error logging expense:", error);
  // }

  return (
    <section className="bg-[#E2ECEA] w-screen h-screen relative text-black flex flex-row overflow-hidden">
      <NavBar />
      <div className="flex flex-col">
        <div className="w-[75.469vw] h-[2.813vw] flex items-center justify-between mt-[1vw] ml-[1vw]">
          <div className="h-full flex flex-row items-center justify-center">
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
        <div className="w-[69.531vw] h-[46vw] flex flex-col justify-around ml-[4.7vw] mt-[1vw]">
          <div className="w-full h-[25.031vw] flex justify-between">
            <div className="w-[13vw] h-full flex flex-col justify-between">
              <div className="w-full h-[7vw] bg-[#92E1C7] rounded-[0.521vw] p-[0.4vw]">
                <Image
                  src="/image/tdesign_money.png"
                  width={10000}
                  height={10000}
                  alt="profile picture"
                  className="w-[2.135vw] h-[1.979vw]"
                />
                <h1 className="text-[0.938vw] text-[#484545]">Total Balance</h1>
              </div>
              <div className="w-full h-[7vw] bg-[#C8CEF7] rounded-[0.521vw] p-[0.4vw]">
                <Image
                  src="/image/solar_hand-money-linear.png"
                  width={10000}
                  height={10000}
                  alt="profile picture"
                  className="w-[1.927vw] h-[1.979vw]"
                />
                <h1 className="text-[0.938vw] text-[#484545]">Total Income</h1>
              </div>
              <div className="w-full h-[7vw] bg-[#F3BBBC] rounded-[0.521vw] p-[0.4vw]">
                <Image
                  src="/image/vaadin_money-withdraw.png"
                  width={10000}
                  height={10000}
                  alt="profile picture"
                  className="w-[1.771vw] h-[1.667vw]"
                />
                <h1 className="text-[0.938vw] text-[#484545]">
                  Total Expenses
                </h1>
              </div>
            </div>
            <div className="w-[54.344vw] h-full bg-white rounded-[0.521vw] p-[3vw] flex items-end relative">
              <h1 className="top-0 left-0 text-[2.5vw] font-bold">Summary</h1>
              <BarChart data={data} options={options}></BarChart>
            </div>
          </div>
          <div className="w-full h-[15vw] bg-white rounded-[0.521vw] mt-[1vw] px-[1vw] flex">
            <PieChart data={data2} options={options2}></PieChart>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewPage;
