import React from 'react';
import { useNavigate } from 'react-router-dom';
import './bookHotel.css';

const HotelRoom = ({ name, type, price, capacity, available, id, fromDate, toDate, hid , images }) => {
    const navigate = useNavigate();

    const handleBook = (from, to, id, hid) => {
        navigate("/conhotelbook", { state: { from, to, id, hid , images, available } });
        console.log(toDate);
    };


    

    return (
        <div className="container my-4">
            <div className="card shadow-lg" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <div className="position-relative h-100">
                            <img
                                src={images?.length>0 ? images[0] : "https://picsum.photos/300/200"}
                                className="img-fluid rounded-start h-100 w-100 object-fit-cover"
                                alt="room"
                                style={{ minHeight: '300px' }}
                            />
                            {available > 0 && (
                                <div className="position-absolute top-0 start-0 m-3">
                                    <span className="badge bg-success px-3 py-2">
                                        Available Rooms: {available}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start">
                                <h2 className="card-title text-primary mb-3">{name}</h2>
                                <span className="badge bg-primary px-3 py-2">{type}</span>
                            </div>
                            
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <i className="fas fa-dollar-sign text-primary me-2"></i>
                                        <span className="fw-bold">Price per Night:</span>

                                        <span className="ms-2">${price}</span>
                                        

                                    </div>
                                    <div className="mb-3">
                                        <i className="fas fa-users text-primary me-2"></i>
                                        <span className="fw-bold">Capacity:</span>
                                        <span className="ms-2">{capacity} Guests</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <i className="fas fa-calendar-check text-primary me-2"></i>
                                        <span className="fw-bold">Check-in:</span>
                                        <span className="ms-2">{fromDate || 'Not selected'}</span>
                                    </div>
                                    <div className="mb-3">
                                        <i className="fas fa-calendar-times text-primary me-2"></i>
                                        <span className="fw-bold">Check-out:</span>
                                        <span className="ms-2">{toDate || 'Not selected'}</span>
                                    </div>
                                </div>
                            </div>

                            {available === 0 && (
                                <div className="alert alert-danger mb-4" role="alert">
                                    <i className="fas fa-exclamation-circle me-2"></i>
                                    Currently No Rooms Available
                                </div>
                            )}

                            <div className="d-flex gap-3">
                                <button
                                    className="btn btn-primary px-4 py-2"
                                    onClick={() => handleBook(fromDate, toDate, id, hid)}
                                    disabled={available === 0 || !fromDate || !toDate}
                                >
                                    <i className="fas fa-bookmark me-2"></i>
                                    Book Now
                                </button>
                                <button className="btn btn-outline-primary px-4 py-2">
                                    <i className="fas fa-info-circle me-2"></i>
                                    More Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelRoom;
