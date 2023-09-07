import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import Nav from "../components/Nav";
import { Button, Container, Row, Col, Input } from "reactstrap";
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

  const mapStyles = {
    height: "725px",
    width: "100%",
  };

  const defaultCenter = {
    lat: -37.8102,
    lng: 144.9629,
  };

  useEffect(() => {
    // Fetch accidents data from API
    setIsLoading(true);
    fetch("https://your-api-url.com/accidents")
      .then((response) => response.json())
      .then((data) => {
        setAccidents(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching accidents data: ", error);
        setIsLoading(false);
      });
  }, []);

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
          } else {
            console.error(`error fetching directions ${result}`);
            // Here you might want to give a user-friendly alert or some feedback
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
          <h4 className="mb-4">Travel Directions</h4>
          <Autocomplete
            value={origin}
            options={originSuggestions}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.description
            }
            isOptionEqualToValue={(option, value) =>
              option.description === value
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
              isOptionEqualToValue={(option, value) =>
                option.description === value
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
            </Button>{" "}
            <Button color="secondary" onClick={toggleAccidents}>
              {showAccidents ? "Hide Accidents" : "Show Accidents"}
            </Button>
          </div>
          {isLoading && <p>Loading...</p>}
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
              center={defaultCenter}
            >
              {response !== null && (
                <DirectionsRenderer options={{ directions: response }} />
              )}
              {showAccidents &&
                accidents.map((accident, index) => (
                  <Marker
                    key={index}
                    position={{
                      lat: parseFloat(accident.LATITUDE),
                      lng: parseFloat(accident.LONGITUDE),
                    }}
                  />
                ))}
            </GoogleMap>
          </LoadScript>
        </Col>
      </Row>
    </Container>
  );
};

export default Travel;
