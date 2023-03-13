import React, {useState, useEffect} from "react";
import MapDynamic from './Components/MapDynamic';
import Dynamic from './Components/Dynamic';
import Static from './Components/Static';
import MapStatic from './Components/MapStatic';



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


        </div>

    );
    
}

export default Positioning;