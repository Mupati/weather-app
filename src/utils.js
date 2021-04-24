import { format, parseISO } from "date-fns";

/**
 * Given the data we have received, we'll group into chunks and use that
 * on the client side. The chunks will be based on dates.
 * The dt_txt field will be used because depending on the time of the day
 * the request will be made, the weather results for the days will not always be equal.
 * Eg. dt_txt = "2021-04-22 18:00:00"
 * So when chunking we use a transformed version i.e dt_txt.split(" ")[0] = "2021-04-22"
 * Group weather data according to days
 * @param {array} weatherList - The weather data
 * @returns {object} - Weather data grouped according to days i.e an object with day as key
 */
export const groupByDtTxt = (weatherList) => {
  // create another key:value = day: dt_txt.split(" ")[0]
  // and add to every object and use that to group the data according to days
  const modifiedList = weatherList.map((obj) => ({
    ...obj,
    day: obj.dt_txt.split(" ")[0],
  }));

  // Group the modified weather data by the newly created key i.e day
  return modifiedList.reduce(function (acc, obj) {
    let key = obj["day"];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

/**
 * Create paginated data for a given array
 * @param {array} items - The list of items.
 * @param {number} current_page - The currently view
 * @param {number} pageSize - The size of each page in the paginated data
 * @returns {object} - The paginated dataa and pagination properties
 */
export const paginator = (items, current_page, pageSize) => {
  let page = current_page || 1,
    per_page = pageSize,
    offset = (page - 1) * per_page,
    paginatedItems = items.slice(offset).slice(0, pageSize),
    total_pages = Math.ceil(items.length / per_page);

  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems,
  };
};

/**
 * Get the formatted day
 * @param {string} date - A date value. Eg. 2021-04-25
 * @returns {string} - Date in the format 24 Apr 21for 24th April 2021
 */
export const formatWeatherDay = (date) => format(parseISO(date), "dd LLL yy");

/**
 * Get the time from a given datetime in the format hh:mm a
 * @param {string} dateTime - A datetime value. Eg. "2021-04-25 00:00:00"
 * @returns {string} - Time in the hour:minute am/pm
 */
export const formatWeatherTime = (dateTime) =>
  format(parseISO(dateTime), "hh:mm a");

/**
 * Calculate the temperature in Celsius
 * @param {number} fahrenheitTemp - The temperature in Fahrenheit
 * @returns {number} - The temperature in Celsius
 */
export const getCelsiusTemperature = (fahrenheitTemp) =>
  (5 / 9) * (fahrenheitTemp - 32);

/**
 * Calculate the temperature in Fahhrenheit
 * @param {number} kelvinTemp - The temperature in Kelvin
 * @returns {number} - The temperature in Fahrenheit
 */
export const getFahrenheitTemperature = (kelvinTemp) =>
  1.8 * (kelvinTemp - 273) + 32;

/**
 * Calculate the average temperature for a day
 * @param {array} weatherData - The Weather information for a specific day.
 * @param {string} temperatureUnit - The unit for the computed temperature. "F" or "C"
 * @returns {number} - The average temperature
 */
export const computeAverageTemperature = (weatherData, temperatureUnit) => {
  const total = weatherData.reduce((acc, curr) => acc + curr.main["temp"], 0);
  const averageTemp = total / weatherData.length;
  if (temperatureUnit === "C") {
    return getCelsiusTemperature(averageTemp);
  }
  return averageTemp;
};
