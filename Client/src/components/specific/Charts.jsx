import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
} from "chart.js";
import { mainDarkColor, purple, purpleLight } from "../constants/color";
import { getLast7Days } from "../../lib/features";
import zIndex from "@mui/material/styles/zIndex";

ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend
);

const labels = getLast7Days();
// console.log(labels)
const lineChartOption = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const dougnutChartOption = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 120,
  offset: 50,
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,

        label: "Revenue",
        fill: true,
        backgroundColor: purpleLight,
        borderColor: purple,
        // tension: 0.4,
      },
    ],
  };
  return <Line data={data} options={lineChartOption} />;
};
const DoughnutChart = ({ value = [], labels = [] }) => {
  // console.log(labels)
  // console.log(value)
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Total Chats Vs Group Chats",
        backgroundColor: [purpleLight, mainDarkColor],
        borderColor: [purple, mainDarkColor],
        hoverBackgroundColor: [purple, purpleLight],
        // tension: 0.4,
      },
    ],
  };
  return (
    <Doughnut style={{ zIndex: 10 }} data={data} options={dougnutChartOption} />
  );
};

export { LineChart, DoughnutChart };
