import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";

import weatherReducer from "../../features/weather/weatherSlice";
import CardNavigator from "../CardNavigator";

describe("<CardNavigator />", () => {
  const store = configureStore({
    reducer: {
      weather: weatherReducer,
    },
  });

  beforeEach(() => {
    render(
      <Provider store={store}>
        <CardNavigator />
      </Provider>
    );
  });

  test("Left Navigation Button is hidden", () => {
    const previousBtn = screen.getByTestId("previous");
    expect(previousBtn).not.toBeVisible();
  });

  test("Left Navigation Button shows when Right button is clicked", () => {
    const nextBtn = screen.getByTestId("next");
    fireEvent.click(nextBtn);

    const previousBtn = screen.getByTestId("previous");
    expect(previousBtn).toBeVisible();
  });
});
