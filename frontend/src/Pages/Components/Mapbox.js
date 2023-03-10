import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function Map() {


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
      mapbox.addSource('coordinates', {
        type: 'geojson',
        // the data field will contain the data of the coordinates
        data: {
          type: 'FeatureCollection',
          features: []  //Set empty so that coordiantes can be entered dynamically
        }
      });
  


//the coordinates will be in an array that contains 2d arrays with the coordiantes in longitude and latitude form
let arr = [
  [
    [-73.985664, 40.748817], 
    [2.352222, 48.856614] 
  ],
  [
    [-80.005941, 0], 
    [139.691706, 0] 
  ],
  [
    [10, 35], 
    [-20, 20],
    [20, -10],
  ]
];



//Adds coordiantes and the lines between them to the map dynamically
function addLines(pointsData) {
  try {
    

    //listens for the data parameter to change its vlaue and only is used once
    mapbox.once('data', function(dataEvent) {
      //Makes sure that the coordinates are added to the source
      if (dataEvent.sourceId === 'coordinates' && dataEvent.isSourceLoaded) {
        
        //gets the fields for the coordinates source when 
        // it was added in mapbox.addSource()
        const coordData = mapbox.getSource('coordinates')._data;
        
        //Iterates through each coordinate and adds them 
        // to the globe while also creating a line that 
        // connects them
        coordData.features.push(
          ...pointsData.map((coord) => ({
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: coord
            }
          }))
        );

        //adds the coordiantes plus the lines to the globe
        mapbox.getSource('coordinates').setData(coordData);
        mapbox.setPaintProperty('connectors', 'color', 'blue'); 
    
        
      }
    });
  } catch (error) {
    console.log(error);
  }
}

addLines(arr);



//Creates a layer which can be used to put the coordinates and lines
mapbox.addLayer({
  id: 'connectors',
  type: 'line',
  source: 'coordinates',
  paint: {
    'line-color': 'blue',
    'line-width': 0.3
  }, 
  filter: ['==', '$type', 'LineString'],
  layout: {
    'line-join': 'round',
    'line-cap': 'round'
  }
});


mapbox.addLayer({
  id: 'coordinates',
  type: 'circle',
  source: 'coordinates',
  paint: {
    'circle-radius': 5,
    'circle-color': 'yellow'
  }
});


});




    return () => {
      mapbox.remove();  //removes the mapbox pbjet evrery time the page reloads
    };
  }, []);
  
  return (
    <div id="map" style={{ width: '90%', height: '600px' }}></div>
  );
}

export default Map;