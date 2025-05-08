import React, { useContext } from "react";
import { ClientContext } from "../../context/ClientContext";
import { useParams } from "react-router-dom";
import PrePlannedTripsInLandingPage from "../../components/prePlannedTripsInLandingPage/PrePlannedTripsInLandingPage.jsx";
import PrePlannedTripsMainSection from "../../components/prePlannedTripsMainSection/PrePlannedTripsMainSection.jsx";
import PrePlannedTripsInfo from "../../components/prePlannedTripsInfo/PrePlannedTripsInfo.jsx";
import PrePlannedTripBookingForm from "../../components/prePlannedTripBookingForm/PrePlannedTripBookingForm.jsx";
import PrePlannedTripWhatsExpectedsection from "../../components/prePlannedTripWhatsExpectedSection/PrePlannedTripWhatsExpectedsection.jsx";

const PrePlannedTripsMainPage = () => {
  const { allPrePlannedTrips } = useContext(ClientContext);
  const { id } = useParams();
  const prePlannedTrip = allPrePlannedTrips.find((e) => e.id === parseInt(id));
  console.log(prePlannedTrip);
  return (
    <>
      {prePlannedTrip ? (
        <>
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
          />
          <PrePlannedTripWhatsExpectedsection
            whatsExpected={prePlannedTrip.whatsExpected}
            mainActivities={prePlannedTrip.mainActivities}

          />

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
          <PrePlannedTripsInLandingPage
          header="Similar Experiences"
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default PrePlannedTripsMainPage;
