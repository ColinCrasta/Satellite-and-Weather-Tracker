import React, {useState, useEffect} from "react";
import MapDynamic from './Components/MapDynamic';
import Dynamic from './Components/Dynamic';
import Static from './Components/Static';
import MapStatic from './Components/MapStatic';
import './Positioning.css';
import {getPosFile, getParsedData} from './Functions/Fetch';



function Positioning() {

    const [dynamic, setDynamic] = useState(false);
    const [display, setDisplay] = useState(<><Static />
    </>);
    const [map, setMap] = useState(<><MapStatic />
    </>);
    const [button, setButton] = useState('Dynamic');
    const [data, setData] = useState({});
    const [table, setTable] = useState(<></>);

    useEffect(() => {
      async function getData() {
        const parsedData = await getParsedData();
        setData(parsedData);
      }
      getData();

      
      

          
    }, []);
  
    useEffect(() => {
      console.log(data);

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
          <td></td>
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
          <td></td>
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
            setDisplay(<><Dynamic /></>);
            setMap(<MapDynamic />);
            setButton('Single Location');
        } else  {
            setDisplay(<><Static /></>);
            setMap(<MapStatic />);
            setButton('Path');
        }
        
        
      }, [dynamic]);


      function handleChange(){
        setDynamic(!dynamic);
      }

    return(
        <div>
            <h1>
                Positioning
            </h1>

            <br />
            <br />
            <br />
            <button onClick={handleChange}>{button}</button>

            <br />
            <br />
            <br />


            {display}

            <br />
            <br />
            <br />
            {map}

            <br />
            <br />
            <br />

            <table className='my-table'>
      <thead>
        <tr>
          <th>Satellite</th>
          <th>Altitude (m)</th>
          <th>Location (lat:long)</th>
          <th>Orbital Velocity in vector format(km/s)</th>
          <th>Orbital Period</th>
          <th>Position Vector (xyz in km)</th>
          <th>Distance to Ground Station (km)</th>

        </tr>
      </thead>
      <tbody>

      {
        table
      }

      </tbody>
    </table>


        </div>

    );
    
}

export default Positioning;