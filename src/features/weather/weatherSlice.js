import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWeatherData } from "./weatherAPI";
import { groupByDtTxt, paginator } from "../../utils";

const initialState = {
  data: { metric: {}, imperial: {} },
  status: "loading",
  temperatureUnit: "F",
  currentPage: 0,
  pageSize: 3,
  selectedDay: "",
};

// Asynchronously fetch Weather Data
export const getWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (unit) => {
    const response = await fetchWeatherData(unit);
    return response.data;
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setTemperatureUnit: (state, action) => {
      state.temperatureUnit = action.payload;
    },
    increaseCurrentPage: (state) => {
      state.currentPage += 1;
    },

    decreaseCurrentPage: (state) => {
      state.currentPage -= 1;
    },
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(getWeatherData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWeatherData.fulfilled, (state, action) => {
        // action.meta.arg contains the argument that was passed in the async request
        state.status = "idle";
        state.data[action.meta.arg] = groupByDtTxt(action.payload.list);

        // set the selected day value only one.
        // The condition is over here
        state.selectedDay = Object.keys(groupByDtTxt(action.payload.list))[0];
      })
      .addCase(getWeatherData.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

// Actions
export const {
  setTemperatureUnit,
  increaseCurrentPage,
  decreaseCurrentPage,
  setSelectedDay,
} = weatherSlice.actions;

// Selectors
// PaginatedDays
export const selectPaginatedDays = (state) =>
  paginator(
    Object.keys(state.weather.data.imperial),
    state.weather.currentPage,
    state.weather.pageSize
  );

export const selectWeatherData = (state) => {
  if (state.weather.temperatureUnit === "C") {
    return state.weather.data.metric;
  }
  return state.weather.data.imperial;
};

export default weatherSlice.reducer;
