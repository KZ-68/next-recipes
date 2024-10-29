"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface MacronutrientsProps {
  protLabel:string
  protQuantity: number
  protUnit: string
  fatLabel:string
  fatQuantity: number
  fatUnit: string
}

const MacronutrientsChartDoughnut:React.FC<MacronutrientsProps> = ({protLabel, protQuantity, protUnit, fatLabel, fatQuantity, fatUnit}) => {

let data= [
  {
    label: protLabel,
    value: protQuantity,
    color: "rgba(0, 43, 73, 1)",
    cutout: "50%",
  },
  {
    label: fatLabel,
    value: fatQuantity,
    color: "rgba(0, 103, 160, 1)",
    cutout: "50%",
  },
  {
    label: "Label 3",
    value: 80,
    color: "rgba(83, 217, 217, 1)",
    cutout: "50%",
  },
]

  const options: any = {
    plugins: {
      responsive: true,
    },
    cutout: data.map((item) => item.cutout),
  };

  const finalData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => (item.value)),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 1,
        dataVisibility: new Array(data.length).fill(true),
      },
    ],
  };
  return <Doughnut data={finalData} options={options} />;
}

export default MacronutrientsChartDoughnut