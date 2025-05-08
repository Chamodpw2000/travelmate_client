import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ClientContext } from '../../context/ClientContext';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './bookHotel.css';

const ConBookHotel = () => {
    const location = useLocation();
    const data = location.state;
    console.log("data",data);
    
    const { allAccommodations } = useContext(ClientContext);
    const accommodation = allAccommodations?.find((e) => e.id === parseInt(data.hid));
    const room = accommodation?.rooms[data.id];
    const [selectedValue, setSelectedValue] = useState(1);
    const navigator = useNavigate();
    const carouselRef = useRef(null); 
    console.log("room",room);
    console.log("accommodation",accommodation);
    
    console.log(room);
    // Ref for the carousel

    useEffect(() => {
        if (window.bootstrap && carouselRef.current) {
            new window.bootstrap.Carousel(carouselRef.current, {
                interval: 3000,
                ride: "carousel"
            });
        }
    }, []);

    const fromDate = moment(data.from, "DD-MM-YYYY");
    const toDate = moment(data.to, "DD-MM-YYYY");
    const totaldays = moment.duration(toDate.diff(fromDate)).asDays() + 1;
    const price = selectedValue * room?.price * totaldays;

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleBook = () => {
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
                    user,
                    room,
                    accommodation,
                    from : data.from,
                    to: data.to,
                    totaldays,
                    totalprice: price,
                    roomcount: parseInt(selectedValue)
                };

                axios.post("http://localhost:3000/booking/bookhotel", bookingData)
                    .then(() => {
                        mySwal.fire("Booking Confirmed!", "Your stay has been successfully booked.", "success")
                            .then(() => {
                                setTimeout(() => {
                                    navigator("/");
                                    window.location.reload();
                                }, 2000);
                            });
                    })
                    .catch((err) => console.log(err));
            } else {
                mySwal.fire("Booking Cancelled", "Your booking request was cancelled.", "info");
            }
        });
    };

    return (
        <div className="container-fluid py-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
            <div className="container">
                <div className="card shadow-lg">
                    <div className="card-body p-0">
                        <div className="row g-0">
                            <div className="col-lg-6" style={{ height: '500px' }}>
                                {room?.images && room.images.length > 0 ? (
                                    <div
                                        id="roomImageCarousel"
                                        className="carousel slide h-100"
                                        data-bs-ride="carousel"
                                        data-bs-interval="3000"
                                        ref={carouselRef}
                                    >
                                        <div className="carousel-inner h-100">
                                            {room.images.map((image, index) => (
                                                <div key={index} className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`}>
                                                    <img
                                                        src={image}
                                                        className="d-block w-100 h-100 rounded-start"
                                                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                                                        alt={`Room view ${index + 1}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        {room.images.length > 1 && (
                                            <>
                                                <div className="carousel-indicators">
                                                    {room.images.map((_, index) => (
                                                        <button
                                                            key={index}
                                                            type="button"
                                                            data-bs-target="#roomImageCarousel"
                                                            data-bs-slide-to={index}
                                                            className={index === 0 ? 'active' : ''}
                                                            aria-current={index === 0 ? 'true' : 'false'}
                                                            aria-label={`Slide ${index + 1}`}
                                                        ></button>
                                                    ))}
                                                </div>
                                                <button className="carousel-control-prev" type="button" data-bs-target="#roomImageCarousel" data-bs-slide="prev">
                                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button className="carousel-control-next" type="button" data-bs-target="#roomImageCarousel" data-bs-slide="next">
                                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <img
                                        src="https://picsum.photos/800/600"
                                        className="img-fluid rounded-start w-100 h-100"
                                        style={{ objectFit: 'cover' }}
                                        alt="room"
                                    />
                                )}
                            </div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <h2 className="display-6 text-primary fw-bold mb-4">
                                        {room?.name}
                                        <small className="d-block text-muted fs-5 mt-2">{accommodation?.name}</small>
                                    </h2>

                                    <p className="lead mb-4">{room?.description}</p>

                                    <div className="mb-4">
                                        <label className="form-label fw-bold">Select Number of Rooms</label>
                                        <select className="form-select form-select-lg mb-3" onChange={handleChange}>
                                            {Array.from({ length: data.available }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1} Room(s)</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="card bg-primary text-white mb-4">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span>Price per night</span>
                                                <strong>${room?.price}</strong>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span>Number of nights</span>
                                                <strong>{totaldays}</strong>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span>Number of rooms</span>
                                                <strong>{selectedValue}</strong>
                                            </div>
                                            <hr className="my-2" />
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="h5 mb-0">Total Price</span>
                                                <strong className="h5 mb-0">${price}</strong>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="btn btn-primary btn-lg w-100" onClick={handleBook}>
                                        <i className="fas fa-credit-card me-2"></i> Proceed to Payment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConBookHotel;
