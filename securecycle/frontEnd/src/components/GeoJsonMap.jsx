import React from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect, useRef } from "react";
import L from "leaflet";
function UpdateMap({ selected_trail, geojsonData }) {
  const map = useMap();
  const defaultPosition = [-37.8102, 144.9629];
  const defaultZoom = 8;
  useEffect(() => {
    if (selected_trail && geojsonData) {
      const selectedFeature = geojsonData.features.find(
        (feature) => feature.properties.vic_trail === selected_trail
      );
      if (selectedFeature) {
        if (selectedFeature.geometry.type === "LineString") {
          const latLngs = selectedFeature.geometry.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ]);
          const bounds = L.latLngBounds(latLngs);
          map.fitBounds(bounds);
        } else if (selectedFeature.geometry.type === "Point") {
          const [lon, lat] = selectedFeature.geometry.coordinates;
          map.flyTo([lat, lon], 14);
        }
      } else {
        // If no trail is selected or geojsonData isn't provided, reset view to default
        map.flyTo(defaultPosition, defaultZoom);
      }
    }
  }, [selected_trail, geojsonData, map]);

  return null;
}
function MyMap({ selected_trail, onTrailClick: handleTrailClickFromMap }) {
  const [geojsonData, setGeojsonData] = useState(null);
  const [loadingError, setLoadingError] = useState(null);
  const defaultPosition = [-37.8102, 144.9629];
  const defaultZoom = 8;

  const mapRef = useRef();

  function getIconByName(name) {
    console.log(name);
    let iconUrl;

    if (name.includes("Water")) {
      iconUrl = "./marker_water.png";
    } else if (name.includes("park")) {
      iconUrl = "./marker-parking.png";
    } else if (name.includes("picnic") || name.includes("Picnic")) {
      iconUrl = "./marker_picnic.png";
    } else if (name.includes("Bridge")) {
      iconUrl = "./marker_bridge.png";
    } else if (name.includes("Beach")) {
      iconUrl = "./marker_beach.png";
    } else if (name.includes("Park") || name.includes("Garden")) {
      iconUrl = "./marker_garden.png";
    } else if (name.includes("Lookout")) {
      iconUrl = "./marker_lookout.png";
    } else if (name.includes("Railway")) {
      iconUrl = "./marker_station.png";
    } else if (name.includes("Toilet")) {
      iconUrl = "./marker_toilet.png";
    } else {
      iconUrl = "./marker_pin.png"; // Default icon
    }

    return new L.Icon({
      iconUrl: iconUrl,
      iconSize: [60, 60],
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
  }, [selected_trail]);

  function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.name) {
      switch (feature.geometry.type) {
        case "Point":
          layer.setIcon(getIconByName(feature.properties.name));
          break;
        case "LineString":
          layer.on("click", () => {
            handleTrailClickFromMap(feature.properties.vic_trail);
          });
          break;
        default:
          break;
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

  const pointsToShow = geojsonData.features.filter((feature) => {
    if (feature.geometry.type !== "Point") return false;
    return selected_trail
      ? feature.properties.vic_trail === selected_trail
      : feature.properties.vic_trail === "Explore Victoria Trails";
  });

  return (
    <div>
      <MapContainer
        center={defaultPosition}
        zoom={defaultZoom}
        style={{
          width: "100%",
          height: "600px",
          borderRadius: "2rem",
        }}
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
            icon={getIconByName(point.properties.name)}
          >
            <Tooltip>
              <h5>{point.properties.vic_trail}</h5>
              <h6>{point.properties.name}</h6>
            </Tooltip>
          </Marker>
        ))}
        <UpdateMap selected_trail={selected_trail} geojsonData={geojsonData} />
      </MapContainer>
    </div>
  );
}

export default MyMap;
