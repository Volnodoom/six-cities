import { useEffect, useState } from 'react';
import {  Location } from '../types/types';
import { Map, TileLayer } from 'leaflet';


function useMap (
  mapRef:  React.MutableRefObject<HTMLDivElement | null>,
  cityLocation: Location | undefined,
): Map | null {
  const [map, setMap] = useState <Map | null>(null);

  useEffect(() => {
    if(mapRef.current !== null && map === null && cityLocation) {
      const {latitude, longitude, zoom} = cityLocation;
      const instance = new Map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      instance.addLayer(layer);

      setMap(instance);
    }
  }, [mapRef, map, cityLocation]);

  if (cityLocation === undefined) {
    return null;
  }

  return map;
}

export default useMap;
