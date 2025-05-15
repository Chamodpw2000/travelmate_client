import React, { useContext, useEffect, useState } from "react";
import { ClientContext } from "../../context/ClientContext";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Spinner, Alert, Breadcrumb } from "react-bootstrap";
import PrePlannedTripsInLandingPage from "../../components/prePlannedTripsInLandingPage/PrePlannedTripsInLandingPage.jsx";
import PrePlannedTripsMainSection from "../../components/prePlannedTripsMainSection/PrePlannedTripsMainSection.jsx";
import PrePlannedTripsInfo from "../../components/prePlannedTripsInfo/PrePlannedTripsInfo.jsx";
import PrePlannedTripWhatsExpectedsection from "../../components/prePlannedTripWhatsExpectedSection/PrePlannedTripWhatsExpectedsection.jsx";
import "./PrePlannedTripsMainPage.css";

const PrePlannedTripsMainPage = () => {
  const { allPrePlannedTrips } = useContext(ClientContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Find the trip data
  const prePlannedTrip = allPrePlannedTrips.find((e) => e.id === parseInt(id));

  // Simulate loading and handle errors
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
      if (!prePlannedTrip && allPrePlannedTrips.length > 0) {
        setError("Trip not found. Please check the URL and try again.");
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [prePlannedTrip, allPrePlannedTrips]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Oops! Something went wrong</Alert.Heading>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <button 
              className="btn btn-outline-danger" 
              onClick={() => navigate('/pre-planned-trips')}
            >
              Back to All Trips
            </button>
          </div>
        </Alert>
      </Container>
    );
  }

  if (!prePlannedTrip) {
    return null;
  }

  return (
    <div className="trip-page-container">
      {/* Breadcrumb Navigation */}
      <Container className="py-3 breadcrumb-container">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/pre-planned-trips">Pre-Planned Trips</Breadcrumb.Item>
          <Breadcrumb.Item active>{prePlannedTrip.name}</Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      {/* Main Content */}
      <div className="trip-content-wrapper">
        {/* Main Section */}
        <section className="trip-main-section">
          <PrePlannedTripsMainSection
            name={prePlannedTrip.name}
            mainDestinations={prePlannedTrip.mainDestinations}
            guides={prePlannedTrip.guides}
            price={prePlannedTrip.price}
            duration={prePlannedTrip.duration}
            noOfTravelers={prePlannedTrip.noOfTravelers}
            startTime={prePlannedTrip.startTime}
            startLocation={prePlannedTrip.startLocation}
            endTime={prePlannedTrip.endTime}
            endLocation={prePlannedTrip.endLocation}
            description={prePlannedTrip.description}
            availableDates={prePlannedTrip.availableDates}
            contactNumber={prePlannedTrip.contactNumber}
            rating={prePlannedTrip.rating}
            whatsExpected={prePlannedTrip.whatsExpected}
            whatsIncluded={prePlannedTrip.whatsIncluded}
            additionalInfo={prePlannedTrip.additionalInfo}
            cancellationPolicy={prePlannedTrip.cancellationPolicy}
            help={prePlannedTrip.help}
            tripId={prePlannedTrip.id}
            mainImage={prePlannedTrip.mainImage}
          />
        </section>

        {/* What's Expected Section */}
        <section className="trip-whats-expected-section">
          <PrePlannedTripWhatsExpectedsection
            images={prePlannedTrip.activityImages}
            whatsExpected={prePlannedTrip.whatsExpected}
            mainActivities={prePlannedTrip.mainActivities}
          />
        </section>

        {/* Trip Info Section */}
        <section className="trip-info-section">
          <PrePlannedTripsInfo
            name={prePlannedTrip.name}
            mainDestinations={prePlannedTrip.mainDestinations}
            guides={prePlannedTrip.guides}
            price={prePlannedTrip.price}
            duration={prePlannedTrip.duration}
            noOfTravelers={prePlannedTrip.noOfTravelers}
            startTime={prePlannedTrip.startTime}
            startLocation={prePlannedTrip.startLocation}
            endTime={prePlannedTrip.endTime}
            endLocation={prePlannedTrip.endLocation}
            description={prePlannedTrip.description}
            availableDates={prePlannedTrip.availableDates}
            contactNumber={prePlannedTrip.contactNumber}
            rating={prePlannedTrip.rating}
            whatsExpected={prePlannedTrip.whatsExpected}
            whatsIncluded={prePlannedTrip.whatsIncluded}
            additionalInfo={prePlannedTrip.additionalInfo}
            cancellationPolicy={prePlannedTrip.cancellationPolicy}
            help={prePlannedTrip.help}
          />
        </section>

        {/* Similar Experiences Section */}
        <section className="trip-similar-section">
          <Container>
            <h2 className="mb-4 text-center">Similar Experiences</h2>
            <PrePlannedTripsInLandingPage header="" />
          </Container>
        </section>
      </div>
    </div>
  );
};

export default PrePlannedTripsMainPage;
