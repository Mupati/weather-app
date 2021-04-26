import axios from "axios";

/*
We can append &unit=metric to get temperature in Celsius or
&unit=imperial to get temperature in Fahrenheit when toggling between
Fahrenheit and Celsius. This is not well optimized since we have to hit
the endpoint everytime. 

We'll therefore add &unit=imperial to our given API_URL to get the default Fahrenheit
values and use a function to convert to Celsius when we toggle.

In this case we fetch the weatherInfo only once with temperature in Fahrenheit
and compute the Celsius equivalents
*/
export const fetchWeatherData = async (unit) =>
  await axios.get(`${process.env.REACT_APP_WEATHER_API_URL}&units=${unit}`);
