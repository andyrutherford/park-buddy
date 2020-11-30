import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';

import MapGL from 'react-map-gl';

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

const mapBoxGlAccessToken: string = process.env.REACT_APP_MAPBOX_API_KEY!;

type Coordinates = {
  latitude: number;
  longitude: number;
};

type ViewPort = Coordinates & {
  zoom: number;
  bearing: number;
  pitch: number;
};

type Props = {
  coordinates: Coordinates;
};

const Map: React.FC<Props> = ({ coordinates }) => {
  console.log(coordinates);
  const [viewport, setViewport] = useState<ViewPort>({
    latitude: Number(coordinates.latitude),
    longitude: Number(coordinates.longitude),
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

  return (
    <MapWrapper>
      <MapGL
        className='mapContainer'
        {...viewport}
        width='100%'
        height='100%'
        mapStyle='mapbox://styles/mapbox/satellite-streets-v10'
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={mapBoxGlAccessToken}
      />
    </MapWrapper>
  );
};

export default Map;
