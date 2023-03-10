import React, { useState, useEffect } from "react";
import LoginForm from "./Components/LoginForm";
import Nav from "./Components/Navigationbar";




//The login page that also allows the user to register 
// their information
function Login() {

    const [loggedIn, setLoggedIn] = useState(false);

    

    useEffect(() => {
        
        //console.log(loggedIn);
      }, [loggedIn]); 


        let display;
      if (!loggedIn) {
        display = <LoginForm loggedIn={loggedIn}
        setLog={setLoggedIn} />
        
      } else {
        display = <Nav/>
      }




  return (

    <div>
    {display}
    </div>

  );
}



export default Login;