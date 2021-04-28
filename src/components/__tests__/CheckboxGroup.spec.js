import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import weatherReducer from "../../features/weather/weatherSlice";
import CheckboxGroup from "../CheckboxGroup";

describe("<CheckboxGroup />", () => {
  const store = configureStore({
    reducer: {
      weather: weatherReducer,
    },
  });

  beforeEach(() => {
    render(
      <Provider store={store}>
        <CheckboxGroup />
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test("Fahrenheit is already checked", () => {
    const fahrenheitCheckbox = screen.getByLabelText("Fahrenheit");
    expect(fahrenheitCheckbox).toBeChecked();
  });

  test("Celsius is not checked", () => {
    const celsiusCheckbox = screen.getByLabelText("Celsius");
    expect(celsiusCheckbox).not.toBeChecked();
  });

  test("Celsius is checked after clicking", () => {
    const celsiusCheckbox = screen.getByLabelText("Celsius");
    const fahrenheitCheckbox = screen.getByLabelText("Fahrenheit");
    fireEvent.click(celsiusCheckbox);

    expect(celsiusCheckbox).toBeChecked();
    expect(fahrenheitCheckbox).not.toBeChecked();
  });
});
