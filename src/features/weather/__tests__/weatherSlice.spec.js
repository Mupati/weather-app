import weatherReducer, {
  setTemperatureUnit,
  increaseCurrentPage,
  decreaseCurrentPage,
  setSelectedDay,
  setPageSize,
} from "../weatherSlice";

describe("Tests weather slice", () => {
  const initialState = {
    temperatureUnit: "F",
    currentPage: 0,
    pageSize: 3,
    selectedDay: "",
  };

  test("should handle setTemperatureUnit", () => {
    let newState = weatherReducer(initialState, setTemperatureUnit("C"));
    expect(newState.temperatureUnit).toEqual("C");

    newState = weatherReducer(initialState, setTemperatureUnit("F"));
    expect(newState.temperatureUnit).toEqual("F");

    newState = weatherReducer(initialState, setTemperatureUnit());
    expect(newState.temperatureUnit).toBeUndefined();
  });

  test("should handle increaseCurrentPage", () => {
    const newState = weatherReducer(initialState, increaseCurrentPage());
    expect(newState.currentPage).toEqual(1);
  });

  test("should handle decreaseCurrentPage", () => {
    const newState = weatherReducer(
      { ...initialState, currentPage: 3 },
      decreaseCurrentPage()
    );
    expect(newState.currentPage).toEqual(2);
  });

  test("should handle setSelectedDay", () => {
    const newState = weatherReducer(initialState, setSelectedDay("2020-08-04"));
    expect(newState.selectedDay).toEqual("2020-08-04");
  });

  test("should handle setPageSize", () => {
    const newState = weatherReducer(initialState, setPageSize(3));
    expect(newState.pageSize).toEqual(3);
  });
});
