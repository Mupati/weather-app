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
        state.data[action.meta.arg] = groupByDtTxt(action.payload.list);
        state.selectedDay = Object.keys(groupByDtTxt(action.payload.list))[0];

        // a bug over here. at times the data object is not set
        state.status = "idle";
        console.log("data after idle", state.data[action.meta.arg]);
      })
      .addCase(getWeatherData.rejected, (state) => {
        // We can get the error message from action.error.message
        // and display to the user but kind of error message is only relevant
        // for technical users so we'll not set it in our state
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

// Navigation Actions and Selectors
export const canMoveToPreviousCard = (state) => state.weather.currentPage > 0;

export const canMoveToNextCard = (state) => {
  const paginatedDays = selectPaginatedDays(state);
  return paginatedDays.nextPage ? true : false;
};

export const moveToPreviousCard = (dispatch, getState) => {
  if (canMoveToPreviousCard) dispatch(decreaseCurrentPage());
};

export const moveToNextCard = (dispatch, getState) => {
  if (canMoveToNextCard) dispatch(increaseCurrentPage());
};

export default weatherSlice.reducer;
