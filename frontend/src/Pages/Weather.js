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



ChartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip

)


function Weather() {

  const [data, setData] = useState({});
  const [table, setTable] = useState(<></>);
  const [snr, setSNR] = useState([]);


  
  const present = moment().format('YYYY/MM/DD/HH/mm/ss');
  const t1 = moment().add(0, 'minutes').format('HH/mm');
  const t2 = moment().add(20, 'minutes').format('HH/mm');
  const t3 = moment().add(30, 'minutes').format('HH/mm');
  const t4 = moment().add(40, 'minutes').format('HH/mm');
  const t5 = moment().add(40, 'minutes').format('HH/mm');
  const t6 = moment().add(50, 'minutes').format('HH/mm');
  const t7 = moment().add(60, 'minutes').format('HH/mm');
  const t8 = moment().add(70, 'minutes').format('HH/mm');

 

  let SNRValues = []

  useEffect(() => {
    Object.keys(data).map((key) => {
        
      SNRValues.push(data[key]['capacity']);
        
      })

      console.log(SNRValues);
      setTimeout(1000);
    
  }, [data]);

  
      


  const SNRdata = {
    labels: [t1, t2 , t3, t4, t5, t6, t7, t8],
    datasets: [
      {
        label: 'SNR',
        data: [209.1319580078125, 209.1319580078125,
          209.1319580078125,
          209.13198852539062,
          209.13198852539062,
          209.1410369873047,
          209.15345764160156,
          209.15345764160156
        ],
        backgroundColor: 'aqua',
        borderColor: 'black',
        pointBorderColor: 'aqua',
        fill: true,
        tension: 0.4
      }
    ]
  }
  

  const SNRoptions = {
    plugins: {
      legend: true
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (hours/seconds)'
        }
      },
      y: {
        min: 209.10,
        max: 209.20,
        title: {
          display: true,
          text: 'SNR (dB)'
        }

      }
    }
  }


  const pressuredata = {
    labels: [t1, t2 , t3, t4, t5, t6, t7, t8],
    datasets: [
      {
        label: 'Pressure',
        data: [
          1013,
          1013,
          1013,
          1013,
          1013,
          1013,
          1017,
          1017
        ],
        backgroundColor: 'aqua',
        borderColor: 'black',
        pointBorderColor: 'aqua',
        fill: true,
        tension: 0.4
      }
    ]
  }



  const pressureoptions = {
    plugins: {
      legend: true
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (hours/seconds)'
        }
      },
      y: {
        min: 1011,
        max: 1018,
        title: {
          display: true,
          text:  'Pressure (mbar)'
        }

      }
    }
  }
  


  
  const chandata = {
    labels: [t1, t2 , t3, t4, t5, t6, t7, t8],
    datasets: [
      {
        label: 'Channel Capacity',
        data: [61391228,
          61391228,
          61391228,
          61391228,
          61391228,
          61391844,
          61392688,
          61392688
        ],
        backgroundColor: 'aqua',
        borderColor: 'black',
        pointBorderColor: 'aqua',
        fill: true,
        tension: 0.4
      }
    ]
  }


  
  const chanoptions = {
    plugins: {
      legend: true
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (hours/seconds)'
        }
      },
      y: {
        min: 61391220,
        max: 61392690,
        title: {
          display: true,
          text:  'Channel Capacity (bits per second)'
        }

      }
    }
  }
  
  

  useEffect(() => {
    async function getData() {
      const parsedData = await getParsedWeatherData();
      setData(parsedData);
    }
    getData();  

  }, []);



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


    //Stores the login information usign states
  
    const [time, setCurr] = useState(present);
  
    const [send,setSend] = useState(true);
    const [initialRender, setInitialRender] = useState(false);
  
  
  
  
    useEffect(() => {
  
      if (initialRender) {
          // console.log(time);
          fetchLogin(time);
      } else{
          setInitialRender(true)
    
        } 
    
    }, [send]);
  
  
  
  
    //Send the login information to the server for 
  //verification
    const fetchLogin = async(currTime) => {
      // console.log(currTime);
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
      
          {table}
        
      </tbody>
    </table>

            <br />
            <br />
            <br />
            
            <div style={{
              width: '1000px',
              height: '1000px',
              padding : '20px'
            }
            }
            >
              <h1>SNR vs Time</h1>
            <Line
            data = {SNRdata}
            options = {SNRoptions}
            >

            </Line>


            <h1>Pressure vs Time</h1>
            <Line
            data = {pressuredata}
            options = {pressureoptions}
            >

            </Line>

            <h1>Channel Capacity vs Time</h1>
            <Line
            data = {chandata}
            options = {chanoptions}
            >

            </Line>
            </div>
        </div>

    );
    
}

export default Weather;