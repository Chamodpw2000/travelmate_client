import React, { useContext, useState } from 'react';
import { ClientContext } from '../../context/ClientContext';
import { useParams } from 'react-router-dom';
import HospitalDetails from '../../components/hospitalDetails/HospitalDetails';



const HospitalPage = () => {




    
    const {allHospitals} = useContext(ClientContext);




    
    const { id } = useParams();
    
    // Dummy data for testing when no ID is provided
    const dummyHospital = {
        id: 999,
        name: "Sample Medical Center",
        description: "This is a sample hospital for UI testing. It offers comprehensive medical services including emergency care, surgery, diagnostics, and specialized treatments. The facility features modern equipment and a dedicated staff committed to providing excellent patient care.",
        address: "Kada 12, Anuradhapura, Sri Lanka",
        contactNumber: "(555) 123-4567",
        email: "info@samplemedical.com",
        website: "https://www.samplemedical.com",
        category: "General Hospital",
        image: "https://picsum.photos/2000/3000",
        nearestCity: "Downtown",
        distanceFromNearestCity: "3.5 miles"
    };
    
    // If no ID is provided in the URL, use dummy data
    if (!id) {
        console.log('No ID provided, using dummy data for UI testing');
        return (
            <HospitalDetails
                id={dummyHospital.id}
                name={dummyHospital.name}
                description={dummyHospital.description}
                address={dummyHospital.address}
                contactNumber={dummyHospital.contactNumber}
                email={dummyHospital.email}
                website={dummyHospital.website}
                category={dummyHospital.category}
                image={dummyHospital.image}
                nearestCity={dummyHospital.nearestCity}
                distanceFromNearestCity={dummyHospital.distanceFromNearestCity}
            />
        );
    }
    
    // If ID is provided, find the hospital in allHospitals
    const hospitalId = parseInt(id);
    const hospital = allHospitals?.find((e) => e.id === hospitalId);
    
    console.log('Hospital data:', hospital);
    
    // Show loading state if allHospitals is undefined or empty
    if (!allHospitals || allHospitals.length === 0) {
        return <div className="text-center p-5">Loading hospital data...</div>;
    }
    
    // Show message if hospital not found
    if (!hospital) {
        return <div className="alert alert-warning m-3">Hospital with ID {id} not found</div>;
    }

    return (
        <HospitalDetails
            id={hospital.id}
            name={hospital.name}
            description={hospital.description}
            address={hospital.address}
            contactNumber={hospital.contactNumber}
            email={hospital.email}
            website={hospital.website}
            category={hospital.category}
            image={hospital.image}
            nearestCity={hospital.nearestCity}
            distanceFromNearestCity={hospital.distanceFromNearestCity}
        />
    );
};

export default HospitalPage;
