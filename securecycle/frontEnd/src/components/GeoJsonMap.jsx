import React from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect, useRef } from "react";
import L from "leaflet";

function MyMap({selected_trail}) {
  const [geojsonData, setGeojsonData] = useState(null);
  const [loadingError, setLoadingError] = useState(null);
  // const [showPointsFor, setShowPointsFor] = useState(null); // Add state to keep track of LineString clicked
  // const [lastClickedTrail, setLastClickedTrail] = useState(null);
  // const [clickedFeature, setClickedFeature] = useState(null);
  const defaultPosition = [-37.8102, 144.9629];
  const defaultZoom = 8;

  // const mapRef = useRef();
  function getIconByName(name) {
    let iconUrl;
    console.log("name", name);

    switch (name) {
      case "Car park":
        iconUrl = "./marker-parking.png";
        break;
      case "Picnic table":
        iconUrl = "./marker_picnic.png";
        break;
      case "Toilet":
        iconUrl = "./marker_toilet.png";
        break;
      case "Toilet (wheelchair accessible)":
        iconUrl = "./marker_toilet.png";
        break;
      case "Toilet disabled flushing":
        iconUrl = "./marker_toilet.png";
        break;
      case "Toilet flushing":
        iconUrl = "./marker_toilet.png";
        break;
      case "Water (source unreliable)":
        iconUrl = "./marker_water.png";
        break;
      case "Water (drinking tap)":
        iconUrl = "./marker_water.png";
        break;
      case "Water point unreliable":
        iconUrl = "./marker_water.png";
        break;
      case "Water point":
        iconUrl = "./marker_water.png";
        break;
      default:
        iconUrl = "./marker_all.png"; // Optional: default icon
        break;
    }

    return new L.Icon({
      iconUrl: iconUrl,
      iconSize: [80, 60], 
    });
  }

  useEffect(() => {
    fetch("/vic_trails.geojson")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load GeoJSON data.");
        }
        return response.json();
      })
      .then((data) => {
        setGeojsonData(data);
      })
      .catch((error) => {
        setLoadingError(error.message);
      });
  }, []);

  function onEachFeature(feature, layer) {
    console.log("Feature type:", feature.geometry.type);
    if (feature.properties) {
      if (feature.properties.name) {
        switch (feature.geometry.type) {
          case "Point":
            console.log("Point name:", feature.properties.name);
            layer.setIcon(getIconByName(feature.properties.name));
            break;
        }
      }

    }
  }

  if (loadingError) {
    return <div>Error: {loadingError}</div>;
  }

  if (!geojsonData) {
    return <div>Loading...</div>;
  }

  const lineStringData = {
    type: "FeatureCollection",
    features: geojsonData.features.filter(
      (feature) => feature.geometry.type === "LineString" 
    ),
  };
  
  const pointsToShow = geojsonData.features.filter(
    (feature) => {
      if (feature.geometry.type !== "Point") return false;
  
      if (selected_trail) {
        return feature.properties.vic_trail === selected_trail;
      }
      return feature.properties.vic_trail === 'Explore Victoria Trails';
    }
  );


  return (
    <div>
      <MapContainer
        center={defaultPosition}
        zoom={defaultZoom}
        style={{ width: "100%", height: "650px", marginRight: "2rem" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON data={lineStringData} onEachFeature={onEachFeature} />

        {pointsToShow.map((point, index) => (
          <Marker
            key={index}
            position={[
              point.geometry.coordinates[1],
              point.geometry.coordinates[0],
            ]}
            icon={getIconByName(point.properties.name)} // Set the icon for the marker
          >
            

            <Tooltip>
                <>
                    <h5>{point.properties.vic_trail}</h5>
                    <h6>{point.properties.name}</h6>
                </>
            </Tooltip>

          </Marker>
        ))}
      </MapContainer>

    </div>
  );
}

export default MyMap;
