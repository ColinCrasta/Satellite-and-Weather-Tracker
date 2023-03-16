import React, {useState, useEffect} from "react";
import {getParsedWeatherData, getParsedData} from './Functions/Fetch';


function Analytics() {



    

    //Stores the login information usign states
  
  const [satname, setSatname] = useState();
  const [end, setEnd] = useState("45.4215:75.6972");
  const [send,setSend] = useState(true);
  const [initialRender, setInitialRender] = useState(false);
  const [data, setData] = useState({});


//fetches and adds data to the state variable when oage is loaded
useEffect(() => {
  async function getData() {
    const parsedData = await getParsedWeatherData();
    setData(parsedData);
  }
  getData();  
  

}, []);


  useEffect(() => {
    if (initialRender) {
      console.log(satname);
  console.log(end);
  } else{
      setInitialRender(true)

    } 
  
  
  }, [send]);



    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e);
        setSatname(e.target.elements.start.value);
        setEnd(e.target.elements.end.value);
        // console.log("Start:", start);
        // console.log("End:", end);
        setSend(!send);
    
        
        
      };


    return(
        <div>
            <h1>
                Analytics
            </h1>


            <form onSubmit={handleSubmit}>
        <div>
          <label> Enter the name of the satellite you would like to request</label>
          <input type="text" name='start' defaultValue={satname} />
          <br />
          <br />
        </div>

        <div>
            
          <label> Enter the longitude:latitude of the location you would like to request</label>
          <input type="text" name='end' defaultValue={end} />

          <br />
          <br /> 

        </div>

        <button type="submit">Submit</button>
      </form>
        </div>

    );
    
}

export default Analytics;