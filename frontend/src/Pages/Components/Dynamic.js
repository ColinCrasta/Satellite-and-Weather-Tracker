import React, {useState, useEffect} from "react";
import moment from 'moment';
import {getParsedWeatherData, getParsedData, getRequestData, sendRequestData} from '../Functions/Fetch';




function Dynamic(props) {
  console.log('dynamic');

  const present = moment().format('YYYY/MM/DD/HH/mm/ss');
  const future = moment().add(50, 'minutes').format('YYYY/MM/DD/HH/mm/ss');

    

    //Stores the login information usign states
  
  const [start, setStart] = useState(present);
  const [end, setEnd] = useState(future);
  const [send,setSend] = useState(true);
  const [initialRender, setInitialRender] = useState(false);



  useEffect(() => {
    if (initialRender) {
      console.log(start);
  console.log(end);
 
  } else{
      setInitialRender(true)

    } 
    props.setStartTime(start);
    props.setEndTime(end);
  
  
  }, [send]);



  

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e);
    setStart(e.target.elements.start.value);
    setEnd(e.target.elements.end.value);
    // console.log("Start:", start);
    // console.log("End:", end);




    setSend(!send);
    

    
    
  };

  
  



    return(

<div>
        <div>
      <h3> Path of the Satellites </h3>
      </div>
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <div>
          <label> Enter Start Time in year/month/day/hour/minute/second format: </label>
          <input type="text" name='start' defaultValue={start} />
          <br />
          <br />
        </div>

        {/* <div>
            
          <label> Enter End Time in year/month/day/hour/minute/second format: </label>
          <input type="text" name='end' defaultValue={end} />

          <br />
          <br /> 

        </div> */}

        <button type="submit">Submit</button>
      </form>

    </div>


    );
}


export default Dynamic;