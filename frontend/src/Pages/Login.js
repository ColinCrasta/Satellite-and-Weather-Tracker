import React, { useState, useEffect } from "react";
import LoginForm from "./Components/LoginForm";
import Nav from "./Components/Navigationbar";
import Register from "./Components/Register";




//The login page that also allows the user to register 
// their information
function Login() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [register, setRegister] = useState(false);


    

    useEffect(() => {
        
        //console.log(loggedIn);
      }, [loggedIn]); 

      useEffect(() => {
        
      }, [register]); 



      let display;

      if (!loggedIn) {
        display = <LoginForm loggedIn={loggedIn}
        setLog={setLoggedIn}
        setRegister={setRegister}/>
        
      } else {
        display = <Nav/>
      }

      console.log(register);

      if (register) {
        display = <Register setRegister={setRegister}/>
        
      }




  return (

    <div>
    {display}
    </div>

  );
}



export default Login;