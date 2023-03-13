import React, {useState, useEffect} from "react";
import Mapbox from './Components/Mapbox';
import DynamicMap from './Components/DynamicMap';
import StaticMap from './Components/StaticMap';


function Positioning() {

    const [dynamic, setDynamic] = useState(false);
    const [display, setDisplay] = useState(<StaticMap />);
    const [button, setButton] = useState('Dynamic');
    

    


    useEffect(() => {
        // console.log(dynamic);
        

        if (dynamic) {
            setDisplay(<DynamicMap />);
            setButton('Static');
        } else  {
            setDisplay(<StaticMap />);
            setButton('Dynamic');
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



            <Mapbox />
        </div>

    );
    
}

export default Positioning;