import weatherReducer, {
  setTemperatureUnit,
  increaseCurrentPage,
  decreaseCurrentPage,
  setSelectedDay,
  setPageSize,
} from "../weatherSlice";
import { groupedData } from "../../../utils/testData";

describe("Tests weather slice", () => {
  const initialState = {
    data: {
      metric: groupedData,
      imperial: groupedData,
    },
    status: "loading",
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
    let newState = weatherReducer(initialState, increaseCurrentPage());
    expect(newState.currentPage).toEqual(1);
  });

  test("should handle decreaseCurrentPage", () => {
    let newState = weatherReducer(
      { ...initialState, currentPage: 3 },
      decreaseCurrentPage()
    );
    expect(newState.currentPage).toEqual(2);
  });

  test("should handle setSelectedDay", () => {
    let newState = weatherReducer(initialState, setSelectedDay("2020-08-04"));
    expect(newState.selectedDay).toEqual("2020-08-04");
  });

  test("should handle setPageSize", () => {
    let newState = weatherReducer(initialState, setPageSize(3));
    expect(newState.pageSize).toEqual(3);
  });
});
