import React from "react";

interface DataItem {
  name: string;
  percentage: number; // e.g., "33,3%"
  amount: number; // e.g., "Rp832.500,00"
}

interface PieChartDetailsProps {
  data: DataItem[];
}

const PieChartDetails: React.FC<PieChartDetailsProps> = ({ data }) => {
  return (
    <div className="w-[25vw] h-full flex flex-col justify-around items-start">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between border-b border-gray-200 space-x-[1vw]"
        >
          {/* Icon and Name */}
          <p className="font-[0.5vw] text-gray-700">{item.name}</p>
          {/* Percentage */}
          <p className="text-gray-500 font-[0.5vw]">{item.percentage} %</p>
          {/* Amount */}
          <p className="font-[0.5vw] text-gray-700">Rp {item.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default PieChartDetails;
