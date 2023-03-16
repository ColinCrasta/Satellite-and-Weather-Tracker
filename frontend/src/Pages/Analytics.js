import React, {useState, useEffect} from "react";
import {getParsedWeatherData, getParsedData, getRequestData, sendRequestData} from './Functions/Fetch';
import moment from 'moment';


function Analytics() {


    //Stores the login information usign states
  
  const [satname, setSatname] = useState();
  const [ground, setGround] = useState("45.4215:75.6972");
  const [send,setSend] = useState(true);
  const [initialRender, setInitialRender] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [satData, setSatData] = useState({});
  const [request, setRequest] = useState();
  const [requestTable, setRequestTable] = useState(<></>);
  const [table, setTable] = useState(<></>);


//fetches and adds data to the state variable when oage is loaded
useEffect(() => {
  async function getData() {
    const wData = await getParsedWeatherData();
    setWeatherData(wData);
    const sData = await getParsedData();
    setSatData(sData);
    const requestData = await getRequestData();
    setRequest(requestData);
  }
  getData();  
  

}, []);


useEffect(() => {
  
  

}, [requestTable]);

useEffect(() => {
  // console.log(request);
  let count = 0;
  let addTable;
  try {
    addTable = request['requests'].map((key) => {

      let addtable = request['sat'].map((keys) => {

        if (key['satID'] === keys['satID']) {
          count++
          

        return(
          <tr key={count}>
      <td>{keys['name']}</td>
      <td>9000</td>
      <td>{key['lastLocation']}</td>
      <td>{key['lastOrbitalSpeed']}</td>
      <td></td>
      <td>{key['lastPositionVector']}</td>
      <td>{key['groundStationDist']}</td>
      <td>{key['dateRecorded']}</td>

    </tr>
        )
          
        }
        
      })

    
        return addtable
      
  })
  } catch (error) {
    console.error(error);
  }
  
  setRequestTable(addTable);
  

}, [request]);


useEffect(() => {
  let count = 0;
  let addTable;
  try {
    addTable = Object.keys(satData).map((key) => {
      

      if (satData[key]['iteration '] === 0){

        count++

        return(
          <tr key={count}>
      <td>{key.split('iteration')[0]}</td>
      <td>9000</td>
      <td>{satData[key]['lat'].split('deg')[0]}:{satData[key]['lon'].split('deg')[0]}</td>
      <td>{satData[key]['velocity ']}</td>
      <td></td>
      <td>{satData[key]['geocentric position(km)  ']}</td>
      <td>{satData[key]['distance']}</td>

    </tr>
        )
      }
  })
  } catch (error) {
    console.error(error);
  }
  

  setTable(addTable);
  

}, [satData]);




  useEffect(() => {
    if (initialRender) {
      console.log(satname);
  console.log(ground);
  } else{
      setInitialRender(true)

    } 
  
  
  }, [send]);



    const handleSat = (e) => {
        e.preventDefault();

        let allow = false;

        Object.keys(satData).map((key) => {
      

          if (key.split(' iteration')[0] === e.target.elements.start.value){
    
            allow = true
          }
      })


      if (allow) {
        let dat = {
          sat: '',
          altitude: '',
          location: '',
          velocity: '',
          period: '',
          position: '',
          distance: '',
          time: moment().format('YYYY/MM/DD/HH/mm/ss')
        }
        Object.keys(satData).map((key) => {
      

          if (key.split(' iteration')[0] === e.target.elements.start.value){
    
            dat['sat'] = key.split(' iteration')[0];
            dat['altitude'] = 9000;
            dat['location'] = satData[key]['lat'].split('deg')[0]+ ':' + satData[key]['lon'].split('deg')[0];
            dat['velocity'] = satData[key]['velocity '];
            dat['period'] = '';
            dat['position'] = satData[key]['geocentric position(km)  '];
            dat['distance'] = satData[key]['distance'];
            // console.log(dat);

          }
      })
        setSatname(e.target.elements.start.value);
        sendRequestData(dat);
        setSend(!send);
      } else {
        window.alert('Satellite name is not entered correctly, does not exist, or is not available currently'); 
      }

      };

      const handleStation = (e) => {
        e.preventDefault();



        setGround(e.target.elements.end.value);
        setSend(!send);
    
        
        
      };


    return(
        <div>
            <h1>
                Analytics
            </h1>


            <form onSubmit={handleSat}>
        <div>
          <label> Enter the name of the satellite you would like to store data for: </label>
          <input type="text" name='start' defaultValue={satname} />
          <br />
          <br />
        </div>
        <button type="submit">Submit</button>
        </form>
        <br />
          <br />

          <h2>Satellite Requests and Data Collected</h2>

          <table className='my-table'>
      <thead>
        <tr>
          <th>Satellite</th>
          <th>Altitude (m)</th>
          <th>Location (lat:long)</th>
          <th>Orbital Velocity in vector format(km/s)</th>
          <th>Orbital Period</th>
          <th>Position Vector (xyz in km)</th>
          <th>Distance from Ground Station (km)</th>
          <th>Date Collected (YYYY/MM/DD/HH/mm/ss)</th>

        </tr>
      </thead>
      <tbody>

      {
        requestTable
      }

      </tbody>
    </table>


    <br />
          <br />

          <h2>Available Satellites</h2>
        <table className='my-table'>
      <thead>
        <tr>
          <th>Satellite</th>
          <th>Altitude (m)</th>
          <th>Location (lat:long)</th>
          <th>Orbital Velocity in vector format(km/s)</th>
          <th>Orbital Period</th>
          <th>Position Vector (xyz in km)</th>
          <th>Distance from Ground Station (km)</th>

        </tr>
      </thead>
      <tbody>

      {
        table
      }

      </tbody>
    </table>

        <br />
          <br />


        <form onSubmit={handleStation}>

        <div>
            
          <label> Enter the longitude:latitude of the location you would like to request</label>
          <input type="text" name='end' defaultValue={ground} />

          <br />
          <br /> 

        </div>

        <button type="submit">Submit</button>
      </form>
        </div>

    );
    
}

export default Analytics;