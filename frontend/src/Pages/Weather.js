import React, {useEffect, useState} from 'react';





function Weather() {


    //Stores the login information usign states
  
    const [time, setCurr] = useState("2023/3/10/13/30/48");
  
    const [send,setSend] = useState(true);
    const [initialRender, setInitialRender] = useState(false);
  
  
  
  
    useEffect(() => {
  
      if (initialRender) {
          console.log(time);
          fetchLogin(time);
      } else{
          setInitialRender(true)
    
        } 
    
    }, [send]);
  
  
  
  
    //Send the login information to the server for 
  //verification
    const fetchLogin = async(currTime) => {
      console.log(currTime);
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      //  console.log(e);
      setCurr(e.target.elements.current.value);
      // console.log("Start:", start);
      // console.log("End:", end);
      setSend(!send);
  
      
      
    };
  
    
    
    return(
        <div >
            <h1>
                Weather
            </h1>
            
            <br />
            <br />
            <br />
            <form onSubmit={handleSubmit}>
        <div>
          <label> Enter Time in year/month/day/hour/minute/second</label>
          <input type="text" name='current' defaultValue={time} />
          <br />
          <br />
        </div>

        

        <button type="submit">Submit</button>
      </form>

            <br />
            <br />
            <br />


            <table>
      <thead>
        <tr>
          <th>Location (Long, Lat)</th>
          <th>Temperature (Celsius)</th>
          <th>Humidity (%)</th>
          <th>Pressure (mbar)</th>
          <th>SNR</th>
          <th>BER</th>
          <th>Modulation Scheme</th>
          <th>Bandwidth</th>
          <th>Channel Capacity</th>

        </tr>
      </thead>
      <tbody>
        
      <tr key='1'>
            <td>45.4215, 75.6972</td>
            <td>5</td>
            <td>10</td>
            <td>1016.87</td>
            <td>5</td>
            <td>5</td>
            <td>n/a</td>
            <td>5</td>
            <td>5</td>
            
            
          </tr>
        
      </tbody>
    </table>

            <br />
            <br />
            <br />
            
            
        </div>

    );
    
}

export default Weather;