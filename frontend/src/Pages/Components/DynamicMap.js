import React, {useState, useEffect} from "react";



function DynamicMap(props) {



    

    //Stores the login information usign states
  
  const [start, setStart] = useState("2023/3/10/13/30/48");
  const [end, setEnd] = useState("2023/3/10/14/30/48");
  const [send,setSend] = useState(true);
  const [initialRender, setInitialRender] = useState(false);



  useEffect(() => {
    if (initialRender) {
      console.log(start);
  console.log(end);
  fetchLogin(start, end);
  } else{
      setInitialRender(true)

    } 
  
  
  }, [send]);




  //Send the login information to the server for 
//verification
  const fetchLogin = async(startTime, endTime) => {
    console.log(startTime, endTime);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e);
    setStart(e.target.elements.start.value);
    setEnd(e.target.elements.end.value);
    // console.log("Start:", start);
    // console.log("End:", end);
    setSend(!send);

    
    
  };

  
  



    return(

<div>
        <div>
      <h3> Dynamic Satellite  Location </h3>
      </div>
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <div>
          <label> Enter Start Time in year/month/day/hour/minute/second</label>
          <input type="text" name='start' defaultValue={start} />
          <br />
          <br />
        </div>

        <div>
            
          <label> Enter End Time in year/month/day/hour/minute/second</label>
          <input type="text" name='end' defaultValue={end} />

          <br />
          <br /> 

        </div>

        <button type="submit">Submit</button>
      </form>
    </div>


    );
}


export default DynamicMap;