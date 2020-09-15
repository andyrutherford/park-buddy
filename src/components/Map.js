import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';

const MapWrapper = styled.div`
  background-color: green;
  height: 100%;
  position: relative;

  .mapContainer {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
`;

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const Map = ({ coordinates }) => {
  const [coords, setCoords] = useState({
    lng: coordinates.lng,
    lat: coordinates.lat,
    zoom: 10,
  });

  let mapContainer = useRef();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/mapbox/satellite-streets-v10',
      center: [coords.lng, coords.lat],
      zoom: coords.zoom,
    });

    map.on('move', () => {
      setCoords({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
    //eslint-disable-next-line
  }, []);
  return (
    <MapWrapper>
      <div ref={(el) => (mapContainer = el)} className='mapContainer' />
    </MapWrapper>
  );
};

export default Map;
