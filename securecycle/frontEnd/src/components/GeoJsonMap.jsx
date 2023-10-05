import React from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';

function MyMap() {
    const [geojsonData, setGeojsonData] = useState(null);
    const [loadingError, setLoadingError] = useState(null);
    const [showPointsFor, setShowPointsFor] = useState(null); // Add state to keep track of LineString clicked
    useEffect(() => {
      // get data from public folder
      fetch('/vic_trails.geojson')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to load GeoJSON data.');
              }
              return response.json();
          })
          .then(data => {
              setGeojsonData(data);
          })
          .catch(error => {
              setLoadingError(error.message);
          });
    }, []);

    function onEachFeature(feature, layer) {
      if (feature.properties && feature.properties.trail_name) {
          layer.bindPopup(feature.properties.trail_name);

          // On click of LineString, show the associated Points
          layer.on('click', function() {
              setShowPointsFor(feature.properties.trail_name);
          });

          // On close of popup, hide the Points
          layer.on('popupclose', function() {
              setShowPointsFor(null);
          });
      }
    }

    if (loadingError) {
        return <div>Error: {loadingError}</div>;
    }

    if (!geojsonData) {
        return <div>Loading...</div>;
    }
    // const geojsonData = {
    //     type: "FeatureCollection",
    //     features: [
    //       { "type": "Feature", "properties": { "Name": "Car park", "description": "Car park" }, "geometry": { "type": "Point", "coordinates": [ 146.328747980299994, -36.351956985900003 ] } }
    //     ]
    // };
    const lineStringData = {
      type: "FeatureCollection",
      features: geojsonData.features.filter(feature => feature.geometry.type === "LineString")
  };

    // Get Points associated with the clicked LineString
    const pointsToShow = geojsonData.features.filter(
        feature => feature.geometry.type === "Point" && 
        feature.properties.trail_name === showPointsFor
    );

    return (
        <MapContainer center={[-37.8102, 144.9629]} zoom={8} style={{ width: '100%', height: '600px' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON data={lineStringData} onEachFeature={onEachFeature}/>
            {/* Render the Points only if they are to be shown */}
            {pointsToShow.map(point => (
                <Marker position={[point.geometry.coordinates[1], point.geometry.coordinates[0]]}>
                    <Popup>{point.properties.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default MyMap;
