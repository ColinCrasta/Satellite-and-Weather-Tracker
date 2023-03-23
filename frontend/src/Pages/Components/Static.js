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
    setCurr(e.target.elements.time.value);
    props.setStartTime(e.target.elements.time.value);


    if (e.target.elements.sat.value === '') {
      props.setName('allsatellites')
    } else {
      let allow = false
      Object.keys(props.data).map((key) => {

        if (key.split(' iteration')[0] === e.target.elements.sat.value){
  
          allow = true
        }
    })


    if (allow) {
      props.setName(e.target.elements.sat.value);
    } else {
      window.alert('Satellite name is not entered correctly, does not exist, or is not available currently'); 
    }


      
    }
    
    
   
    setSend(!send);

    
    
  };

  
  



    return(

<div>
        <div>
      <h3> Satellite Position</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label" style={{ fontSize: '20px' }}> Enter the start time: </label>
          <input type="text" name='time' defaultValue={curr} className="form-control" /> 
          <br />
          <label className="form-label" style={{ fontSize: '20px' }}> Enter the satellite name: </label>
          <input type="text" name='sat' defaultValue='' className="form-control" /> 
          <br />
        </div>

        

        <button type="submit" className="btn btn-primary">Submit</button> 
      </form>
      
    </div>


    );
}


export default Static;