import React, { useState } from "react";


function LoginForm(props) {
    //console.log(props);
    

    //Stores the login information usign states
  const [name, setName] = useState("n/a");
  const [pw, setPW] = useState("n/a");



  //Send the login information to the server for 
//verification
  const fetchLogin = async(uname, pword) => {
    const loginInfo = {username: uname, password: pword};
    return fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      })
      .then(response => response.json())
      .then(data => {return data.approved;})
      .catch(error => console.error(error));
      
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(e);
    //console.log("Username:", name);
    //console.log("Password:", pw);
    const approved = await fetchLogin(name, pw);
    // console.log('approved:', approved);

    if (approved) {
      props.setLog(true);
    } else {
      window.alert('Username or password is incorrect'); 
    }
    
    
  };


  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value)

  };

  const handlePW = (e) => {
    e.preventDefault();
    setPW(e.target.value)

  };


  const handleRegister = (e) => {
    e.preventDefault();
    props.setRegister(true);

  };




  return (

    <div>
        <div>
      <h1> Login </h1>
      </div>
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <div>
          <label> Username </label>
          <input type="text" value={name} onChange={handleName}/>
          <br />
          <br />
        </div>

        <div>
            {/* Setting the type to password makes sure
            the password input is not revealed but for 
            user experience it is left at "text"*/}
          <label> Password </label>
          <input type="text" value={pw} onChange={handlePW}/>

          <br />
          <br />

        </div>
        <button onClick={handleRegister}>Register</button>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}



export default LoginForm;