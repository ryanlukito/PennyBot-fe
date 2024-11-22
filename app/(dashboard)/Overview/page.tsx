import React from "react";
import NavBar from "@/app/components/NavBar";
import Image from "next/image";
import BarChart from "@/app/components/BarChart";
import PieChart from "@/app/components/PieChart";
import { ChartData, ChartOptions } from "chart.js";

const OverviewPage: React.FC = () => {
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
    // labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    datasets: [
      {
        label: "Dataset 1",
        data: [300, 50, 100, 75, 125], // Data values
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // Colors for each section
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1, // Border thickness
      },
    ],
  };

  const options2: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Position the legend
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
    },
  };

  return (
    <section className="bg-[#E2ECEA] w-screen h-screen relative text-black flex flex-row overflow-hidden">
      <NavBar />
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
            <div className="w-[54.344vw] h-full bg-white rounded-[0.521vw] p-[3vw]">
              <BarChart data={data} options={options}></BarChart>
            </div>
          </div>
          <div className="w-full h-[17vw] bg-white rounded-[0.521vw] mt-[1vw] py-[2vw] px-[2vw] flex">
            <PieChart data={data2} options={options2}></PieChart>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewPage;
