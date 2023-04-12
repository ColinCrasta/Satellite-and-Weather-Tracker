const index = require("../index");
const request = require("supertest");

const getWeather = () => {
  let alldata = "";
  fs.writeFile(
    "C:/Users/Colin/Desktop/SharedFiles/Positioning/Request/request.txt",
    "testing",
    (err) => {
      if (err) {
        console.error(err);
        return ""
          .status(500)
          .send("An error occurred while writing to the file");
      }
      console.log("File created and data written successfully");

      // './Data/weather_data.json'
      fs.readFile(
        "C:/Users/Colin/Desktop/SharedFiles/weather/Response/weather_data.json",
        "utf-8",
        (err, data) => {
          if (err) throw err;
          console.log("File read successfully");
          // console.log('Data:', data);
          alldata = data;
        }
      );
    }
  );
  return alldata;
};

describe("GET /weather", () => {
  test("weather data is retrieved", async () => {
    const correct = getWeather();
    const response = await request(index).get("/weather");
    expect(response.file).toEqual(correct);
  });
});
