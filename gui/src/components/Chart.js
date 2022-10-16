import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart(props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Procentul utilizatorilor pentru care se regăsește fiecare ramură din rezultatul tău în rezultatul lor",
      },
    },
  };

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "Procente (%)",
        data: props.data,
        backgroundColor: "#0275d8",
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
}

export default Chart;
