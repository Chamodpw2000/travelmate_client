import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClientContext } from '../../../context/ClientContext';
import { DatePicker } from 'antd';
import { FaPhone, FaWhatsapp, FaLanguage, FaMapMarkedAlt, FaStar, FaCalendarAlt, FaMoneyBillWave, FaBirthdayCake, FaPhoneAlt, FaIdCard } from 'react-icons/fa';
import './GuidPage.css';
import moment from 'moment';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import DisplayGuideReview from '../../../components/displayGuideReview/DisplayGuideReview';

const { RangePicker } = DatePicker;

const GuidPage = () => {
    
    const [data, setData] = useState();
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const { id } = useParams();
    console.log("guide review!!", id)
    const { allGuides } = useContext(ClientContext);
    const guid = allGuides.find((e) => e.id === parseInt(id));
    const [isAvailable, setIsAvailable] = useState();
    const navigator = useNavigate();

    function filterByDate(dates) {
        if (dates) {
            setFromDate(dates[0].format("DD-MM-YYYY"));
            setToDate(dates[1].format("DD-MM-YYYY"));
        }
    }

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

    const readable = moment(guid?.birthDate).format('MMMM Do YYYY'); // comm 

    const checkAvailability = (newFromDate, newToDate, existingBookings) => {
        console.log(newFromDate, newToDate, existingBookings);
        
        const checkStart = moment(newFromDate, "DD-MM-YYYY");
        const checkEnd = moment(newToDate, "DD-MM-YYYY");
    
        for (const booking of existingBookings) {
            const existingStart = moment(booking.fromDate, "DD-MM-YYYY");
            const existingEnd = moment(booking.toDate, "DD-MM-YYYY");
        
            // All possible overlap scenarios:
            const isOverlapping = (
                // New booking starts during existing booking
                (checkStart.isSameOrAfter(existingStart) && checkStart.isSameOrBefore(existingEnd)) ||
                // New booking ends during existing booking
                (checkEnd.isSameOrAfter(existingStart) && checkEnd.isSameOrBefore(existingEnd)) ||
                // New booking contains existing booking
                (checkStart.isSameOrBefore(existingStart) && checkEnd.isSameOrAfter(existingEnd)) ||
                // Existing booking contains new booking
                (existingStart.isSameOrBefore(checkStart) && existingEnd.isSameOrAfter(checkEnd)) ||
                // Same day bookings
                checkStart.isSame(existingStart) || checkEnd.isSame(existingEnd)
            );
        
            if (isOverlapping) {
                return false;
            }
        }
        return true;
    };
    
    const handleAvailabilityCheck = () => {
        const available = checkAvailability(fromDate, toDate, guid.bookings);
        setIsAvailable(available);
    }

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
                    fromDate,
                    toDate,
                    guid,
                    user,
                    totaldays: moment.duration(moment(toDate, "DD-MM-YYYY").diff(moment(fromDate, "DD-MM-YYYY"))).asDays() + 1,
                    totalprice: guid?.chargesPerDay * (moment.duration(moment(toDate, "DD-MM-YYYY").diff(moment(fromDate, "DD-MM-YYYY"))).asDays() + 1),
                };
                setData(bookingData);
                try {
                    console.log(bookingData);
                    
                    axios.post("https://travelmate-backend-zuqb.onrender.com/booking/bookguide", bookingData)
                        .then((res) => {
                            mySwal.fire("Success", "Booking confirmed successfully!", "success").then(() => {
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
            {/* Hero Section */}
            <div className="card border-0 shadow-lg mb-5">
                <div className="row g-0">
                    <div className="col-md-4">
                        <div className="guide-image-container" style={{ 
                            height: '400px', 
                            width: '100%', 
                            overflow: 'hidden',
                            position: 'relative'
                        }}>
                            <img
                                src={guid?.cardImage || "https://picsum.photos/800/600"}
                                className="guide-image"
                                alt={guid?.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center'
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body p-4 p-md-5">
                            <h1 className="display-4 fw-bold mb-4">{guid?.name}</h1>
                            <p className="lead mb-4">{guid?.description}</p>
                            <div className="d-flex gap-3">
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {/* Booking Section */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title mb-4">
                                <FaCalendarAlt className="me-2 text-primary" />
                                Check Availability
                            </h4>
                            <RangePicker
                                format={"DD-MM-YYYY"}
                                onChange={filterByDate}
                                className="w-100 mb-3"
                                disabledDate={(current) => current && current < moment().startOf('day')}
                            />
                            {!fromDate || !toDate ? (
                                <div className="alert alert-warning mt-3">
                                    Please select dates to proceed
                                </div>
                            ) : (
                                <div>
                                    <button onClick={handleAvailabilityCheck} className="btn btn-primary w-100 py-3 mt-3">
                                        Check Availability
                                    </button>
                                    {isAvailable &&
                                        <div>
                                            <div className="text-success mt-2 text-center">These Dates are Available ! </div>
                                            <button onClick={bookingHandler} className="btn btn-primary w-100 py-3 mt-3">
                                                Book Now
                                            </button>
                                        </div>
                                    }
                                    {isAvailable === false && <div className="text-danger mt-2 text-center">These dates are not available</div>}
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
                {/* Guide Details Section */}
                <div className="col-md-8">
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
                                                <h5 className="mb-0">Birth date: {readable}</h5>
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
                                          
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DisplayGuideReview
                    guidId={id}
                />
            </div>
        </div>
    );
};

export default GuidPage;
