import React, {useState, useEffect} from "react";
import MapDynamic from './Components/MapDynamic';
import Dynamic from './Components/Dynamic';
import Static from './Components/Static';
import MapStatic from './Components/MapStatic';
import './Positioning.css';
import {getParsedData} from './Functions/Fetch';
import moment from 'moment';
import Nav from "./Components/Navigationbar";
import './Color.css'


function Positioning() {
  

    const [dynamic, setDynamic] = useState(false);
    const [data, setData] = useState({});
    const [display, setDisplay] = useState(<><Static />
    </>);
    const [map, setMap] = useState(<><MapStatic data={data} />
    </>);
    const [button, setButton] = useState('Dynamic');
    
    const [table, setTable] = useState(<></>);
    const [startTime, setStartTime] = useState(moment().format('YYYY/MM/DD/HH/mm/ss'));
    const [endTime, setEndTime] = useState(moment().format('YYYY/MM/DD/HH/mm/ss'));


    //Rerenders page every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('reloaded');
      async function getData() {
        const parsedData = await getParsedData();
        setData(parsedData);
      }
      getData();
      
      
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  console.log('positioning');


    useEffect(() => {
      console.log(startTime); 
      console.log(endTime); 
      if (dynamic) {
        setMap(<MapDynamic data={data} startTime={startTime} endTime={endTime}/>)
      } else {
        setMap(<MapStatic data={data} startTime={startTime} endTime={endTime}/>)
        
      }
      
    }, [startTime, data]);


    useEffect(() => {
      async function getData() {
        const parsedData = await getParsedData();
        setData(parsedData);
      }
      getData();  
    }, []);
  
    useEffect(() => {
      // console.log(data);

      if (!dynamic) {
        let count = 0;
      let addTable;
      try {
        addTable = Object.keys(data).map((key) => {
          

          if (data[key]['iteration '] === 0){

            count++

            return(
              <tr key={count}>
          <td>{key.split('iteration')[0]}</td>
          <td>9000</td>
          <td>{data[key]['lat'].split('deg')[0]}:{data[key]['lon'].split('deg')[0]}</td>
          <td>{data[key]['velocity ']}</td>
          <td>{data[key]['geocentric position(km)  ']}</td>
          <td>{data[key]['distance']}</td>

        </tr>
            )
          }
      })
      } catch (error) {
        console.error(error);
      }
      

      setTable(addTable);
      } else {
        let count = 0;
      let addTable;
      try {
        addTable = Object.keys(data).map((key) => {
          


            count++

            return(
              <tr key={count}>
          <td>{key}</td>
          <td>9000</td>
          <td>{data[key]['lat'].split('deg')[0]}:{data[key]['lon'].split('deg')[0]}</td>
          <td>{data[key]['velocity ']}</td>
          <td>{data[key]['geocentric position(km)  ']}</td>
          <td>{data[key]['distance']}</td>

        </tr>
            )
          
      })
      } catch (error) {
        console.error(error);
      }
      

      setTable(addTable);
      }
      
      
    
    }, [data, dynamic]);


    


    useEffect(() => {
        // console.log(dynamic);
        

        if (dynamic) {
            setDisplay(<><Dynamic  startTime={startTime} setStartTime={setStartTime}
              endTime={endTime} setEndTime={setEndTime}
              /></>);
            setMap(<MapDynamic data={data} startTime={startTime} endTime={endTime}/>);
            setButton('Single Location');
        } else  {
            setDisplay(<><Static startTime={startTime}setStartTime={setStartTime} 
              /></>);
            setMap(<MapStatic data={data} startTime={startTime} />);
            setButton('Trajectory');
        }
        
        
      }, [dynamic]);


      function handleChange(){
        // setStartTime()
        // window.location.reload()
        setDynamic(!dynamic);
      }

    return(
        <div class="bg-custom text-center">
          <div class="container px-2 text-start">
          <Nav />

          <br />
          <div class="d-flex justify-content-center">
            <h1>
                Positioning
            </h1>
            </div>

            <br />
            <br />
            <br />

            <p>Click to view the trajectory of the satellites: </p>
            <div class="d-flex justify-content-left">
              
    <button onClick={handleChange} class="btn btn-primary btn-rounded">{button}</button>
  </div>
            <br />
            <br />
            <br />


            {display}

            <br />
            <h4>Interactive Globe</h4>
            {map}

            <br />
            <br />
            <br />
<div class="table table-secondary">

  <h4>Individual Satellite Data</h4>
            <table className='my-table rounded-3 '>
      <thead>
        <tr>
          <th>Satellite</th>
          <th>Altitude (m)</th>
          <th>Location (lat:long)</th>
          <th>Orbital Velocity in vector format(km/s)</th>
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

    </div>
    <br />
            <br />
            <br />
            <br />

    </div>

        </div>

    );
    
}

export default Positioning;