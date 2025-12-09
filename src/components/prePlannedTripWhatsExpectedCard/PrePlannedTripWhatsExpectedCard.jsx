import React, { useState, useEffect } from "react";
import "./PrePlannedTripWhatsExpectedCard.css";

const PrePlannedTripWhatsExpectedCard = ({ images, mainActivities }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Default images in case none are provided
  const defaultImages = [
    "https://picsum.photos/900/1500?random=1",
    "https://picsum.photos/900/1500?random=2",
    "https://picsum.photos/900/1500?random=3",
  ];
  
  // Use provided images or fall back to defaults
  const displayImages = images && images.length > 0 ? images : defaultImages;
  
  // Change the image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % displayImages.length);
    }, 5000); // 5000ms = 5 seconds
    
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [displayImages]);
  
  // Reset current index when images change
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [images]);

  return (
    <div>
      <div className="whatsExpected-card">
        {/* Background Image */}
        <div
          className="whatsExpected-card-image"
          style={{
            backgroundImage: `url(${displayImages[currentImageIndex]})`,
            transition: "background-image 1s ease-in-out", // Smooth transition
          }}
        ></div>
        
        {/* Activities */}
        {/* <div className="mainActivities">
          {mainActivities && mainActivities.length > 0 ? (
            mainActivities.map((mainActivity, index) => (
              <div className="mainActivity" key={index}>
                {mainActivity}
              </div>
            ))
          ) : (
            <div className="mainActivity">No activities listed</div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default PrePlannedTripWhatsExpectedCard;
