import React from "react";
import { Bar } from "react-chartjs-2";
import { formatWeatherDay } from "../utils";

function WeatherChart({ day, dayWeatherData, temperatureUnit }) {
  let graphData = {
    labels: dayWeatherData.map((data) => data.dt_txt.split(" ")[1]),
    datasets: [
      {
        label: `Temperatures on ${formatWeatherDay(day)}`,
        data:
          temperatureUnit === "F"
            ? dayWeatherData.map((data) => data.main.temp_kf)
            : dayWeatherData.map((data) => data.main.temp),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  return <Bar data={graphData} />;
}

export default WeatherChart;
