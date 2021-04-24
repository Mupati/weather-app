import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWeatherData } from "./weatherAPI";
import { groupByDtTxt } from "../../utils";

const initialState = {
  weatherInfo: null,
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
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getWeatherData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWeatherData.fulfilled, (state, action) => {
        state.status = "idle";
        state.weatherInfo = action.payload;
      })
      .addCase(getWeatherData.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

// Selectors
export const selectWeatherData = (state) => state.weather.weatherInfo;
export const selectQueryStatus = (state) => state.weather.status;
export const selectProcessedData = (state) =>
  groupByDtTxt(state.weather.weatherInfo?.list);
export const selectWeatherLocation = (state) => state.weather.weatherInfo?.city;

export default weatherSlice.reducer;
