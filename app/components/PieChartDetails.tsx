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
    <div className="space-y-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between border-b border-gray-200 pb-2 space-x-[2vw]"
        >
          {/* Icon and Name */}
          <div className="flex items-center space-x-[1vw]">
            <p className="font-[0.5vw] text-gray-700">{item.name}</p>
          </div>

          {/* Percentage */}
          <p className="text-gray-500">{item.percentage} %</p>
          {/* Amount */}
          <p className="font-[0.5vw] text-gray-700">Rp {item.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default PieChartDetails;
