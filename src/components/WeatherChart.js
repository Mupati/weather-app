import React from "react";
import { Bar } from "react-chartjs-2";
import {
  formatWeatherDay,
  formatWeatherTime,
  getCelsiusTemperature,
} from "../utils";

function WeatherChart({ day, dayWeatherData, temperatureUnit }) {
  let graphData = {
    labels: dayWeatherData.map((data) => formatWeatherTime(data.dt_txt)),
    datasets: [
      {
        label: `Temperatures on ${formatWeatherDay(day)}`,
        data:
          temperatureUnit === "F"
            ? dayWeatherData.map((data) => data.main.temp)
            : dayWeatherData.map((data) =>
                getCelsiusTemperature(data.main.temp)
              ),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  return <Bar data={graphData} />;
}

export default WeatherChart;
