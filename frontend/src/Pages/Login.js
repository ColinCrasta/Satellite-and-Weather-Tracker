import React, { useState } from "react";




//The login page that also allows the user to register 
// their information
function Login() {

    //Stores the login information usign states
  const [name, setName] = useState("n/a");
  const [pw, setPW] = useState("n/a");

//   const fetchLogin = () => {
//     fetch('https://jsonplaceholder.typicode.com/posts')
//       .then(response => response.json())
//       .then(data => setData(data))
//       .catch(error => console.error(error));
//   }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    console.log("Username:", name);
    console.log("Password:", pw);
  };


  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value)

  };

  const handlePW = (e) => {
    e.preventDefault();
    setPW(e.target.value)

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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}



export default Login;