import React from "react";
import { render } from "@testing-library/react";
import {
  getParsedLBData,
  getLBFile,
  getParsedWeatherData,
  getWeatherFile,
  getPosFile,
  getParsedData,
} from "../Pages/Functions/Fetch";
import moment from "moment";

async function fetchLBData() {
  let parsedData;
  try {
    await getLBFile().then((res) => {
      console.log("gsgs");
      parsedData = JSON.parse(res);
      console.log(parsedData);
    });
    // console.log(data);
  } catch (error) {
    console.error(error);
    return error;
  }

  return parsedData;
}

async function fetchWeatherData() {
  const response = await fetch("http://localhost:5000/weather", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      // console.log(res.file);
      return res.file;
    })
    .catch((error) => console.error(error));
  // const result = await response.text();
  // return result;
  // console.log(response);
  return response;
}

async function fetchPosData() {
  const bodyData = {
    time: moment().format("YYYY/MM/DD/HH/mm/ss"),
    name: "allsatellites",
  };

  const response = await fetch("http://localhost:5000/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  })
    .then((response) => response.json())
    .then((res) => {
      // console.log(res.file);
      return res.file;
    })
    .catch((error) => console.error(error));
  // const result = await response.text();
  // return result;

  return response;
}

describe(getParsedLBData, () => {
  it("Fetches the parsed weather data", () => {
    const correct = fetchLBData();
    const output = getParsedLBData();
    expect(output).toEqual(correct);
  });
});

describe(getParsedWeatherData, () => {
  it("Fetches the parsed weather data", () => {
    const correct = fetchWeatherData();
    const output = getParsedWeatherData();
    expect(output).toEqual(correct);
  });
});

describe(getParsedData, () => {
  it("Fetches the parsed weather data", () => {
    const correct = fetchPosData();
    const output = getParsedData();
    expect(output).toEqual(correct);
  });
});
