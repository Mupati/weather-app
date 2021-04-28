import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
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

const weatherSlice = createSlice({
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
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(getWeatherData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWeatherData.rejected, (state) => {
        // We can get the error message from action.error.message
        // and display to the user but kind of error message is only relevant
        // for technical users so we'll not set it in our state
        state.status = "rejected";
      })
      .addCase(getWeatherData.fulfilled, (state, action) => {
        // action.meta.arg contains the argument that was passed in the async request
        state.data[action.meta.arg] = groupByDtTxt(action.payload.list);
        state.selectedDay = Object.keys(groupByDtTxt(action.payload.list))[0];

        state.status = "idle";
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
  setStatus,
} = weatherSlice.actions;

// Paginate the days
const selectCurrentPage = (state) => state.weather.currentPage;
const selectPageSize = (state) => state.weather.pageSize;
const selectDays = (state) => Object.keys(state.weather.data.imperial);
const selectTemperaturUnit = (state) => state.weather.temperatureUnit;
const selectCelsiusData = (state) => state.weather.data.metric;
const selectFahrenheitData = (state) => state.weather.data.imperial;

export const selectPaginatedDays = createSelector(
  [selectDays, selectCurrentPage, selectPageSize],
  (days, currentPage, pageSize) => paginator(days, currentPage, pageSize)
);

export const selectWeatherData = createSelector(
  [selectTemperaturUnit, selectCelsiusData, selectFahrenheitData],
  (unit, celsiusData, fahrenheitData) =>
    unit === "C" ? celsiusData : fahrenheitData
);

// Navigation Selectors
export const canMoveToPreviousCard = createSelector(
  [selectCurrentPage],
  (currentPage) => currentPage > 0
);

export const canMoveToNextCard = createSelector([selectPaginatedDays], (days) =>
  days.nextPage ? true : false
);

// Navigation Actions
export const moveToPreviousCard = (dispatch, getState) => {
  if (canMoveToPreviousCard) dispatch(decreaseCurrentPage());
};

export const moveToNextCard = (dispatch, getState) => {
  if (canMoveToNextCard) dispatch(increaseCurrentPage());
};

// export const selectPaginatedDays = (state) =>
//   paginator(
//     Object.keys(state.weather.data.imperial),
//     state.weather.currentPage,
//     state.weather.pageSize
//   );

// export const selectWeatherData = (state) => {
//   if (state.weather.temperatureUnit === "C") {
//     return state.weather.data.metric;
//   }
//   return state.weather.data.imperial;
// };

// export const canMoveToPreviousCard = (state) => state.weather.currentPage > 0;

// export const canMoveToNextCard = (state) => {
//   const paginatedDays = selectPaginatedDays(state);
//   return paginatedDays.nextPage ? true : false;
// };

export default weatherSlice.reducer;
