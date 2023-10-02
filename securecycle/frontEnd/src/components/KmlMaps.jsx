import React from "react";
import { GoogleMap, LoadScriptNext, KmlLayer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: -37.8102,
  lng: 144.9629,
};

function KmlMap({ kmlFile }) {
  console.log(kmlFile);
  return (
    <LoadScriptNext googleMapsApiKey="AIzaSyBP7qbMu0s7fPJmZj_y66VdnG1Q_JZ0eVY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={10}
      >
        <KmlLayer url={kmlFile} options={{ preserveViewport: true }} />
      </GoogleMap>
    </LoadScriptNext>
  );
}

export default KmlMap;
