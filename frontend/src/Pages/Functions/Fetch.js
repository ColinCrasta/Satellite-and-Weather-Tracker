import React, { useState, useEffect } from "react";





export const getPosFile = async() =>{

    const response = await fetch('http://localhost:5000/data', {
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


export const getParsedData = async () => {
    let parsedData;
    try {
      await getPosFile().then(res =>{
        parsedData = JSON.parse(res);
      });
      // console.log(data); 
      
    } catch (error) {
      console.error(error);
      return error;
    }
  
    return parsedData;
  
    };


