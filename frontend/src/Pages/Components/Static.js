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

      <form onSubmit={handleSubmit}>
        <div>
          <label class="form-label" style={{ fontSize: '20px' }}> The following data is real-time at the time in year/month/day/hour/minute/second format: {curr}</label>
          {/* <input type="text" name='current' defaultValue={curr} class="form-control" /> */}
          <br />
        </div>

        

        {/* <button type="submit" class="btn btn-primary">Submit</button> */}
      </form>
      
    </div>


    );
}


export default Static;