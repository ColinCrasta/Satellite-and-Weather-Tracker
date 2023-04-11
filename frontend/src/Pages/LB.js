import React, { useState, useEffect } from "react";
import Nav from "./Components/Navigationbar";
import { getParsedLBData } from "./Functions/Fetch";

function LB() {
  const [table, setTable] = useState();
  const [data, setData] = useState();
  const [first, setFirst] = useState(false);

  useEffect(() => {
    setFirst(true);
  }, []);

  useEffect(() => {
    let count = 0;

    let tempTable;

    if (first) {
      tempTable = Object.keys(data).map((key) => {
        console.log(data[key]["time"]);

        count++;

        return (
          <>
            <tr>
              <td rowSpan="6">{data[key]["time"]}</td>
              <td rowSpan="6">{data[key]["groundStation"]}</td>

              {data[key]["groundStation"] === "true" ? (
                <td rowSpan="6">N/A</td>
              ) : (
                <td rowSpan="6">{data[key]["reason"]}</td>
              )}
            </tr>
            {data[key]["satellites"].map((sat, index) => {
              return (
                <tr>
                  <td>{sat["satelliteid"]}</td>
                  <td>{sat["connected"]}</td>
                  <td>{sat["distance"]}</td>
                  <td>{sat["load"]}</td>
                </tr>
              );
            })}
          </>
        );
      });
    }
    setTable(tempTable);
  }, [data]);

  async function getData() {
    const requestData = await getParsedLBData();
    setData(requestData);
  }

  function handleChange(e) {
    e.preventDefault();
    getData();
  }

  return (
    <div className="bg-custom text-center">
      <div className="container px-2 text-start">
        <div>
          <Nav />
          <br />
          <div className="d-flex justify-content-center">
            <h1>Load Balancing Simulator</h1>
          </div>

          <br />
          <br />
          <br />
          <p>Click to run a simulation for the load balancer: </p>
          <div className="d-flex justify-content-left">
            <button
              onClick={handleChange}
              className="btn btn-primary btn-rounded"
            >
              Run Simulation
            </button>
          </div>

          <br />
          <br />
          <br />

          <h3>Load Balancer Data </h3>

          <div className="table table-secondary">
            <table className="my-table">
              <thead>
                <tr>
                  <th rowSpan="1">Time</th>
                  <th rowSpan="1">Ground Station Connection</th>
                  <th rowSpan="1">Reason</th>
                  <th rowSpan="1">Satellite ID</th>
                  <th rowSpan="1">Connected</th>
                  <th rowSpan="1">Distance (km)</th>
                  <th rowSpan="1">Load</th>
                </tr>

                {/*  */}
                {table}
                {/*  */}
              </thead>
            </table>
          </div>
          <br />
          <br />
          <br />
        </div>

        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default LB;
