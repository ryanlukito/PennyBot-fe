"use client";

import React, { useEffect, useRef } from "react";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";

Chart.register(...registerables);

interface PieChartProps {
  data: ChartData<"pie">;
  options?: ChartOptions<"pie">;
}

const PieChart: React.FC<PieChartProps> = ({ data, options }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const myPieChart = new Chart(ctx, {
      type: "pie",
      data: data,
      options: options,
    });

    return () => {
      myPieChart.destroy();
    };
  }, [data, options]);

  return <canvas ref={chartRef}></canvas>;
};

export default PieChart;
