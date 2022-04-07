import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';
import { HighlightCardInfo, SingleOffer } from '../../types/types';
import { Icon, Map as LeafletMap, Marker } from 'leaflet';
import { MapClassName, PinMarker, PinOnMap } from '../../const';
import 'leaflet/dist/leaflet.css';
import { designPinOnMap } from '../../utils/utils-components';
import * as selectorOffers from '../../store/data-offers/offers-selector';
import * as selectorProperty from '../../store/data-property/property-selector';
import { useSelector } from 'react-redux';

type MapProps = {
  mapKind: MapClassName;
  highlightedCardMain?: HighlightCardInfo | null,
}

function MapComponent (props: MapProps): JSX.Element {
  const { mapKind} = props;
  const isCardHighlighted = props.highlightedCardMain?.isCardHighlighted;
  const highlightedCard = props.highlightedCardMain?.card;
  const accommodations = useSelector(selectorOffers.getOffersForCity);
  const property = useSelector(selectorProperty.getProperty);
  const neabyOffers = useSelector(selectorProperty.getNearbyOffers);
  const mapRef = useRef<HTMLDivElement | null> (null);

  const isOnMain = mapKind === MapClassName.Main;
  const isOnProperty = mapKind === MapClassName.Property;
  const mainCityLocation = accommodations[0]?.city.location;

  const mapGeneral = useMap(mapRef, isOnMain ? mainCityLocation : property?.location);


  useEffect( () => {
    if (mapGeneral && isOnMain) {
      mapGeneral.flyTo(
        [
          mainCityLocation.latitude,
          mainCityLocation.longitude,
        ],
        mainCityLocation.zoom,
      );
    }
  }, [isOnMain, mainCityLocation, mapGeneral]);

  useEffect(() => {
    const pins = new Map();

    const selectedCustomIcon = new Icon({
      iconUrl: PinMarker.Selected,
      iconSize: [PinOnMap.SizeWidth, PinOnMap.SizeHeight],
      iconAnchor: [PinOnMap.AnchorWidth, PinOnMap.AnchorHeight],
    });

    const defaultCustomIcon = new Icon({
      iconUrl: PinMarker.Default,
      iconSize: [PinOnMap.SizeWidth, PinOnMap.SizeHeight],
      iconAnchor: [PinOnMap.AnchorWidth, PinOnMap.AnchorHeight],
    });

    const addPinsToMap = (markers: SingleOffer[], mapLeaf: LeafletMap) => {
      markers.forEach((line) => {
        const {latitude, longitude} = line.location;
        const pin = designPinOnMap(latitude, longitude, defaultCustomIcon, mapLeaf);
        pins.set(line.id, pin);
      });
    };

    if(mapGeneral && isOnMain) {
      addPinsToMap(accommodations, mapGeneral);
      if (isCardHighlighted && highlightedCard) {
        const {latitude, longitude} =  highlightedCard.location;
        const pinHighlighted = designPinOnMap(latitude, longitude, selectedCustomIcon, mapGeneral);
        pins.set(`${highlightedCard.id} highlighted`, pinHighlighted);
      }
    }

    if (mapGeneral && isOnProperty && property) {
      addPinsToMap(neabyOffers, mapGeneral);
      const {latitude, longitude} =  property.location;
      const pinHighlighted = designPinOnMap(latitude, longitude, selectedCustomIcon, mapGeneral);
      pins.set(property.id, pinHighlighted);
    }

    return () => {
      if (mapGeneral && isOnMain) {
        pins.forEach((value: Marker, key) => {
          mapGeneral.removeLayer(value);
        });
      }

      if (mapGeneral && isOnProperty) {
        pins.forEach((value: Marker, key) => {
          mapGeneral.removeLayer(value);
        });
      }
      pins.clear();
    };
  }, [accommodations, highlightedCard, isCardHighlighted, isOnMain, isOnProperty, mapGeneral, neabyOffers, property]);


  return (
    <section className={`${isOnMain ? MapClassName.Main : MapClassName.Property } map`} >
      <div ref={mapRef} style={{height: '100%'}}/>
    </section>
  );
}

export default MapComponent;
