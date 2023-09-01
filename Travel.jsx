import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from '@react-google-maps/api';
import Nav from "../components/Nav";

const LIBRARIES = ['places'];

const Travel = () => {
    const [origin, setOrigin] = useState('Melbourne Central, VIC');
    const [destination, setDestination] = useState('');
    const [response, setResponse] = useState(null);
    const [language, setLanguage] = useState('en');
    const [accidents, setAccidents] = useState([]);
    const [showAccidents, setShowAccidents] = useState(false);
    const [originSuggestions, setOriginSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const mapStyles = {
        height: "725px",
        width: "100%"
    };

    const defaultCenter = {
        lat: -37.8102, 
        lng: 144.9629
    };

    useEffect(() => {
        // Fetch accidents data from API
        setIsLoading(true);
        fetch('https://your-api-url.com/accidents')
        .then(response => response.json())
        .then(data => {
            setAccidents(data);
            setIsLoading(false);
        })
        .catch(error => {
            console.error("Error fetching accidents data: ", error);
            setIsLoading(false);
        });
    }, []);

    const getDirections = useCallback(() => {
        setIsLoading(true);
        if (window.google && window.google.maps) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route({
                destination: destination,
                origin: origin,
                travelMode: 'BICYCLING'
            }, (result, status) => {
                setIsLoading(false);
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setResponse(result);
                } else {
                    console.error(`error fetching directions ${result}`);
                    // Here you might want to give a user-friendly alert or some feedback
                }
            });
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
        if (value === '') {
            setter([]);
            return;
        }
        autocomplete.getPlacePredictions({ input: value }, (predictions) => {
            setter(predictions || []);
        });
    };

    const handleOriginSuggestionClick = (suggestion) => {
        setOrigin(suggestion.description);
        setOriginSuggestions([]);
    };

    const handleDestinationSuggestionClick = (suggestion) => {
        setDestination(suggestion.description);
        setDestinationSuggestions([]);
    };

    return (
        <div>
            <Nav />
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="zh-CN">中文</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
            </select>
            <input 
                type="text" 
                placeholder="Enter starting point" 
                value={origin} 
                onChange={(e) => {
                    setOrigin(e.target.value);
                    fetchSuggestions(e.target.value, setOriginSuggestions);
                }} 
            />
            <ul>
                {originSuggestions.map(suggestion => (
                    <li key={suggestion.place_id} onClick={() => handleOriginSuggestionClick(suggestion)}>
                        {suggestion.description}
                    </li>
                ))}
            </ul>
            <input 
                type="text" 
                placeholder="Enter destination" 
                value={destination} 
                onChange={(e) => {
                    //setDestination(e.target.value);
                    fetchSuggestions(e.target.value, setDestinationSuggestions);
                }} 
            />
            <ul>
                {destinationSuggestions.map(suggestion => (
                    <li key={suggestion.place_id} onClick={() => handleDestinationSuggestionClick(suggestion)}>
                        {suggestion.description}
                    </li>
                ))}
            </ul>
            <button onClick={getDirections} disabled={isLoading}>Get Directions</button>
            <button onClick={toggleAccidents}>
                {showAccidents ? "Hide Accidents" : "Show Accidents"}
            </button>
            {isLoading && <p>Loading...</p>}
            <LoadScript 
                googleMapsApiKey='AIzaSyBP7qbMu0s7fPJmZj_y66VdnG1Q_JZ0eVY'
                libraries={LIBRARIES}
                language={language}
            >
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={13}
                    center={defaultCenter}
                >
                    {response !== null && (
                        <DirectionsRenderer options={{ directions: response }}/>
                    )}
                    {showAccidents && accidents.map((accident, index) => (
                        <Marker 
                            key={index}
                            position={{
                                lat: parseFloat(accident.LATITUDE),
                                lng: parseFloat(accident.LONGITUDE)
                            }}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Travel;
