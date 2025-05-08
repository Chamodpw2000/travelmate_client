import React, { useState, useEffect } from "react";
import "./PrePlannedTripWhatsExpectedCard.css";

const PrePlannedTripWhatsExpectedCard = ({ images, mainActivities }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change the image every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images]);

  return (
    <div className="whatsExpected-card-container">
      <div className="whatsExpected-card">
        {/* Background Image */}
        <div
          className="whatsExpected-card-image"
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            transition: "background-image 1s ease-in-out", // Smooth transition
          }}
        ></div>

        {/* Activities */}
        <div className="mainActivities">
          {mainActivities.map((mainActivity, index) => (
            <div className="mainActivity" key={index}>
              {mainActivity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrePlannedTripWhatsExpectedCard;
