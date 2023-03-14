import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {getParsedData} from '../Functions/Fetch';


function MapStatic(props) {

  const [data, setData] = useState({});

  useEffect(() => {
    async function getData() {
      const parsedData = await getParsedData();
      setData(parsedData);
    }
    getData();  
  }, []);

  //The useEffect is used as it renders everything when the page is first made visible
  useEffect(() => {

    

    //Contains the acces token for Mapbox GL JS
    mapboxgl.accessToken = 'pk.eyJ1IjoiY29saW5jcmFzdGEiLCJhIjoiY2xleDgyZ3E4MWwzczNxcW81b2FsMjc0NyJ9.BFWKjxlo5ZFRBrtgYvTGpA';



    
  //Initializes the mapbox  and sets its it to a globe
    const mapbox = new mapboxgl.Map({
      container: 'map', //container that stores and displays the map
      style: 'mapbox://styles/mapbox/satellite-v9',
      projection: 'globe',
      center: [0, 0],
      zoom: 1,
      showCompass: false
    });

    //Creates the nighttime sky
    mapbox.on('style.load', () => {
      mapbox.setFog({}); 
      });


    // Creates the skeleton to add coordiantes into the map
    mapbox.on('load', function() {
      mapbox.addSource('points', {
        type: 'geojson',
        // the data field will contain the data of the coordinates
        data: {
          type: 'FeatureCollection',
          features: []  //Set empty so that coordiantes can be entered dynamically
        }
      });
  

//marker for the ground station
      const ottawaMarker = new mapboxgl.Marker().setLngLat([-75, 45]).addTo(mapbox);

//the coordinates will be in an array that contains 2d arrays with the coordiantes in longitude and latitude form
let arr = [
  [
    [27,-62]
  ],
  [
    [38, -78]
  ],
  [
    [-13, 39]
  ],
  [
    [33, 1]
  ],
  [
    [-54, -17]
  ]
];

// console.log(arr);



let arr2 = (Object.keys(data).map((key) => {
  let values = [];

  if (data[key]['iteration '] === 0) {
    values.push([Number(data[key]['lon'].split('deg')[0]) , Number(data[key]['lat'].split('deg')[0]) ])
    return values;
    
  } 

  return null;

  

})).filter((elem) => elem !== null);







//Adds coordiantes and the lines between them to the map dynamically
function addLines(pointsData) {
  try {
    

    //listens for the data parameter to change its vlaue and only is used once
    mapbox.once('data', function(dataEvent) {
      //Makes sure that the coordinates are added to the source
      if (dataEvent.sourceId === 'points' && dataEvent.isSourceLoaded) {
        
        //gets the fields for the coordinates source when 
        // it was added in mapbox.addSource()
        const coordData = mapbox.getSource('points')._data;
        
        //Iterates through each coordinate and adds them 
        // to the globe while also creating a line that 
        // connects them but checks if the lsit is greater than 1
        
        
        coordData.features.push(
          ...pointsData.map((coord) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: coord[0]
            }
          }))
        );
      

        //adds the coordiantes plus the lines to the globe
        mapbox.getSource('points').setData(coordData);
        mapbox.setPaintProperty('points', 'circle-color', 'blue'); 
    
        
      }
    });
  } catch (error) {
    console.log(error);
  }
}




// console.log(arr2);
addLines(arr2);




//Creates a layer which can be used to put the coordinates and lines





mapbox.addLayer({
    id: 'points',
    type: 'circle',
    source: 'points',
    paint: {
      'circle-radius': 5,
      'circle-color': 'blue'
    }
  });
});







    return () => {
      mapbox.remove();  //removes the mapbox pbjet evrery time the page reloads
    };
  }, [data]);
  
  return (
    <div id="map" style={
      { width: '100%', height: '600px' }}>
      
    </div>
  );
}

export default MapStatic;