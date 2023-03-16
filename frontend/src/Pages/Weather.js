import React, {useEffect, useState, useRef} from 'react';
import './Positioning.css';
import {getParsedWeatherData} from './Functions/Fetch';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from 'chart.js'

import moment from 'moment';
import Nav from "./Components/Navigationbar";



ChartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip

)


function Weather() {
  console.log('weather');

  const [data, setData] = useState({});
  const [table, setTable] = useState(<></>);
 
  //Stores the login information using states
  
  const [time, setTime] = useState(moment().format('YYYY/MM/DD/HH/mm/ss'));
  
  const [send,setSend] = useState(true);
  

  //Rerenders page every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('reloaded');
      async function getData() {
        const parsedData = await getParsedWeatherData();
        setData(parsedData);
      }
      getData();
      
      
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  
 
  
//fetches and adds data to the state variable when oage is loaded
  useEffect(() => {
    async function getData() {
      const parsedData = await getParsedWeatherData();
      setData(parsedData);
    }
    getData();  
    

  }, [time]);


//displays the values in a table for the specififed time
  useEffect(() => {
    // console.log(data);

    let count = 0;
    let addTable; 
      addTable = Object.keys(data).map((key) => {
        // console.log(data[0]['capacity']);

        
        if (key === '0'){

          count++

          return(
            <tr key={count}>
        <td>45.4215, -75.6972</td>
        <td>{data[key]['temperature']}</td>
        <td>{data[key]['humidity']}</td>
        <td>{data[key]['pressure']}</td>
        <td>{data[key]['snr']}</td>
        <td>{data[key]['ber']}</td>
        <td></td>
        <td>{data[key]['capacity']}</td>
        

      </tr>
          )
        }



    })
    // console.log(addTable);
    setTable(addTable);
    
  }, [data]);



  
  const t1 = moment().add(0, 'minutes').format('HH/mm');
  const t2 = moment().add(10, 'minutes').format('HH/mm');
  const t3 = moment().add(20, 'minutes').format('HH/mm');
  const t4 = moment().add(30, 'minutes').format('HH/mm');
  const t5 = moment().add(40, 'minutes').format('HH/mm');
  const t6 = moment().add(50, 'minutes').format('HH/mm');
  const t7 = moment().add(60, 'minutes').format('HH/mm');
  const t8 = moment().add(70, 'minutes').format('HH/mm');

 
function getValues(name) {
 
  let arr = [];
  Object.keys(data).map((key) => {
        
    arr.push(data[key][name]);
      
    })

    // console.log(arr);
  return arr;
  
}

//Gets the data for the graphs
function getData(lineTitle, yValues) {
 
  const data = {
    labels: [t1, t2 , t3, t4, t5, t6, t7, t8],
    datasets: [
      {
        label: lineTitle,
         data: getValues(yValues), 
        backgroundColor: 'aqua',
        borderColor: 'black',
        pointBorderColor: 'aqua',
        fill: true,
        tension: 0.4
      }
    ]
  }

    // console.log(arr);
  return data;
  
}

//Fills the titles and cosmetics for the graphs
function getOptions(xTitle, yTitle, yValues) {
 
  const options = {
    plugins: {
      legend: true
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xTitle
        }
      },
      y: {
        min:  Math.min(...(getValues(yValues))),
        max: Math.max(...(getValues(yValues))),
        title: {
          display: true,
          text: yTitle
        }

      }
    }
  }

    // console.log(arr);
  return options;
  
}
  


  
    const handleSubmit = (e) => {
      e.preventDefault();
      //  console.log(e);
      setTime(e.target.elements.current.value);
      // console.log("Start:", start);
      // console.log("End:", end);
      setSend(!send);
    };
  
    
    return(
        <div >

          <Nav />
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
      
          {table}
        
      </tbody>
    </table>

            <br />
            <br />
            <br />
            
            <div style={{
              width: '500px',
              height: '1000px',
              padding : '20px'
            }
            }
            >
              <h1>SNR vs Time</h1>
            <Line
            data = {getData('SNR', 'snr')}
            options = {getOptions('Time (hours/seconds)', 'SNR (dB)', 'snr')}
            >

            </Line>


            <h1>Pressure vs Time</h1>
            <Line
            data = {getData('Pressure', 'pressure')}
            options = {getOptions('Time (hours/seconds)', 'Pressure (mbar)', 'pressure')}
            >

            </Line>

            <h1>Channel Capacity vs Time</h1>
            <Line
            data = {getData('Channel Capacity', 'capacity')}
            options = {getOptions('Time (hours/seconds)', 'Channel Capacity (bits per second)', 'capacity')}
            >

            </Line>
            </div>
        </div>

    );
    
}

export default Weather;