import React, { useState } from "react";



function Register(props) {


    //Stores the registration information using states
  const [name, setName] = useState("n/a");
  const [pw, setPW] = useState("n/a");


  //Send the login information to the server for 
//verification and to check which fields are incorrect
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
      .then(data => {return [data.approved, data.incorrect];})
      .catch(error => console.error(error));
      
  }


  const fetchRegister = async(uname, pword) => {
    const registerInfo = {username: uname, password: pword};
    return fetch('http://localhost:5000/login/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerInfo)
      })
      .then(response => response.json())
      .then(data => {return data.inserted;})
      .catch(error => console.error(error));
      
  }


  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value)

  };

  const handlePW = (e) => {
    e.preventDefault();
    setPW(e.target.value)

  };

  const handleBack = (e) => {
    e.preventDefault();
    props.setRegister(false);

  };


    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(e);
        //console.log("Username:", name);
        //console.log("Password:", pw);
        const data = await fetchLogin(name, pw);
        // console.log('approved:', data[0]);
        // console.log('incorrect:', data[1]);

        if (data[1] === 'none' ) {
            window.alert('The username is already in use, choose another one');
          } else if(data[1] === 'username') {
            console.log('registered');
            fetchRegister(name, pw);
            props.setRegister(false);
            window.alert('You have been registered successfully');
          } else if(data[1] === 'password') {
            window.alert('The username is already in use, choose another one');
          } else if(data[1] === 'both') {
            console.log('registered');
            fetchRegister(name, pw);
            props.setRegister(false);
            window.alert('You have been registered successfully');
          }
      };






    return (

        <div>
            <div>
          <h1> Register </h1>
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
            <button onClick={handleBack}>Back</button>
            <br />
            <button type="submit">Register</button>
          </form>
        </div>
      );

}


export default Register;