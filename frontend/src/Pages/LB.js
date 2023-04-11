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

  function createTable(data) {
    let count = 0;
    let table;

    table = data.map((sat) => {
      count++;
      return (
        <>
          <td>{sat["satelliteid"]}</td>
          <td>{sat["connected"]}</td>
          <td>{sat["distance"]}</td>
          <td>{sat["load"]}</td>
        </>
      );
    });

    return table;
  }

  useEffect(() => {
    let count = 0;

    let tempTable;

    if (first) {
      tempTable = Object.keys(data).map((key) => {
        console.log(data[key]["time"]);
        if (true) {
          count++;

          return (
            <tr key={count}>
              <td>{data[key]["time"]}</td>
              <td>Connected To a Satellite</td>
              <td>N/A</td>
              {createTable(data[key]["satellites"])}
            </tr>
          );
        }
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
                  <th>Time</th>
                  <th>Ground Station Connection</th>
                  <th>Reason</th>
                  <th>Satellite ID</th>
                  <th>Connected</th>
                  <th>Distance (km)</th>
                  <th>Load</th>
                </tr>
              </thead>
              <tbody>{table}</tbody>
            </table>
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default LB;
