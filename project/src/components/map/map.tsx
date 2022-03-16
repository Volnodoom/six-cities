
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';
import { AccommodationLocation, SingleOffer } from '../../types/types';
import { Icon } from 'leaflet';
import { PinMarker, PinOnMap } from '../../const';
import 'leaflet/dist/leaflet.css';
import { designPinOnMap } from '../../utils/utils-components';

type MapProps = {
  accommodations: SingleOffer[],
  pointedCard: AccommodationLocation | null,
}

function Map (props: MapProps): JSX.Element {
  const {city} = props.accommodations[0];
  const {accommodations, pointedCard} = props;

  const mapRef = useRef<HTMLDivElement | null> (null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = new Icon({
    iconUrl: PinMarker.Default,
    iconSize: [PinOnMap.SizeWidth, PinOnMap.SizeHeight],
    iconAnchor: [PinOnMap.AnchorWidth, PinOnMap.AnchorHeight],
  });

  const selectedCustomIcon = new Icon({
    iconUrl: PinMarker.Selected,
    iconSize: [PinOnMap.SizeWidth, PinOnMap.SizeHeight],
    iconAnchor: [PinOnMap.AnchorWidth, PinOnMap.AnchorHeight],
  });

  useEffect(() => {
    if(map) {
      accommodations.forEach((line) => {
        const {latitude, longitude} = line.location;
        designPinOnMap(latitude, longitude, defaultCustomIcon, map);
      });
    }
  }, [map, accommodations]);

  useEffect(() => {
    if (pointedCard && map) {
      const {latitude, longitude} = pointedCard.location;

      if (pointedCard.isCardPointed === true) {
        designPinOnMap(latitude, longitude, selectedCustomIcon, map);
      } else {
        designPinOnMap(latitude, longitude, defaultCustomIcon, map);
      }
    }
  }, [pointedCard]);

  return(
    <section className="cities__map map" ref={mapRef} style={{height: '100%'}}>
    </section>
  );
}

export default Map;
