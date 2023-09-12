import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import Nav from "../components/Nav";
import { Button, Container, Row, Col } from "reactstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const LIBRARIES = ["places"];

const Travel = () => {
  const [origin, setOrigin] = useState("Melbourne Central, VIC");
  const [destination, setDestination] = useState("");
  const [response, setResponse] = useState(null);
  const [language, setLanguage] = useState("en");
  const [accidents, setAccidents] = useState([]);
  const [showAccidents, setShowAccidents] = useState(false);
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Spanish" },
    { code: "fr", label: "French" },
    { code: "zh-CN", label: "Chinese" },
  ];

  const mapStyles = {
    height: "725px",
    width: "100%",
  };

  const defaultCenter = {
    lat: -37.8102,
    lng: 144.9629,
  };

  const getMarkerColor = (severity) => {
    switch (severity) {
      case "Fatal accident":
        return "red";
      case "Serious injury accident":
        return "orange";
      case "Other injury accident":
        return "yellow";
      case "Non injury accident":
        return "green";
      default:
        return null;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getCurrentLocation();
    fetch("http://localhost:8003/LongLat")
      .then((response) => response.json())
      .then((data) => {
        setAccidents(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching accidents data: ", error);
        setIsLoading(false);
      });
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCurrentLocation({
          lat: lat,
          lng: lng,
        });
        getHumanReadableAddress(lat, lng); // Convert lat, lng to address
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const getHumanReadableAddress = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat: lat, lng: lng };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          setOrigin(results[0].formatted_address);
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  };
  const getDirections = useCallback(() => {
    setIsLoading(true);
    if (window.google && window.google.maps) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          destination: destination,
          origin: origin,
          travelMode: "BICYCLING",
        },
        (result, status) => {
          setIsLoading(false);
          if (status === window.google.maps.DirectionsStatus.OK) {
            setResponse(result);
            const timeEstimation = result.routes[0].legs[0].duration.text;
            setEstimatedTime(timeEstimation);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    } else {
      setIsLoading(false);
    }
  }, [origin, destination]);

  const toggleAccidents = () => {
    setShowAccidents(!showAccidents);
  };

  const fetchSuggestions = (value, setter) => {
    if (!window.google) return;
    const autocomplete = new window.google.maps.places.AutocompleteService();
    if (value === "") {
      setter([]);
      return;
    }
    autocomplete.getPlacePredictions({ input: value }, (predictions) => {
      setter(predictions || []);
    });
  };

  return (
    <Container fluid>
      <Nav />
      <Row className="mt-4">
        <Col md="5" className="pr-5" style={{ padding: "2rem" }}>
          <h2 className="mb-4" style={{ color: "#0b0d7b" }}>
            Travel Directions
          </h2>
          <div className="mb-3">
            <label>Select Language:</label>
            <Autocomplete
              value={languages.find((lang) => lang.code === language)}
              options={languages}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                if (newValue) {
                  setLanguage(newValue.code);
                } else {
                  setLanguage("en");
                }
              }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" fullWidth />
              )}
            />
          </div>
          <Autocomplete
            value={origin}
            options={originSuggestions}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.description
            }
            onInputChange={(event, newValue) => {
              fetchSuggestions(newValue, setOriginSuggestions);
            }}
            onChange={(event, newValue) => {
              if (newValue) {
                setOrigin(newValue.description);
              } else {
                setOrigin("");
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter starting point"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <div className="my-3">
            <Autocomplete
              value={destination}
              options={destinationSuggestions}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.description
              }
              onInputChange={(event, newValue) => {
                fetchSuggestions(newValue, setDestinationSuggestions);
              }}
              onChange={(event, newValue) => {
                if (newValue) {
                  setDestination(newValue.description);
                } else {
                  setDestination("");
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter destination"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
          <div className="my-3">
            <Button
              color="primary"
              onClick={getDirections}
              disabled={isLoading}
            >
              Get Directions
            </Button>
            <Button color="secondary" onClick={toggleAccidents}>
              {showAccidents ? "Hide Accidents" : "Show Accidents"}
            </Button>
          </div>
          {isLoading && <p>Loading...</p>}
          {estimatedTime && <p>Estimated Time: {estimatedTime}</p>}
        </Col>
        <Col md="7">
          <LoadScript
            googleMapsApiKey="AIzaSyBP7qbMu0s7fPJmZj_y66VdnG1Q_JZ0eVY"
            libraries={LIBRARIES}
            language={language}
          >
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={13}
              center={currentLocation || defaultCenter}
            >
              {response !== null && (
                <DirectionsRenderer options={{ directions: response }} />
              )}
              {showAccidents &&
                accidents.map((accident, index) => {
                  const markerColor = getMarkerColor(accident.SEVERITY);
                  if (!markerColor) return null;

                  return (
                    <Marker
                      key={index}
                      position={{
                        lat: parseFloat(accident.LATITUDE),
                        lng: parseFloat(accident.LONGITUDE),
                      }}
                      icon={{
                        url: `http://maps.google.com/mapfiles/ms/icons/${markerColor}-dot.png`,
                      }}
                      title={accident.SEVERITY}
                    />
                  );
                })}
            </GoogleMap>
          </LoadScript>
        </Col>
      </Row>
    </Container>
  );
};

export default Travel;
