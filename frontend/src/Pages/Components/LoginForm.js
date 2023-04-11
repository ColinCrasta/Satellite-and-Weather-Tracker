import React, { useState } from "react";

function LoginForm(props) {
  //console.log(props);

  //Stores the login information usign states
  const [name, setName] = useState("n/a");
  const [pw, setPW] = useState("n/a");

  //Send the login information to the server for
  //verification
  const fetchLogin = async (uname, pword) => {
    const loginInfo = { username: uname, password: pword };
    return fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        return [data.approved, data.userApproved];
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(e);
    //console.log("Username:", name);
    //console.log("Password:", pw);
    const approved = await fetchLogin(name, pw);
    // console.log('approved:', approved);

    if (approved[0] && approved[1]) {
      localStorage.setItem("name", name);
      props.setName(name);
      props.setLoggedIn(true);
    } else if (approved[0] && !approved[1]) {
      window.alert("User is not approved");
    } else {
      window.alert("Username or password is incorrect");
    }
  };

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handlePW = (e) => {
    e.preventDefault();
    setPW(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    props.setRegister(true);
  };

  return (
    <div className="bg-custom text-center">
      <div>
        <br />
        <h1> Login </h1>
      </div>
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <div>
          <label> Username: </label>
          <input type="text" value={name} onChange={handleName} />
          <br />
          <br />
        </div>

        <div>
          {/* Setting the type to password makes sure
            the password input is not revealed but for 
            user experience it is left at "text"*/}
          <label> Password: </label>
          <input type="password" value={pw} onChange={handlePW} />

          <br />
          <br />
        </div>
        <button
          onClick={handleRegister}
          className="btn btn-primary btn-rounded-3"
        >
          Register Now
        </button>
        <br />
        <br />
        <button type="submit" className="btn btn-primary btn-rounded-3">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
