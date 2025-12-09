import React, { useContext } from 'react'
// Removed react-bootstrap for Tailwind conversion
import { Link } from 'react-router-dom'
import { ClientContext } from '../../context/ClientContext';
import './DisplayHotelReviews.css'


const ReviewCard = ({ userName, title, body, travelType, visitDate }) => {
  return (
    <div className="mb-4 bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center mb-3">
        <div>
          <h6 className="mb-0 font-semibold text-base">{userName}</h6>
          <small className="text-gray-500">from Australia</small>
        </div>
      </div>
      <h5 className="text-lg font-bold mb-1">{title}</h5>
      <small className="text-gray-500">{visitDate} • {travelType}</small>
      <p className="mt-3 text-gray-700">
        {body}
      </p>
      <small className="text-gray-400 block mt-3">
        This review is the subjective opinion of a TravelMate member and not of TravelMate LLC.
      </small>
    </div>
  );
};


const DisplayHotelReviews = ({ id }) => {

  const { allHotelReviews } = useContext(ClientContext);
  const hotelReviews = allHotelReviews.filter((review) => review.hotelId === parseInt(id));

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0; // Avoid division by zero
    const totalOverallRating = reviews.reduce((sum, review) => sum + review.overallRating, 0);
    // const totalRoomRating = reviews.reduce((sum, review) => sum + review.foodRating, 0);
    // const totalServiceRating = reviews.reduce((sum, review) => sum + review.serviceRating, 0);
    // const totalValueRating = reviews.reduce((sum, review) => sum + review.valueRating, 0);
    // const totalLocationRating = reviews.reduce((sum, review) => sum + review.atmosphereRating, 0);
    // const averageRatings = { "overall": parseFloat((totalOverallRating / reviews.length).toFixed(2)), "food": parseFloat((totalFoodRating / reviews.length).toFixed(2)), "service": parseFloat((totalServiceRating / reviews.length).toFixed(2)), "value": parseFloat((totalValueRating / reviews.length).toFixed(2)), "atmosphere": parseFloat((totalAtmosphereRating / reviews.length).toFixed(2)) };
    const averageOverllRating = parseFloat((totalOverallRating / reviews.length).toFixed(2));
    return averageOverllRating;
  };

  const averageOverllRating = calculateAverageRating(hotelReviews);

  const renderRatingDots = (rating) => {
    const maxDots = 5; // Maximum number of dots

    // Ensure `rating` is a valid number and within range
    if (typeof rating !== "number" || rating < 0 || rating > maxDots) {
      console.error("Invalid rating value:", rating);
      rating = 0; // Fallback to 0 for invalid ratings
    }

    const fullDots = Math.max(0, Math.min(Math.floor(rating), maxDots)); // Clamp fullDots
    const halfDot = rating % 1 !== 0 && fullDots < maxDots; // Check for halfDot
    const emptyDots = Math.max(0, maxDots - fullDots - (halfDot ? 1 : 0)); // Ensure non-negative emptyDots

    return (
      <div className="rating-dots d-flex justify-content-end align-items-center">
        {/* Full Dots */}
        {[...Array(fullDots)].map((_, index) => (
          <span key={`full-${index}`} className="rating-dot full"></span>
        ))}
        {/* Half Dot */}
        {halfDot && <span className="rating-dot half"></span>}
        {/* Empty Dots */}
        {[...Array(emptyDots)].map((_, index) => (
          <span key={`empty-${index}`} className="rating-dot empty"></span>
        ))}
      </div>
    );
  };
  const user = JSON.parse(localStorage.getItem("user"));
  return (

      <div className="w-full max-w-6xl mb-4 mx-auto bg-gray-50 rounded-xl shadow-lg p-4 sm:p-6 mt-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-2 sm:p-4">
          <div className="flex  justify-between sm:flex-row sm:items-center gap-2">
            <h5 className="mb-0 font-bold text-lg sm:mr-6">Reviews</h5>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 font-bold text-xl">{averageOverllRating}</span>
              <div className="flex items-center">
                {renderRatingDots(averageOverllRating)}
              </div>
            </div>
          </div>
          <div className="flex">
            {user && <Link to={`/review/hotels/${id}`} className="no-underline">
              <button
                className="!rounded-full  px-4 py-2 font-bold bg-gray-800 text-white text-sm hover:bg-gray-900 transition-colors"
                style={{ fontSize: '0.9rem' }}
              >
                Write a Review
              </button>
            </Link>}
          </div>
        </div>

        <div className="mt-2">
          {hotelReviews.map((review, idx) => (
            <ReviewCard
              key={idx}
              userName={review.userName}
              title={review.reviewTitle}
              body={review.reviewBody}
              travelType={review.travelType}
              visitDate={review.visitDate}
            />
          ))}
        </div>
      </div>

 
  )
}

export default DisplayHotelReviews