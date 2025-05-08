import React, { useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ClientContext } from '../../../context/ClientContext';
import { FaPhone, FaWhatsapp, FaLanguage, FaMapMarkedAlt, FaStar, FaCalendarAlt, FaMoneyBillWave, FaBirthdayCake, FaPhoneAlt, FaIdCard } from 'react-icons/fa';
import './GuidPage.css';
import moment from 'moment';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';



const ConGuidPage = () => {
    const navigator = useNavigate();
    const location = useLocation();
    const data = location.state;
    console.log(location.state);
    const guid = data.guide;


        const readable = moment(guid?.birthDate).format('MMMM Do YYYY');


    
    

    const StarRating = ({ rating }) => {
        return (
            <div className="d-flex align-items-center">
                {[...Array(5)].map((_, index) => (
                    <FaStar
                        key={index}
                        className={`${index < rating ? 'text-warning' : 'text-muted'}`}
                        size={20}
                    />
                ))}
            </div>
        );
    };

    // const handleBookNow = () => {
    //     navigator(`/guide-booking/${id}`);
    // };


    const bookingHandler = () => {
        const mySwal = withReactContent(Swal);
        mySwal.fire({
            title: "Confirm Your Booking",
            text: "Are you ready to proceed with your reservation?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Book Now!"
        }).then((result) => {
            if (result.isConfirmed) {
                const user = JSON.parse(localStorage.getItem("user"));
                const bookingData = {
                    fromDate: data.from,
                    toDate: data.to,
                    guid:guid,
                    user,
                    totaldays: moment.duration(moment(data.to, "DD-MM-YYYY").diff(moment(data.from, "DD-MM-YYYY"))).asDays() + 1,
                    totalprice: guid?.chargesPerDay * (moment.duration(moment(data.to, "DD-MM-YYYY").diff(moment(data.from, "DD-MM-YYYY"))).asDays() + 1),
                };

           console.log("booking data",bookingData);
           

                try {
                    axios.post("http://localhost:3000/booking/bookguide", bookingData)
                        .then((res) => {
                            mySwal.fire("Success", "Booking confirmed successfully!", "success")  .then(() => {
                                setTimeout(() => {
                                    navigator("/")
                                    window.location.reload();
                                   
                                }, 1000);
                            });
                        })
                        .catch((err) => { 
                            console.log(err);
                            mySwal.fire("Error", "Failed to confirm booking", "error");
                        });
                } catch (error) {
                    console.log("error");
                    mySwal.fire("Error", "Something went wrong", "error");
                }
            } else {
                mySwal.fire("Booking Cancelled", "Your booking request was cancelled.", "info");
            }
        });
    };

    return (
        <div className='container py-5'>
            <div className="card border-0 shadow-lg mb-5">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img
                            src={guid?.imageUrl || "https://picsum.photos/800/600"}
                            className="img-fluid rounded-start h-100 object-fit-cover"
                            alt={guid?.name}
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body p-4 p-md-5">
                            <h1 className="display-4 fw-bold mb-4">{guid?.name}</h1>
                            <p className="lead mb-4">{guid?.description}</p>
                            <div className="d-flex gap-3">
                                <button className="btn btn-primary btn-lg d-flex align-items-center gap-2">
                                    <FaPhone /> Call Now
                                </button>
                                <button className="btn btn-success btn-lg d-flex align-items-center gap-2">
                                    <FaWhatsapp /> WhatsApp
                                </button>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="card-title mb-4">About {guid?.name}</h2>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="d-flex align-items-center mb-3">
                                <FaLanguage className="text-primary me-2" size={24} />
                                <h5 className="mb-0">Languages</h5>
                            </div>
                            <ul className="list-group">
                                {guid?.languages.map((language, index) => (
                                    <li key={index} className="list-group-item">{language}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="col-md-6">
                            <div className="d-flex align-items-center mb-3">
                                <FaMapMarkedAlt className="text-primary me-2" size={24} />
                                <h5 className="mb-0">Expert Areas</h5>
                            </div>
                            <ul className="list-group">
                                {guid?.area.map((area, index) => (
                                    <li key={index} className="list-group-item">{area}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="col-12">
                            <hr />
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center">
                                        <FaMoneyBillWave className="text-primary me-2" size={20} />
                                        <h5 className="mb-0">Charges per day: ${guid?.chargesPerDay}</h5>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center">
                                        <FaBirthdayCake className="text-primary me-2" size={20} />
                                        <h5 className="mb-0">Birth date: {readable} </h5>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center">
                                        <FaPhoneAlt className="text-primary me-2" size={20} />
                                        <h5 className="mb-0">Contact: {guid?.contactNumber}</h5>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center">
                                        <FaIdCard className="text-primary me-2" size={20} />
                                        <h5 className="mb-0">NIC: {guid?.nic}</h5>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="d-flex align-items-center gap-3">
                                        <h5 className="mb-0">Rating:</h5>
                                        <StarRating rating={guid?.rating} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='card shadow-lg bg-light my-4'>
    <div className='card-body text-center p-4'>
        <h3 className='text-primary mb-3'>
            <FaCalendarAlt className="me-2" />
            Booking Details
        </h3>
        <p className='lead mb-4'>
            Book <strong>{guid?.name}</strong> from <strong>{data.from}</strong> to <strong>{data.to}</strong>
        </p>
        <button 
            className="btn btn-warning btn-lg px-5 py-3 fw-bold animate-pulse"
            onClick={bookingHandler}
            style={{
                fontSize: '1.2rem',
                boxShadow: '0 4px 15px rgba(255, 193, 7, 0.3)',
                transition: 'all 0.3s ease'
            }}
        >
            <FaCalendarAlt className="me-2" onClick={{bookingHandler}} /> 
            Book Now
        </button>
    </div>
</div>
           
</div>
    );
}

export default ConGuidPage;
