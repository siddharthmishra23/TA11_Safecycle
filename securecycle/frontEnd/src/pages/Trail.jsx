import React, { useState, useEffect, onSelect } from "react";
import Loader from "../components/Loader";
import Nav from "../components/Nav";
import WeatherDisplay from "../components/WeatherDisplay";
import MyMap from "../components/GeojsonMap";
import RotateSlides from "../components/RotateSlides";
import styles from "./Trail.module.css";
import TrailInfo from "../components/TrailInfo";
import PageNotFound from "./PageNotFound";

const trailDetails = {
  "Surf Coast Walk": {
    title: "Surf Coast Walk",
    description:
      "The great thing about the Walk is that it can also be split into 12 distinctive trails. Each of the trails have an identified start and end point and are usually located at a car park. Below the main map, is a link to each of the 12 trails. If you click on one of the trails, you will find a shorter interactive map plus more details of the sights and features of that particular trail",
    length: "44km",
    img: "/surf_coast_walk.jpeg",
    located: "121km west of Melbourne",
    nearby: ["Yellow bluff", "Point danger", "Bells Beach"],
  },
  "Great Victorian Rail Trail": {
    title: "Great Victorian Rail Trail",
    description:
      "Victoria’s longest rail trail traverses undulating farmland from the Goulburn River to the High Country at Mansfield, A good standard trail with almost 5 km of bridges from which to enjoy views; the few low level crossings are easy",
    length: "134km",
    img: "/great_vic.jpeg",
    located: "90km north of Melbourne",
    nearby: [
      "National Trust listed Trawool Valley",
      "Alexandra Timber Tramway and Museum",
      "Yea Railway Park",
    ],
  },
  "Mornington Peninsula Walk": {
    title: "Mornington Peninsula Walk",
    description:
      "You can catch glimpses of the tree-lined railway corridor on the way from Baxter. The Mt Eliza Regional Park next to Moorooduc station is a great place to explore",
    length: "4km",
    img: "/mornington.jpeg",
    located: "60km south of CBD",
    nearby: [
      "Mornington Tourist Railway’s restored K163 steam engine",
      "Devilbend Natural Features Reserve",
      "Baxter Trail to Frankston",
    ],
  },
  "Lilydale To Warburton": {
    title: "Lilydale To Warburton",
    description:
      "The Lilydale to Warburton Rail Trail is one of Australia’s most popular, with a backdrop of mountains including Yarra Ranges National Park this trail passes through a picturesque landscape following the Yarra River Valley",
    length: "48km",
    img: "/lily.jpg",
    located: "50km east of Melbourne CBD",
    nearby: [
      "Plenty of good places to stay and great things to consume in the region’s cafes, pubs, wineries and restaurants",
      "Many towns at regular intervals along the route",
    ],
  },
  "Gippsland Plains Rail Trail": {
    title: "Gippsland Plains Rail Trail",
    description:
      "The long bridge over the Latrobe River floodplain and new “coat hanger” through-arch bridge over the Thomson River are major features. Enjoy flat dairy-farm country with views of the Great Dividing Range to the north.",
    length: "62 km",
    img: "/gippsland-plains.jpeg",
    located: "190km east of Melbourne",
    nearby: [
      "Latrobe Visitor Information Centre, Traralgon",
      "East Gippsland Rail Trail",
      "Heyfield Wetlands",
    ],
  },
  "You Yangs Mountain Bike Park": {
    title: "You Yangs Mountain Bike Park",
    description:
      "The You Yangs has two designated mountain biking areas that contain over 50 kilometres of exciting and environmentally sustainable trails that cater for riders of all ages and ability. All trails are clearly sign posted with directional information and gradings. A map can be picked up from the Park Office or downloaded from the 'when you're there' section below, detailing information on the trail.",
    length: "50km",
    img: "/you_yong.jpeg",
    located: "57km west of Melbourne",
    nearby: ["Flinders peak lookout", "Bird watching"],
  },
  "Mt Buller Bike Park": {
    title: "Mt Buller Bike Park",
    description:
      "Mt Buller Bike Park is home to several firsts in Aussie mountain biking, including Australia’s first flow trail, Copperhead, and the Southern Hemisphere’s first and only IMBA Epic Trail, the infamous 40+km wilderness MTB trail, the Australian Alpine Epic.",
    length: "XXkm",
    img: "/buller.jpeg",
    located: "60km south of CBD",
    nearby: ["Rifle Butts MTB Park", "Moyhu Timber Reserve", "Punkah"],
  },
  "Wilsons Promontory Southern": {
    title: "Wilsons Promontory Southern",
    description:
      "A picturesque rail trail close to Melbourne and some of Victoria’s major attractions. Make the full journey or choose shorter segments for a more leisurely adventure. Stop and explore the towns linked by the trail with their unique stories and experiences as well as terrific coffee, shopping and dining",
    length: "109km",
    img: "/wilsons-prom.jpeg",
    located: "130km southeast of Melbourne",
    nearby: [
      "Phillip Island Nature Parks",
      "Agnes Falls near Toora",
      "Hoddle Mountain Trail bush walk from Fish Creek",
    ],
  },
  "Great Ocean Walk": {
    title: "Great Ocean Walk",
    description:
      "The Great Ocean Walk is a one-way, long-distance walk extending just over 110km. This once-in-a-lifetime hike will take you eight days.",
    length: "58km",
    img: "/great_ocean.jpeg",
    located: "90km south of CBD",
    nearby: [
      "The high coastal cliffs of Moonlight Head",
      "Cape Otway Lighthouse and its friendly guides ready to share stories of the Shipwreck Coast.",
      "Koalas resting in the eucalypt trees",
    ],
  },
  "Goldfields Track": {
    title: "Goldfields Track",
    description:
      "A short rail trail in beautiful mountain country featuring mature forests and views of the mighty Thomson River",
    length: "7km",
    img: "/goldfield.jpeg",
    located: "165km east of Melbourne",
    nearby: [
      "Tyers Junction Rail Trail",
      "The Erica Mountain Bike Park features three intermediate-level tracks in its East Trails network near the rail trail",
    ],
  },
  "Forrest Mountain Bike Trails": {
    title: "Forrest Mountain Bike Trails",
    description:
      "There’s a substantial mountain bike trail network around Forrest, most of it accessible from the rail trail. Most of the trail runs through state forest",
    length: "4.4km",
    img: "/forrest.jpeg",
    located: "136km south west of Melbourne",
    nearby: [
      "Idyllic Lake Elizabeth, near Forrest",
      "Barwon Park Mansion, Winchelsea",
      "Forrest History Walk",
    ],
  },
  "Great Walhalla Alpine Trail": {
    title: "Great Walhalla Alpine Trail",
    description:
      "The Great Walhalla Alpine Trail follows the first 40 kilometre section of the Australian Alps Walking Track, one of the world's great Alpine walks stretching 650 kilometres from Walhalla to Canberra.",
    length: "42km",
    img: "/walha.jpeg",
    located: "184km from Melbourne",
    nearby: ["Walhalla", "Mount Baw Baw"],
  },
  "Great South West Walk": {
    title: "Great South West Walk",
    description:
      "The Great South West Walk (GSWW) is located in South West Victoria (Australia) and has been developed as a bushwalking trail suitable for most ages and abilities comprising short 2-hour loop walks, full-day walks, or for the intrepid, the whole 250km loop that begins and ends in Portland, Victoria,  Australia.",
    length: "250km",
    img: "/sw.jpeg",
    located: "383km south of CBD",
    nearby: ["Portland", "Bay beach walk"],
  },
  "Murray To Mountains Rail Trail": {
    title: "Murray To Mountains Rail Trail",
    description:
      "One of Australia’s best known and most popular regional rail trails. The entire rail trail is sealed, and mostly flat apart from the Everton to Beechworth/Yackandandah section",
    length: "116km",
    img: "/murray.jpeg",
    located: "250km northeast of Melbourne",
    nearby: [
      "Nearby Milawa gourmet region, with an off-road trail between Milawa and Oxley",
      "Renowned Rutherglen winery region",
      "Beechworth and Bright have extensive mountain biking facilities and opportunities",
    ],
  },
  "East Gippsland Rail Trail": {
    title: "East Gippsland Rail Trail",
    description:
      "Spectacular views as you travel beside the long timber trestle bridge near Orbost. Occasional views of the Gippsland Lakes. Quaint towns and villages with cafes, accommodation and craft shops",
    length: "96km",
    img: "/east-gippsland.jpeg",
    located: "280km east of Melbourne",
    nearby: [
      "Silt jetties at Eagle Point",
      "Lakes Entrance",
      "Colquhoun MTB Park",
    ],
  },
};
function Trail() {
  const [location, setLocation] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTrail, setSelectedTrail] = useState("");
  const [geoError, setGeoError] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const handleTrailSelectFromSpinner = (trailName) => {
    setSelectedTrail(trailName);
  };

  const handleTrailClickFromMap = (trailName) => {
    setSelectedTrail(trailName);
  };

  useEffect(() => {
    const geoTimeout = setTimeout(() => {
      setIsTimeout(true);
    }, 10000); // 10 seconds

    navigator.geolocation.getCurrentPosition(
      function (position) {
        clearTimeout(geoTimeout); // Clear the timeout if we successfully get the position
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      function (error) {
        clearTimeout(geoTimeout); // Also clear the timeout if there's an error.
        console.error("Error getting location:", error);
        setIsLoading(false);
        setGeoError(true);
      }
    );

    return () => clearTimeout(geoTimeout); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (location) {
      const fetchData = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&appid=c8eaace3c20c515a4ec0c4990bb684a7`;

        try {
          const response = await fetch(url);
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false); // Set loading to false after API call is done.
        }
      };

      fetchData();
    }
  }, [location]);
  if (geoError || isTimeout) {
    return <PageNotFound />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Nav />

      <div>
        <div className={styles["bike-trails-header"]}>
          <h1>Cycle the Scenic Way</h1>
          <p>
            Life is Better on a Bike: Discover Scenic Trails Awaiting Your
            Exploration
          </p>
        </div>
      </div>
      <div
        className={styles["weather-circle"]}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p className={styles["weather-p"]}>Weather Info</p>
      </div>

      {isHovered && (
        <section
          className={`${styles["trail-weather"]} ${
            isHovered ? styles.active : ""
          }`}
        >
          <WeatherDisplay data={data} />
        </section>
      )}
      <section className={styles["trail-container"]}>
        <h2 style={{ color: "#0b0d7b" }}>Discover the Path Less Traveled</h2>
        <div className={styles["trail-slides"]}>
          <RotateSlides
            selected_trail={selectedTrail}
            onSelect={handleTrailSelectFromSpinner}
          />
        </div>
      </section>

      <div className={styles["trail-container1"]}>
        <div id="mapSection">
          <MyMap
            selected_trail={selectedTrail}
            onTrailClick={handleTrailClickFromMap}
          />
        </div>
      </div>
      {/* {selectedTrail && trailDetails[selectedTrail] && (
        <div className={styles["trailinfo-container"]} id="infoSection">
          <TrailInfo details={trailDetails[selectedTrail]} />
        </div>
      )} */}
    </div>
  );
}

export default Trail;
