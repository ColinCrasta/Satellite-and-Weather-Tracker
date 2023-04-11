import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  getParsedWeatherData,
  getParsedData,
  getRequestData,
  sendRequestData,
} from "../Functions/Fetch";

function Dynamic(props) {
  console.log("dynamic");

  const present = moment().format("YYYY/MM/DD/HH/mm/ss");
  const future = moment().add(50, "minutes").format("YYYY/MM/DD/HH/mm/ss");

  //Stores the login information usign states

  const [time, setTime] = useState(present);
  const [end, setEnd] = useState(future);
  const [send, setSend] = useState(true);
  const [initialRender, setInitialRender] = useState(false);

  useEffect(() => {
    if (initialRender) {
      console.log(time);
      console.log(end);
    } else {
      setInitialRender(true);
    }
    props.setStartTime(time);
    props.setEndTime(end);
  }, [send]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e);
    setTime(e.target.elements.time.value);
    props.setStartTime(e.target.elements.time.value);

    if (e.target.elements.sat.value === "") {
      props.setName("allsatellites");
    } else {
      let allow = false;
      Object.keys(props.data).map((key) => {
        if (key.split(" iteration")[0] === e.target.elements.sat.value) {
          allow = true;
        }
      });
      if (allow) {
        props.setName(e.target.elements.sat.value);
      } else {
        window.alert(
          "Satellite name is not entered correctly, does not exist, or is not available currently"
        );
      }
    }

    setSend(!send);
  };

  return (
    <div>
      <div>
        <h3> Path of the Satellites </h3>
      </div>

      <p style={{ fontSize: "18px" }}>
        Current Time (YYYY/MM/DD/HH/mm/ss): {time}
      </p>
      <p style={{ fontSize: "18px" }}>
        The satellite trajectories for the next one hour and their positions
        every 3 minutes are displayed on the globe below as yellow dots
      </p>

      {/* <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label" style={{ fontSize: "20px" }}>
            {" "}
            Enter the start time:{" "}
          </label>
          <input
            type="text"
            name="time"
            defaultValue={time}
            className="form-control"
          />
          <br />
          <label className="form-label" style={{ fontSize: "20px" }}>
            {" "}
            Enter the satellite name:{" "}
          </label>
          <input
            type="text"
            name="sat"
            defaultValue=""
            className="form-control"
          />

          <br />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form> */}
    </div>
  );
}

export default Dynamic;
