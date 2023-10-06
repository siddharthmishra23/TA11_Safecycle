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

function MyMap() {
  const [geojsonData, setGeojsonData] = useState(null);
  const [loadingError, setLoadingError] = useState(null);
  const [showPointsFor, setShowPointsFor] = useState(null); // Add state to keep track of LineString clicked
  const [lastClickedTrail, setLastClickedTrail] = useState(null);
  const [clickedFeature, setClickedFeature] = useState(null);
  const defaultPosition = [-37.8102, 144.9629];
  const defaultZoom = 8;
  // const [mapCenter, setMapCenter] = useState(defaultPosition);
  // const [zoom, setZoom] = useState(defaultZoom);

  const mapRef = useRef();
  function getIconByName(name) {
    let iconUrl;

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
      case "Water (source unreliable)":
        iconUrl = "./marker_water.png";
        break;
      default:
        iconUrl = "./marker_all.png"; // Optional: default icon
        break;
    }

    return new L.Icon({
      iconUrl: iconUrl,
      // iconSize: [25, 41], // Size of the icon, you may need to adjust this based on your icon's dimensions
      // iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
      // popupAnchor: [0, -41] // Point from which the popup should open relative to the iconAnchor
    });
  }

  useEffect(() => {
    // get data from public folder
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
    if (feature.properties) {
      if (feature.properties.name) {
        switch (feature.geometry.type) {
          case "Point":
            layer.setIcon(getIconByName(feature.properties.name));
            break;
        }
      }
      if (feature.properties && feature.properties.trail_name) {
        layer.bindPopup(
          `<div style="font-size: 18px;">${feature.properties.trail_name}</div>`,
          {
            offset: L.point(-30, -25),
          }
        );
      }

      // On click of LineString, show the associated Points and update lastClickedTrail
      layer.on("click", function () {
        setClickedFeature(layer);
        setLastClickedTrail(feature.properties.trail_name);
        if (showPointsFor !== feature.properties.trail_name) {
          setShowPointsFor(feature.properties.trail_name);
        }
      });

      // On close of popup, hide the Points only if the trail_name isn't the same as clicked
      layer.on("popupclose", function () {
        if (showPointsFor !== feature.properties.trail_name) {
          setShowPointsFor(null);
        }
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
    features: geojsonData.features.filter(
      (feature) => feature.geometry.type === "LineString"
    ),
  };

  // Get Points associated with the clicked LineString
  const pointsToShow = geojsonData.features.filter(
    (feature) =>
      feature.geometry.type === "Point" &&
      feature.properties.trail_name === showPointsFor
  );
  function ZoomToFeature({ feature }) {
    const map = useMap();

    useEffect(() => {
      if (feature) {
        map.fitBounds(feature.getBounds());
      }
    }, [feature, map]);

    return null;
  }

  return (
    <div>
      <MapContainer
        center={defaultPosition}
        zoom={defaultZoom}
        // whenCreated={mapInstance => mapRef.current = mapInstance}
        style={{ width: "100%", height: "600px", marginRight: "2rem" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON data={lineStringData} onEachFeature={onEachFeature} />
        {/* Render the Points only if they are to be shown */}
        {pointsToShow.map((point) => (
          <Marker
            position={[
              point.geometry.coordinates[1],
              point.geometry.coordinates[0],
            ]}
            eventHandlers={{
              popupclose: (e) => {
                if (point.properties.trail_name === lastClickedTrail) {
                  e.popup.openOn(e.target._map);
                }
              },
            }}
          >
            {/* <Popup offset={[50, -50]}>
                  <div style={{ fontSize: '50px' }}>
                    {point.properties.trail_name}<br />{point.properties.name}
                  </div>
                  </Popup> */}
            <Tooltip>{point.properties.name}</Tooltip>
            {clickedFeature && <ZoomToFeature feature={clickedFeature} />}
          </Marker>
        ))}
      </MapContainer>

      <button
        onClick={() => {
          // setMapCenter(defaultPosition);
          // setZoom(defaultZoom);
          // setClickedFeature(null);
          setView(defaultPosition, defaultZoom);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default MyMap;
