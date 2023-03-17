import React, { useState, useEffect } from "react";
import LoginForm from "./Components/LoginForm";
import Nav from "./Components/Navigationbar";
import Register from "./Components/Register";




//The login page that also allows the user to register 
// their information
function Login() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [register, setRegister] = useState(false);
    const [name, setName] = useState('');


    

    useEffect(() => {
        
        //console.log(loggedIn);
      }, [loggedIn]); 

      useEffect(() => {
        
      }, [register]); 



      let display;

      if (!loggedIn) {
        display = <LoginForm loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setRegister={setRegister}
        setName={setName}/>
        
      } else {
        display = <Nav name={name} setLoggedIn={setLoggedIn}/>
      }

    

      if (register) {
        display = <Register setRegister={setRegister}/>
        
      }




  return (

    <div class="bg-custom text-center">
          <div class="container px-2 text-start">
    <div>
    {display}
    <br />
            <br /><br />
            <br /><br />
            <br /><br />
            <br /><br />
            <br /><br />
            <br /><br />
            <br /><br />
            <br /><br />
            <br /><br />
            <br /><br />
            <br />
    </div>
    </div>
    </div>


  );
}



export default Login;