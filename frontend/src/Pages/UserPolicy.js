import React, { useState, useEffect } from "react";
import Nav from "./Components/Navigationbar";

function UserPolicy() {
  const [table, setTable] = useState();
  const [data, setData] = useState();
  const [first, setFirst] = useState(false);

  useEffect(() => {
    setFirst(true);
  }, []);

  //Send the login information to the server for
  //verification
  const fetchUserInfo = async () => {
    return fetch("http://localhost:5000/login/getusers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data["userInfo"];
      })
      .catch((error) => console.error(error));
  };

  const fetchAdminUser = async (name, admin) => {
    const userInfo = { username: name, admin: admin };
    return fetch("http://localhost:5000/login/adminuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    }).catch((error) => console.error(error));
  };

  const fetchApproveUser = async (name, approved) => {
    const userInfo = { username: name, approved: approved };
    return fetch("http://localhost:5000/login/approveuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    }).catch((error) => console.error(error));
  };

  let userData;
  async function fetchData() {
    userData = await fetchUserInfo();
    console.log("fetchdata");
    // console.log(data);
    setData(userData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
    let count = 0;

    let tempTable;

    if (first) {
      tempTable = Object.keys(data).map((key) => {
        // console.log(data[key]);

        count++;

        return (
          <>
            <tr key={count}>
              <td>{data[key]["username"]}</td>
              {/* <td>{data[key]["admin"].toString()}</td>
              <td>{data[key]["approved"].toString()}</td> */}
              <td>
                <input
                  type="checkbox"
                  defaultChecked={data[key]["admin"]}
                  onChange={(e) => handleAdmin(e, data[key]["username"])}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={data[key]["approved"]}
                  onChange={(e) => handleApprove(e, data[key]["username"])}
                />
              </td>
            </tr>
          </>
        );
      });
    }
    setTable(tempTable);
  }, [data]);

  const handleAdmin = (e, name) => {
    e.preventDefault();
    fetchAdminUser(name, e.target.checked)
      .then(() => {
        try {
          fetchData();
        } catch (error) {
          console.error(error);
        }
      })
      .catch((error) => console.error(error));
    console.log(e.target.checked);
    console.log(name);
  };

  const handleApprove = async (e, name) => {
    e.preventDefault();
    await fetchApproveUser(name, e.target.checked)
      .then(() => {
        try {
          fetchData();
        } catch (error) {
          console.error(error);
        }
      })
      .catch((error) => console.error(error));
    console.log(e.target.checked);
    console.log(name);
  };

  return (
    <div className="bg-custom text-center">
      <div className="container px-2 text-start">
        <Nav />
        <br />
        <h1>User Policy</h1>
        <br />
        <br />
        <br />

        <label>
          Tick the box of the username of the user you like to approve or change
          to an administrator
        </label>

        <br />
        <br />
        <br />
        <div className="table table-secondary">
          <table className="my-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Administrator</th>
                <th>Approved</th>
              </tr>
            </thead>
            <tbody>{table}</tbody>
          </table>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default UserPolicy;
