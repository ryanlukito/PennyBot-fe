"use client";

import React, { useEffect, useState } from "react";
import NavBar from "@/app/components/NavBar";
import Image from "next/image";
import BarChart from "@/app/components/BarChart";
import PieChart from "@/app/components/PieChart";
import { ChartData, ChartOptions } from "chart.js";
import { getOverview } from "@/app/connections/connectToDB";
import PieChartDetails from "@/app/components/PieChartDetails";

interface Money {
  total_balance: number;
  total_income: number;
  total_expanse: number;
}

interface DataSummary {
  money: Money;
  budget: Record<string, number>;
  summary: Record<string, unknown>;
  percentage: { name: string; percentage: number; amount: number }[];
  msg: string;
}

const OverviewPage: React.FC = () => {
  const [dataSummary, setDataSummary] = useState<DataSummary | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOverview();
      setDataSummary(data);
    };
    fetchData();
  }, []);
  console.log(dataSummary);

  const summary = dataSummary?.summary;
  const months = summary
    ? Object.keys(summary).map((key) => key.split("-")[1])
    : [];
  const values = summary
    ? Object.values(summary).map((value) => Number(value))
    : [];

  const colorBase = "#22B786";
  const data: ChartData<"bar"> = {
    labels: months,
    datasets: [
      {
        label: "Expenses",
        data: values as (number | [number, number] | null)[],
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
    labels: Object.keys(dataSummary?.budget || {}),
    datasets: [
      {
        data: Object.values(dataSummary?.budget || {}),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ], // Add more colors as needed
        hoverOffset: 4,
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

  const percentageData = (dataSummary?.percentage ?? []).map((item) => ({
    name: item.name === "Food" ? "Foods" : item.name,
    percentage: item.percentage,
    amount: item.amount,
  }));

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
                {dataSummary ? (
                  <p>Rp {dataSummary.money.total_balance}</p>
                ) : (
                  <p>Rp 0</p>
                )}
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
                {dataSummary ? (
                  <p>Rp {dataSummary.money.total_income}</p>
                ) : (
                  <p>0</p>
                )}
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
                {dataSummary ? (
                  <p>Rp {dataSummary.money.total_expanse}</p>
                ) : (
                  <p>0</p>
                )}
              </div>
            </div>
            <div className="w-[54.344vw] h-full bg-white rounded-[0.521vw] p-[3vw] flex items-end relative">
              <h1 className="top-0 left-[0.5vw] text-[2vw] font-bold absolute">
                Summary
              </h1>
              <BarChart data={data} options={options}></BarChart>
            </div>
          </div>
          <div className="w-full h-[15vw] bg-white rounded-[0.521vw] flex justify-around ">
            <PieChart data={data2} options={options2}></PieChart>
            <div className="h-full">
              <PieChartDetails data={percentageData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewPage;
