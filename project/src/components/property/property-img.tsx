function PropertyDetails (props: {urlImg:string}): JSX.Element {
  const {urlImg} = props;
  return (
    <div className="property__image-wrapper">
      <img className="property__image" src={urlImg} alt="studio"/>
    </div>
  );
}

export default PropertyDetails;
