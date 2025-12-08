import React from "react";
import PrePlannedTripWhatsExpectedCard from '../prePlannedTripWhatsExpectedCard/PrePlannedTripWhatsExpectedCard';

const PrePlannedTripWhatsExpectedsection = ({whatsExpected, mainActivities, images}) => {
  return (
    <div className="main-container !h-full">
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px", width: "100%" }} className="flex flex-col lg:flex-row gap-y-8">
        <div style={{ flex: 1.2, padding: "0 20px" }}>
          <h2>What's Expected</h2>
          {/* Use pre-wrap to preserve whitespace and line breaks */}
          <div 
            style={{ 
              whiteSpace: "pre-wrap", 
              fontFamily: "inherit", 
              fontSize: "inherit",
              lineHeight: "1.6",
              color: "inherit"
            }}
          >
            {whatsExpected}
          </div>
        </div>
        <div style={{ flex: 0.8, display: "flex", justifyContent: "center" }}>
          <PrePlannedTripWhatsExpectedCard 
            images={images} 
            mainActivities={mainActivities} 
          />
        </div>
      </div>
    </div>
  );
};

export default PrePlannedTripWhatsExpectedsection;
