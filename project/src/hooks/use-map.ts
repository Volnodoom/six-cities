import { useEffect, useState } from 'react';
import { SingleOffer } from '../types/types';
import { Map, TileLayer } from 'leaflet';


function useMap (
  mapRef:  React.MutableRefObject<HTMLDivElement | null>,
  city:SingleOffer['city'],
): Map | null {
  const [map, setMap] = useState <Map | null>(null);

  useEffect(() => {
    if(mapRef.current !== null && map === null) {
      const {latitude, longitude, zoom} = city.location;
      const instance = new Map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: zoom,
      });

      const layer = new TileLayer(
        ' https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}.png?access-token=PyTJUlEU1OPJwCJlW1k0NC8JIt2CALpyuj7uc066O7XbdZCjWEL3WYJIk6dnXtps',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      instance.addLayer(layer);

      setMap(instance);
    }
  }, [mapRef, map, city]);

  return map;
}

export default useMap;
