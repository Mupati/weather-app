import React from "react";
import { Provider } from "react-redux";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";

import WeatherCard from "../WeatherCard";
import { groupedData } from "../../utils/testData";

const mockStore = configureStore([]);

describe("<WeatherCard/>", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      weather: {
        data: {
          imperial: groupedData,
        },
        temperatureUnit: "F",
        pageSize: 3,
      },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <WeatherCard />
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test("Weather Card dispatches action when clicked", () => {
    fireEvent.click(screen.queryAllByTestId("weather-card")[0]);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  test("Correct number of cards are displayed from weather data", () => {
    expect(screen.queryAllByTestId("weather-card").length).toEqual(
      store.getState().weather.pageSize
    );
  });
});
