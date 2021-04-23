import { format } from "date-fns";

/*
Given the data we have received, we'll group into chunks and use that
on the client side. The chunks will be based on dates.
The dt_txt field will be used because depending on the time of the day
the request will be made, the weather results for the days will not always be equal.
Eg. dt_txt = "2021-04-22 18:00:00"
So when chunking we use a transformed version i.e dt_txt.split(" ")[0]
*/

/**
 *
 * @param {*} weatherList
 * @returns
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
 *
 * @param {*} items
 * @param {*} current_page
 * @param {*} per_page_items
 * @returns
 */
// Paginate Weather Data List
export const paginator = (items, current_page, per_page_items) => {
  let page = current_page || 1,
    per_page = per_page_items,
    offset = (page - 1) * per_page,
    paginatedItems = items.slice(offset).slice(0, per_page_items),
    total_pages = Math.ceil(items.length / per_page);

  return {
    page: page,
    //   per_page: per_page,
    //   pre_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems,
  };
};

/**
 *
 * @param {*} weatherData
 * @param {*} metric
 * @param {*} temperatureUnit
 * @returns
 */

// Get the average value for a weather metric for a particular day
export const getAverageTemperature = (
  weatherData,
  metric,
  temperatureUnit = "F"
) => {
  let metricKey;
  if (metric === "temp") {
    metricKey = temperatureUnit === "F" ? "temp_kf" : "temp";
  } else {
    metricKey = metric;
  }

  let total = weatherData.reduce((acc, curr) => acc + curr.main[metricKey], 0);
  return (total / weatherData.length).toFixed(1);
};

// format Date
/**
 *
 * @param {*} date
 * @returns
 */
export const formatWeatherDay = (date) => {
  let sanitizedDate = date.replace("-", ",");
  return format(new Date(sanitizedDate), "dd LLL yy");
};
