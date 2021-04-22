import axios from "axios";

export const fetchWeatherData = async () => {
  try {
    return await axios.get(process.env.REACT_APP_WEATHER_APP_URL);
  } catch (error) {
    console.log(error);
  }
};
