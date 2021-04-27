import {
  groupByDtTxt,
  paginator,
  computeAverageTemperature,
  formatWeatherDay,
  formatWeatherTime,
} from "./index";
import { datetimes, weatherData, groupedData } from "./testData";

describe("Tests for utility functions", () => {
  test("should paginate a given array", () => {
    let paginatedData = paginator(datetimes, 0, 3);

    let data = [
      "2020-08-04 00:00:00",
      "2020-08-05 03:00:00",
      "2020-08-06 06:00:00",
    ];

    expect(paginatedData.data).toStrictEqual(data);
    expect(paginatedData.nextPage).toBe(1);

    paginatedData = paginator(datetimes, 4, 3);
    data = [
      "2020-08-08 12:00:00",
      "2020-08-09 15:00:00",
      "2020-08-10 18:00:00",
    ];

    expect(paginatedData.nextPage).toBeNull();
    expect(paginatedData.data).toStrictEqual(data);
  });

  test("should get time format from datetime string", () => {
    expect(formatWeatherTime(datetimes[0])).toBe("12:00 AM");
    expect(formatWeatherTime(datetimes[2])).toBe("06:00 AM");
    expect(formatWeatherTime(datetimes[4])).toBe("12:00 PM");
    expect(formatWeatherTime(datetimes[5])).toBe("03:00 PM");
  });

  test("should get day format from datetime string", () => {
    expect(formatWeatherDay(datetimes[0])).toBe("04 Aug 20");
  });

  test("should calculate average temperature from weather data", () => {
    expect(computeAverageTemperature(groupedData["2020-08-04"])).toBe(15);
    expect(computeAverageTemperature(groupedData["2020-08-05"])).toBe(35);
  });

  test("should group weather data according to days", () => {
    expect(groupByDtTxt(weatherData)).toStrictEqual(groupedData);
  });
});
