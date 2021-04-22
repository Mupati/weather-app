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

export const { weatherDataByUnit } = weatherSlice.actions;
export default weatherSlice.reducer;
