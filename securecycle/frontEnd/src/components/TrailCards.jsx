import KmlMap from "./KmlMaps";

function TrailCards({ info }) {
  return (
    <div>
      <img></img>
      <p>{info.name}</p>
      <KmlMap kmlFile={info.kml} />
    </div>
  );
}

export default TrailCards;
