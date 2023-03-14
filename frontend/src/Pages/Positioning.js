import React, {useState, useEffect} from "react";
import MapDynamic from './Components/MapDynamic';
import Dynamic from './Components/Dynamic';
import Static from './Components/Static';
import MapStatic from './Components/MapStatic';
import './Positioning.css';



function Positioning() {

    const [dynamic, setDynamic] = useState(false);
    const [display, setDisplay] = useState(<><Static />
    </>);
    const [map, setMap] = useState(<><MapStatic />
    </>);
    const [button, setButton] = useState('Dynamic');
    

    


    useEffect(() => {
        // console.log(dynamic);
        

        if (dynamic) {
            setDisplay(<><Dynamic /></>);
            setMap(<MapDynamic />);
            setButton('Static');
        } else  {
            setDisplay(<><Static /></>);
            setMap(<MapStatic />);
            setButton('Dynamic');
        }
        
        
      }, [dynamic]);


      function handleChange(){
        setDynamic(!dynamic);
      }


      const text = async() =>{

        const response = await fetch('http://localhost:5000/file', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(res =>{
      // console.log(res.file);
      return res.file
    }).catch(error => console.error(error));
    // const result = await response.text();
    // return result;

return response;
} 

const getFile = async () => {

  try {
    const data = await text();
    // console.log(data); 
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
    
    
  };


  getFile();


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
          <th>Orbital Velocity (km/s)</th>
          <th>Orbital Period</th>
          <th>Position Vector (xyz in km)</th>
          <th>Distance to Ground Station (km)</th>

        </tr>
      </thead>
      <tbody>
        
        <tr key='1'>
            <td>LEO VANTAGE 1</td>
            <td>9000</td>
            <td>27:-62</td>
            <td>6.500708029520797</td>
            <td></td>
            <td>-5533.71185589, 2465.19466632, 3112.29139133</td>
            <td></td>
        </tr>
        <tr key='2'>
            <td>YUNHAI 1</td>
            <td>4447.24344862</td>
            <td>38:-78</td>
            <td>7.45146457943</td>
            <td></td>
            <td>-4319.759912, 3593.17600209, 4447.24344862</td>
            <td></td>
        </tr>

        <tr key='3'>
            <td>YUNHAI 2-01</td>
            <td>1670.32732863</td>
            <td>-13:39</td>
            <td>7.945056035624952</td>
            <td></td>
            <td>-1472.46902421 -6828.65751628 -1670.32732863</td>
            <td></td>
        </tr>

        <tr key='4'>
            <td>STARLINK-1575</td>
            <td>3813.51201245</td>
            <td>33:01</td>
            <td>7.91</td>
            <td></td>
            <td>-4437.45588642 -3678.58531902  3813.51201245</td>
            <td></td>
        </tr>
        <tr key='5'>
            <td>NAVSTAR 80 (USA 309)</td>
            <td>2714.48368249</td>
            <td>-54:-17</td>
            <td>7.53</td>
            <td></td>
            <td>-14295.65082838  -5533.03168529 -2714.48368249</td>
            <td></td>
        </tr>
      </tbody>
    </table>


        </div>

    );
    
}

export default Positioning;