import TrailCards from "./TrailCards";

function TrailInfo() {
  const cardInfo = [
    {
      name: "Murray to Mountain Rail Trail",
      kml: "/murray.kml",
    },
  ];
  return (
    <div>
      {cardInfo.map((trail, index) => (
        <TrailCards key={index} info={trail} />
      ))}
    </div>
  );
}
export default TrailInfo;
