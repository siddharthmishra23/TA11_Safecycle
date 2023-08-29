//npm install @react-google-maps/api

import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import Nav from "../components/Nav";

const Travel = () => {
    const [origin, setOrigin] = useState('Melbourne Central, VIC');
    const [destination, setDestination] = useState('');
    const [response, setResponse] = useState(null);
    const [language, setLanguage] = useState('en');  // 默认语言为英文

    const mapStyles = {
        height: "500px",
        width: "100%"
    };

    const defaultCenter = {
        lat: -37.8102, 
        lng: 144.9629
    };

    const directionsCallback = (res) => {
        if (res !== null && (response === null || response.status !== res.status)) {
            setResponse(res);
        }
    };

    const getDirections = () => {
        if (window.google && window.google.maps) {
            const directionsService = new window.google.maps.DirectionsService();

            directionsService.route(
                {
                    destination: destination,
                    origin: origin,
                    travelMode: 'BICYCLING'
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setResponse(result);
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        }
    };

    return (
        <div>
            <Nav />
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="zh-CN">中文</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                // 您可以继续添加其他语言选项
            </select>
            <input 
                type="text" 
                placeholder="Enter starting point" 
                value={origin} 
                onChange={(e) => setOrigin(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Enter destination" 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)} 
            />
            <button onClick={getDirections}>Get Directions</button>
            <LoadScript googleMapsApiKey='AIzaSyBP7qbMu0s7fPJmZj_y66VdnG1Q_JZ0eVY' language={language}>
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={13}
                    center={defaultCenter}
                >
                    {
                        response !== null && (
                            <DirectionsRenderer
                                // required
                                options={{ 
                                    directions: response
                                }}
                            />
                        )
                    }
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Travel;
