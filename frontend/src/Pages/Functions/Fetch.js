import React, { useState, useEffect } from "react";
import moment from 'moment';




export const getWeatherFile = async() =>{

    const response = await fetch('http://localhost:5000/weather', {
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
// console.log(response);
return response;
} 



export const getParsedWeatherData = async () => {
  let parsedData;
  try {
    await getWeatherFile().then(res =>{
      parsedData = JSON.parse(res);
    });
    // console.log(data); 
    
  } catch (error) {
    console.error(error);
    return error;
  }

  return parsedData;

  };



export const getPosFile = async(time, name) =>{

  const bodyData = {time: time, name: name};

    const response = await fetch('http://localhost:5000/data', {
  method: 'POSt',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(bodyData)
}).then(response => response.json()).then(res =>{
  // console.log(res.file);
  return res.file
}).catch(error => console.error(error));
// const result = await response.text();
// return result;

return response;
}





export const getParsedData = async (time = moment().format('YYYY/MM/DD/HH/mm/ss'), name="allsatellites") => {
    let parsedData;
    try {
      await getPosFile(time, name).then(res =>{
        parsedData = JSON.parse(res);
      });
      // console.log(data); 
      
    } catch (error) {
      console.error(error);
      return error;
    }
  
    return parsedData;
  
    };


export const getRequestData = async() =>{

      const response = await fetch('http://localhost:5000/analytics/get', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json()).then(res =>{
    
    return res;
  }).catch(error => console.error(error));
  // const result = await response.text();
  // return result;
  // console.log(response);
  return response;
  } 



  export const sendRequestData = async(dat) =>{

    const response = await fetch('http://localhost:5000/analytics/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(dat)
}).then(response => response.json()).then(res =>{
  // console.log(res.file);
  return res.file
}).catch(error => console.error(error));
// const result = await response.text();
// return result;
// console.log(response);
return response;
} 