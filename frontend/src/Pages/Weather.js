import React, {useEffect, useState} from 'react';
import './Positioning.css';





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


            <table className='my-table'>
      <thead>
        <tr>
          <th>Location (Lat, Long)</th>
          <th>Temperature (Celsius)</th>
          <th>Humidity (%)</th>
          <th>Pressure (mbar)</th>
          <th>SNR (dB)</th>
          <th>BER</th>
          <th>Modulation Scheme</th>
          <th>Channel Capacity (bps)</th>

        </tr>
      </thead>
      <tbody>
        
      <tr key='1'>
            <td>45.4215, -75.6972</td>
            <td>0.47230979800224304</td>
            <td>89.20198822021484</td>
            <td>1015.755126953125</td>
            <td>09.15025329589844</td>
            <td>0.0</td>
            <td>n/a</td>
            <td>61392444.0</td>
            
            
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