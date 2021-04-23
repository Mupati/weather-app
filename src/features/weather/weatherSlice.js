import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWeatherData } from "./weatherAPI";

const initialState = {
  value: null,
  status: "loading",
};

// Asynchronously fetch Weather Data
export const getWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async () => {
    const response = await fetchWeatherData();
    return response.data;
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState,

  reducers: {
    weatherDataByUnit: (state, action) => {
      console.log(action.payload);
      state.value = action.payload;
    },
  },

  extraReducers: (builders) => {
    builders
      .addCase(getWeatherData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWeatherData.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

export const selectWeatherData = (state) => state.weather.value;
export const selectQueryStatus = (state) => state.weather.status;

// function preprocessData(array, size) {
//   let result = [];
//   for (let i = 0; i < array.length; i += size) {
//     let chunk = array.slice(i, i + size);
//     result.push(chunk);
//   }
//   return result;
// }

// Given the data we have received, we'll group into chunks and use that
// on the client side. The chunks will be based on dates.
// The dt_txt field will be used because depending on the time of the day
// the request will be made, the weather results for the days will not always be equal.
// Eg. dt_txt = "2021-04-22 18:00:00"
// So when chunking we use a transformed version i.e dt_txt.split(" ")[0]

function groupByDtTxt(weatherList) {
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
}

export const selectProcessedData = (state) =>
  groupByDtTxt(state.weather.value.list);

export const { weatherDataByUnit } = weatherSlice.actions;
export default weatherSlice.reducer;
