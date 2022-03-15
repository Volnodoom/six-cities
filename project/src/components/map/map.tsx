
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';
import { SingleOffer } from '../../types/types';
import { Icon, Marker } from 'leaflet';
import { PinMarker, PinOnMap } from '../../const';
import 'leaflet/dist/leaflet.css';

function Map (props: {accommodations: SingleOffer[]}): JSX.Element {
  const {city} = props.accommodations[0];
  const {accommodations} = props;

  const mapRef = useRef<HTMLDivElement | null> (null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = new Icon({
    iconUrl: PinMarker.Default,
    iconSize: [PinOnMap.SizeWidth, PinOnMap.SizeHeight],
    iconAnchor: [PinOnMap.AnchorWidth, PinOnMap.AnchorHeight],
  });

  // const selectedCustomIcon = new Icon({
  //   iconUrl: PinMarker.Selected,
  // iconSize: [PinOnMap.SizeWidth, PinOnMap.SizeHeight],
  // iconAnchor: [PinOnMap.AnchorWidth, PinOnMap.AnchorHeight],
  // });

  useEffect(() => {
    if(map) {
      accommodations.forEach((line) => {
        const {latitude, longitude} = line.location;

        const marker = new Marker({
          lat: latitude,
          lng: longitude,
        });

        marker
          .setIcon(defaultCustomIcon)
          .addTo(map);
      });
    }
  }, [map, accommodations]);

  return(
    <section className="cities__map map" ref={mapRef} style={{height: '100%'}}>
    </section>
  );
}

export default Map;
