import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";

import weatherReducer, { setStatus } from "../../features/weather/weatherSlice";
import PreLoader from "../PreLoader";

describe("<PreLoader />", () => {
  const store = configureStore({
    reducer: {
      weather: weatherReducer,
    },
  });

  beforeEach(() => {
    render(
      <Provider store={store}>
        <PreLoader />
      </Provider>
    );
  });

  test("Show loading state when fetching data", () => {
    store.dispatch(setStatus("loading"));
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test("Show error message when loading data fails", () => {
    store.dispatch(setStatus("rejected"));
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
