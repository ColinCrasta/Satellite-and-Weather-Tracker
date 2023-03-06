import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function Map() {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY29saW5jcmFzdGEiLCJhIjoiY2xleDgyZ3E4MWwzczNxcW81b2FsMjc0NyJ9.BFWKjxlo5ZFRBrtgYvTGpA';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-v9',
      projection: 'globe',
      center: [0, 0],
      zoom: 1
    });
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '500px' }}></div>
  );
}

export default Map;
