import { FaCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from 'antd';
import axios from 'axios';

const { RangePicker } = DatePicker;

const AllHotels = () => {
    const [allAccommodations, setAllAccommodations] = useState([]);
    const [availableAccommodations, setAvailableAccommodations] = useState([]);
    const [text, setText] = useState("");
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            axios.get('http://localhost:3000/travelmate/allAccomodations')
                .then((response) => {
                    setAllAccommodations(response.data);
                    console.log("Accommodations:", response.data);
                }).catch((error) => { console.log(error) });
        } catch (error) {
            console.log(error);
        };
    }, []);

    const handleAvailabilityCheck = () => {
        checkAvailability(fromDate, toDate, allAccommodations);
        setText(`Here are the available Hotels from ${fromDate} to ${toDate} !`);
    }

    const checkAvailability = (fromDate, toDate, accommodations) => {
        let availableAcc = [];
        let newAvailableRooms = [];
        const checkStart = moment(fromDate, "DD-MM-YYYY");
        const checkEnd = moment(toDate, "DD-MM-YYYY");

        accommodations.forEach((accommodation) => {
            if (!accommodation?.rooms || !Array.isArray(accommodation.rooms)) {
                return;
            }

            accommodation.rooms.forEach((room) => {
                let bookedrooms = 0;

                room.bookings.forEach((booking) => {
                    const existingStart = moment(booking.fromDate, "DD-MM-YYYY");
                    const existingEnd = moment(booking.toDate, "DD-MM-YYYY");

                    if (checkStart.isBetween(existingStart, existingEnd, null, '[)') ||
                        checkEnd.isBetween(existingStart, existingEnd, null, '(]') ||
                        (checkStart.isBefore(existingStart) && checkEnd.isAfter(existingEnd))) {
                        bookedrooms++;
                    }
                });

                if (bookedrooms < room.total) {
                    newAvailableRooms.push({
                        ...room,
                        available: room.total - bookedrooms,
                        bookedrooms
                    });
                }
            });

            if (newAvailableRooms.length > 0) {
                availableAcc.push({
                    ...accommodation,
                    Availablerooms: newAvailableRooms
                });
            }

            newAvailableRooms = [];
        });

        setAvailableAccommodations(availableAcc);
    };

    const filterByDate = (dates) => {
        setFromDate(dates[0].format("DD-MM-YYYY"));
        setToDate(dates[1].format("DD-MM-YYYY"));
        setText("");
    }

    return (
        <div>
            <div className="container py-5">
                <div className="card shadow-lg mb-5">
                    <div className="card-body p-5">
                        <div className="text-center mb-4">
                            <h1 className="display-4 text-primary fw-bold mb-3">
                                <i className="fas fa-hotel me-3"></i>
                                Discover the Best Stays with Travel Mate
                            </h1>
                            <div className="w-25 mx-auto">
                                <hr className="text-primary" style={{ height: '3px', opacity: '0.5' }} />
                            </div>
                            <h4 className="text-muted mt-4">Your Ultimate Travel Companion!</h4>
                        </div>

                        <div className="row mt-5">
                            <div className="col-md-8">
                                <div className="p-4 bg-white rounded shadow-sm">
                                    <div className="text-muted">
                                        <p>At Travel Mate, we bring you the finest accommodations across the country at unbeatable rates. Whether you're looking for luxury resorts, cozy homestays, or budget-friendly stays, we’ve got you covered. Enjoy seamless booking, exclusive deals, and a hassle-free experience as you explore new destinations.<br /><br />
                                            ✨ Best Prices Guaranteed<br />
                                            🏡 Handpicked Stays for Every Traveler<br />
                                            🌍 Explore, Book, and Travel with Ease<br /><br />
                                            Make every trip memorable with Travel Mate – Your perfect stay is just a click away! 🚀🌴</p>
                                    </div>
                                </div>
                            </div>
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
                                                <div>
                                                    <div className="text-success mt-2 text-center">{text}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {availableAccommodations.length > 0 && (
                    <div className="room-list container py-4">
                        <h3 className="text-primary mb-4 border-bottom pb-3">
                            <i className="fas fa-bed me-2"></i>
                            Available Hotels For Selected Dates
                        </h3>

                        {availableAccommodations.map((acc, index) => (
                            <div key={index} className="card mb-4 shadow-sm">
                                <div className="card-header bg-primary text-white">
                                    <h4 className="mb-0">{acc.name}</h4>
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        {acc.Availablerooms.map((room, idx) => (
                                            <div key={idx} className="col-md-4 mb-3" onClick={() => {
                                                navigate("/conhotelbook", { state: { from: fromDate, to: toDate, id: room.id, hid: acc.id, images: room.images, available: room.available } })
                                            }}>
                                                <div className="card h-100 border-light">
                                                    <img
                                                        src={room?.images?.length >= 1 ? room.images[0] : 'https://picsum.photos/300/200'}
                                                        className="img-fluid w-100"
                                                        alt={room.name}
                                                        style={{ height: '200px', objectFit: 'cover' }}
                                                    />
                                                    <div className="card-body">
                                                        <h5 className="card-title text-primary">{room.name}</h5>
                                                        <p className="mb-2">
                                                            <i className="fas fa-money-bill me-2"></i>
                                                            <strong>Price Per Night:</strong> ${room.price}
                                                        </p>
                                                        <p className="mb-2">
                                                            <i className="fas fa-users me-2"></i>
                                                            <strong>Capacity:</strong> {room.capacity} Person(s)
                                                        </p>
                                                        <p className="mb-0">
                                                            <i className="fas fa-door-open me-2"></i>
                                                            <strong>Available Rooms:</strong>
                                                            <span className="badge bg-success ms-2">{room.available}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllHotels;
