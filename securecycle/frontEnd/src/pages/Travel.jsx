import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  LoadScriptNext,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import Nav from "../components/Nav";
import { Checkbox } from "@mui/material";
import {
  Button,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import styles from "./Travel.module.css";
import MapBarhartHour from "../components/MapBarchartHour";
const LIBRARIES = ["places"];

const Travel = () => {
  const [origin, setOrigin] = useState(null);
  const [isOriginSetFromCurrentLocation, setIsOriginSetFromCurrentLocation] =
    useState(false);
  const [hasSetInitialOrigin, setHasSetInitialOrigin] = useState(false);
  const [destination, setDestination] = useState("");
  const [response, setResponse] = useState(null);
  const [language, setLanguage] = useState("en");
  const [accidents, setAccidents] = useState([]);
  const [totalAccidents, setTotalAccidents] = useState([]);
  const [showAccidents, setShowAccidents] = useState(false);
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [dayFilters, setDayFilters] = useState([]);
  const [severityFilters, setSeverityFilters] = useState([]);
  const [dropdownDayOpen, setDropdownDayOpen] = useState(false);
  const [dropdownSeverityOpen, setDropdownSeverityOpen] = useState(false);
  const [autocompleteKey, setAutocompleteKey] = useState(0);
  const [directionsKey, setDirectionsKey] = useState(0);
  const directionsRendererRef = useRef(null);
  const [selectedAccident, setSelectedAccident] = useState(null);
  const [clicked, setClicked] = useState(false);
  const toggleDayDropdown = () => setDropdownDayOpen((prevState) => !prevState);
  const toggleSeverityDropdown = () =>
    setDropdownSeverityOpen((prevState) => !prevState);

  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Spanish" },
    { code: "fr", label: "French" },
    { code: "zh-CN", label: "Chinese" },
  ];

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: -37.8102,
    lng: 144.9629,
  };

  const getMarkerColor = (severity) => {
    switch (severity) {
      case "Fatal accident":
        return "#b50303d6";
      case "Serious injury accident":
        return "#b55e03e6";
      case "Other injury accident":
        return "#b5b003d6";
      case "Non injury accident":
        return "green";
      default:
        return null;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getCurrentLocation();
    fetch("/LongLat")
      .then((res) => res.json())
      .then((data) => {
        setTotalAccidents(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching accidents data: ", error);
        setIsLoading(false);
      });
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCurrentLocation({ lat: lat, lng: lng });
          //setOriginAsCurrentLocation(lat, lng);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              alert("An unknown error occurred.");
              break;
            default:
              alert("An unknown error occurred.");
          }
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const getDirections = useCallback(() => {
    setIsLoading(true);

    // Create a new promise to ensure sequential state updates
    new Promise((resolve) => {
      setResponse(null);
      resolve();
    })
      .then(() => {
        const directionsService = new window.google.maps.DirectionsService();
        return new Promise((resolve, reject) => {
          directionsService.route(
            {
              destination: destination,
              origin: origin,
              travelMode: "BICYCLING",
            },
            (result, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                resolve(result);
              } else {
                reject(`error fetching directions ${result}`);
              }
            }
          );
        });
      })
      .then((result) => {
        setDirectionsKey((prevKey) => prevKey + 1);
        setResponse(null);
        setResponse(result);
        const timeEstimation = result.routes[0].legs[0].duration.text;
        setEstimatedTime(timeEstimation);

        const path = result.routes[0].overview_path;
        const filteredAccidentsBasedOnPath = totalAccidents.filter(
          (accident) => {
            const accidentPoint = new window.google.maps.LatLng(
              accident.LATITUDE,
              accident.LONGITUDE
            );

            return path.some((pathPoint) => {
              // Check if the accident is within 0.2km of the path
              return (
                window.google.maps.geometry.spherical.computeDistanceBetween(
                  accidentPoint,
                  pathPoint
                ) < 20
              );
            });
          }
        );
        setShowAccidents(true);
        setAccidents(filteredAccidentsBasedOnPath);
        setIsLoading(false);
        setClicked(true);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, [origin, destination, totalAccidents]);

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
    autocomplete.getPlacePredictions(
      { input: value, componentRestrictions: { country: "AU" } },
      (predictions) => {
        setter(predictions || []);
      }
    );
  };

  const toggleFilter = (filterType, value) => {
    if (filterType === "day") {
      setDayFilters((prevState) => {
        if (prevState.includes(value)) {
          return prevState.filter((item) => item !== value);
        } else {
          return [...prevState, value];
        }
      });
    } else if (filterType === "severity") {
      setSeverityFilters((prevState) => {
        if (prevState.includes(value)) {
          return prevState.filter((item) => item !== value);
        } else {
          return [...prevState, value];
        }
      });
    }
  };

  const filteredAccidents = accidents.filter((accident) => {
    return (
      (!dayFilters.length || dayFilters.includes(accident.DAY_OF_WEEK)) &&
      (!severityFilters.length || severityFilters.includes(accident.SEVERITY))
    );
  });

  return (
    <div>
      <Nav />
      <Container fluid>
        <Row>
          <Col md="4" className={styles["autocomplete-container"]}>
            <div className={styles["autocomplete-field"]}>
              <Autocomplete
                key={`origin-${autocompleteKey}`}
                options={originSuggestions}
                getOptionLabel={(option) => option.description}
                onInputChange={(_, newInputValue) => {
                  fetchSuggestions(newInputValue, setOriginSuggestions);
                }}
                onChange={(_, newValue) => {
                  setOrigin(newValue ? newValue.description : "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Starting location"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </div>
            <div className={styles["autocomplete-field"]}>
              <Autocomplete
                key={`destination-${autocompleteKey}`}
                options={destinationSuggestions}
                getOptionLabel={(option) => option.description}
                onInputChange={(_, newInputValue) => {
                  fetchSuggestions(newInputValue, setDestinationSuggestions);
                }}
                onChange={(_, newValue) => {
                  setDestination(newValue ? newValue.description : "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Your Destination"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </div>
            <div className={styles["autocomplete-field"]}>
              <Autocomplete
                options={languages}
                getOptionLabel={(option) => option.label}
                value={languages.find((lang) => lang.code === language)}
                onChange={(_, newValue) => {
                  setLanguage(newValue ? newValue.code : "en");
                  setOrigin(null);
                  setDestination("");
                  setEstimatedTime(null);
                  setAutocompleteKey((prevKey) => prevKey + 1);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Language"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </div>
            {origin && destination && clicked && (
              <div className={styles["time-info"]}>
                <h5 className="mt-4">
                  Estimated Travel Time: {estimatedTime || "0"}
                </h5>
              </div>
            )}

            <div className={styles["advance-filter"]}>
              {
                <Button
                  disabled={!origin && !destination}
                  color="primary"
                  onClick={getDirections}
                >
                  Get Directions
                </Button>
              }
              {origin && destination && clicked && (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={showAccidents}
                        onChange={toggleAccidents}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Show Accidents"
                  />
                </FormGroup>
              )}
            </div>

            {origin && destination && clicked && (
              <div className={styles["advance-filter"]}>
                <Dropdown
                  isOpen={dropdownDayOpen}
                  toggle={toggleDayDropdown}
                  className="mt-4"
                >
                  <DropdownToggle caret>Day of the Week</DropdownToggle>
                  <DropdownMenu>
                    {weekdays.map((day) => (
                      <DropdownItem
                        key={day}
                        onClick={() => toggleFilter("day", day)}
                      >
                        <Checkbox checked={dayFilters.includes(day)} />
                        {day}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>

                <Dropdown
                  isOpen={dropdownSeverityOpen}
                  toggle={toggleSeverityDropdown}
                  className="mt-4"
                >
                  <DropdownToggle caret>Severity</DropdownToggle>
                  <DropdownMenu>
                    {[
                      "Fatal accident",
                      "Serious injury accident",
                      "Other injury accident",
                      "Non injury accident",
                    ].map((severity) => (
                      <DropdownItem
                        key={severity}
                        onClick={() => toggleFilter("severity", severity)}
                      >
                        <Checkbox
                          checked={severityFilters.includes(severity)}
                        />
                        {severity}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            )}
            {origin && destination && showAccidents && (
              <div
                style={{
                  margin: "0 auto",
                }}
              >
                <MapBarhartHour />
              </div>
            )}
            {origin && destination && showAccidents && clicked && (
              <div
                className={`${styles["reported-msg"]} ${
                  accidents.length ? styles["show"] : ""
                }`}
                data-aos="zoom-in-up"
              >
                {`There are ${accidents.length} reported cases on the path.`}
              </div>
            )}
          </Col>
          <Col md="8">
            <LoadScriptNext
              key={language}
              googleMapsApiKey="AIzaSyBP7qbMu0s7fPJmZj_y66VdnG1Q_JZ0eVY"
              libraries={LIBRARIES}
              language={language}
              //preventGoogleFontsLoading={true}
            >
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={10}
                center={currentLocation || defaultCenter}
                onLoad={(map) => {
                  // Create a div to hold the button.
                  const controlDiv = document.createElement("div");

                  // Set CSS for the control border.
                  controlDiv.style.backgroundColor = "#fff";
                  controlDiv.style.border = "2px solid #fff";
                  controlDiv.style.borderRadius = "5px";
                  controlDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
                  controlDiv.style.cursor = "pointer";
                  controlDiv.style.marginBottom = "22px";
                  controlDiv.style.marginRight = "10px";
                  controlDiv.style.textAlign = "center";
                  controlDiv.title = "Click to get current location";
                  controlDiv.style.margin = "10px";

                  // Set CSS for the control interior.
                  const controlText = document.createElement("div");
                  controlText.style.color = "rgb(25,25,25)";
                  controlText.style.fontFamily = "Roboto,Arial,sans-serif";
                  controlText.style.fontSize = "16px";
                  controlText.style.lineHeight = "38px";
                  controlText.style.paddingLeft = "5px";
                  controlText.style.paddingRight = "5px";
                  controlText.innerHTML = "Current Location";
                  controlDiv.appendChild(controlText);

                  // Attach event listener
                  controlDiv.addEventListener("click", function () {
                    getCurrentLocation();
                  });

                  // Add the button to the map
                  map.controls[
                    window.google.maps.ControlPosition.TOP_RIGHT
                  ].push(controlDiv);

                  setIsLoading(false);
                }}
                onClick={(e) => {
                  console.log(e.latLng.lat(), e.latLng.lng());
                }}
              >
                {currentLocation && (
                  <Marker
                    position={currentLocation}
                    title="Your Current Location"
                  />
                )}
                {response && (
                  <DirectionsRenderer
                    directions={response}
                    key={directionsKey}
                  />
                )}
                {showAccidents &&
                  filteredAccidents.map((accident, index) => (
                    <Marker
                      key={index}
                      position={{
                        lat: parseFloat(accident.LATITUDE),
                        lng: parseFloat(accident.LONGITUDE),
                      }}
                      title={`Accident: ${accident.SEVERITY}`}
                      icon={{
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: getMarkerColor(accident.SEVERITY),
                        fillOpacity: 1,
                        strokeColor: "white",
                        strokeWeight: 0.5,
                      }}
                    />
                  ))}
              </GoogleMap>
            </LoadScriptNext>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Travel;
