import axios from "axios";

export const fetchWeatherData = async (unit) =>
  await axios.get(`${process.env.REACT_APP_WEATHER_API_URL}&units=${unit}`);
