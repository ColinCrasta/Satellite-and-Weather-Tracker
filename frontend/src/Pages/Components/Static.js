import React, {useState, useEffect} from "react";
import moment from 'moment';




function Static(props) {
  console.log('static');



  const present = moment().format('YYYY/MM/DD/HH/mm/ss');
  // console.log(present);


    //Stores the login information usign states
  
  const [curr, setCurr] = useState(present);
  
  const [send, setSend] = useState(true);
  const [initialRender, setInitialRender] = useState(false);




  useEffect(() => {

    if (initialRender) {
        console.log(curr);
        
    } else{
        setInitialRender(true)
  
      } 
  
  }, [send]);


  const handleSubmit = (e) => {
    e.preventDefault();
    //  console.log(e);
    setCurr(e.target.elements.current.value);
    props.setStartTime(curr);
   
    setSend(!send);

    
    
  };

  
  



    return(

<div>
        <div>
      <h3> Satellite Position</h3>
      </div>
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <div>
          <label> Enter Time in year/month/day/hour/minute/second format: </label>
          <input type="text" name='current' defaultValue={curr} />
          <br />
          <br />
        </div>

        

        <button type="submit">Submit</button>
      </form>
      
    </div>


    );
}


export default Static;