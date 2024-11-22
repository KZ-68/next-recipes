"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface MacronutrientsProps {
  protQuantity: string
  protUnit: string
  fatQuantity: string
  fatUnit: string
  carbohydrateQuantity:string
  carbohydrateUnit:string
}

const MacronutrientsChartDoughnut:React.FC<MacronutrientsProps> = (
  {protQuantity, protUnit, fatQuantity, fatUnit, carbohydrateQuantity, carbohydrateUnit}
) => {

const data= [
  {
    label: "Protein",
    value: protQuantity,
    unit: protUnit,
    color: "rgba(86,73,231,255)",
    cutout: "80%",
  },
  {
    label: "Fats",
    value: fatQuantity,
    unit: fatUnit,
    color: "rgba(226,76,74,255)",
    cutout: "80%",
  },
  {
    label: "Carbs",
    value: carbohydrateQuantity,
    unit: carbohydrateUnit,
    color: "rgba(234,188,20,1)",
    cutout: "80%",
  },
]

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context:{raw:{value:string,unit:string}}) => {
            return `${context.raw.value} ${context.raw.unit}`
          }
        }
      }
    },
    cutout: data.map((item) => item.cutout),
    aspectRatio: 3
  };

  const finalData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => ({"value": item.value, "unit": item.unit})),
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