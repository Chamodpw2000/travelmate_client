import React from "react";
import PrePlannedTripWhatsExpectedCard from '../prePlannedTripWhatsExpectedCard/PrePlannedTripWhatsExpectedCard';

const PrePlannedTripWhatsExpectedsection = ({whatsExpected, mainActivities}) => {
  // Example data
  const images = [
   "https://picsum.photos/900/1500?random=1",
    "https://picsum.photos/900/1500?random=2",
    "https://picsum.photos/900/1500?random=3",
  ];

  // const mainActivities = ["Hiking in Ella", "Camping in Horton Plains", "Sightseeing"];

  return (
    <div className="main-container">
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px", width: "100%" }}>
        <div style={{ flex: 1.2, padding: "0 20px" }}>
          <h2>What's Expected</h2>
          <p>
            {whatsExpected}
          </p>
        </div>
        <div style={{ flex: 0.8, display: "flex", justifyContent: "center" }}>
          <PrePlannedTripWhatsExpectedCard images={images} mainActivities={mainActivities} />
        </div>
      </div>
    </div>
  );
};

export default PrePlannedTripWhatsExpectedsection;
