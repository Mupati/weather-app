import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWeatherData } from "./weatherAPI";
import { groupByDtTxt, paginator } from "../../utils";

const initialState = {
  data: { metric: {}, imperial: {} },
  status: "loading",
  errorMessage: "",
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
        state.data[action.meta.arg] = groupByDtTxt(action.payload.list);

        state.selectedDay = Object.keys(groupByDtTxt(action.payload.list))[0];
        state.status = "idle";
      })
      .addCase(getWeatherData.rejected, (state, action) => {
        state.errorMessage = action.payload.message;
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
  setPageSize,
} = weatherSlice.actions;

// Paginate the days
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
