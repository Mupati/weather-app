import React from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { formatWeatherDay, formatWeatherTime } from "../utils";
import { selectWeatherData } from "../features/weather/weatherSlice";

function WeatherChart() {
  const selectedDay = useSelector((state) => state.weather.selectedDay);
  const dayWeatherData = useSelector(selectWeatherData);
  const isDataReady = Object.keys(dayWeatherData).length !== 0;

  const graphData = {
    labels:
      isDataReady &&
      dayWeatherData[selectedDay].map((data) => formatWeatherTime(data.dt_txt)),
    datasets: [
      {
        label: `Temperatures on ${formatWeatherDay(selectedDay)}`,
        data:
          isDataReady &&
          dayWeatherData[selectedDay].map((data) => data.main.temp),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return isDataReady && <Bar data={graphData} data-testid="weather-chart" />;
}

export default WeatherChart;
