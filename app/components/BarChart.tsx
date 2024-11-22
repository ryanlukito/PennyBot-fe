"use client";

import React, { useEffect, useRef } from "react";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";

Chart.register(...registerables);

interface BarChartProps {
  data: ChartData<"bar">;
  options?: ChartOptions<"bar">;
}

const BarChart: React.FC<BarChartProps> = ({ data, options }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const myBarChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });

    return () => {
      myBarChart.destroy();
    };
  }, [data, options]);

  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
