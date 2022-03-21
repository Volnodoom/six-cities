
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';
import { AccommodationLocation, SingleOffer } from '../../types/types';
import { Icon, Marker } from 'leaflet';
import { MapClassName, PinMarker, PinOnMap } from '../../const';
import 'leaflet/dist/leaflet.css';
import { designPinOnMap } from '../../utils/utils-components';
import * as selector from '../../store/selector';
import { useSelector } from 'react-redux';

type MapProps = {
  positionClass: MapClassName;
  pointedCard?: AccommodationLocation | null,
  propertyTownInfo?: SingleOffer;
}

function Map (props: MapProps): JSX.Element {
  const accommodations = useSelector(selector.getOffersForCity);

  const {city} = accommodations[0];
  const { pointedCard, positionClass, propertyTownInfo} = props;

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

  const pins: Marker[] = [];

  useEffect(() => {
    if(map) {
      accommodations.forEach((line) => {
        const {latitude, longitude} = line.location;
        const pin = designPinOnMap(latitude, longitude, defaultCustomIcon, map);
        pins.push(pin);

        if (pointedCard && pointedCard.isCardPointed) {
          const pinHighlighted = designPinOnMap(pointedCard.location.latitude, pointedCard.location.longitude, selectedCustomIcon, map);
          pins.push(pinHighlighted);
        }

      });
    }

    if (propertyTownInfo !== undefined && map) {
      const {latitude, longitude} = propertyTownInfo.location;
      const propertyPin = designPinOnMap(latitude, longitude, selectedCustomIcon, map);
      pins.push(propertyPin);
    }

    return () => {
      pins.forEach((line) => line.remove());
    };
  });

  return(
    <section className={`${positionClass} map`} >
      <div ref={mapRef} style={{height: '100%'}}/>
    </section>
  );
}

export default Map;
