import React, { useContext, useEffect, useState } from 'react';
import { ClientContext } from '../../context/ClientContext';
import { useParams } from 'react-router-dom';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';
import HotelRoom from './HotelRoom';
import './bookHotel.css';
import { FaCalendarAlt } from 'react-icons/fa';

const BookHotel = () => {
    const [isAvailable, setIsAvailable] = useState();
    const [availableRooms, setAvailableRooms] = useState([]);
    const { allAccommodations } = useContext(ClientContext);
    const { id } = useParams();
    const accommodation = allAccommodations.find((e) => e.id === parseInt(id));
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [text, setText] = useState();

    const bookingHandler = () => { }

    const checkAvailability = (newFromDate, newToDate, accommodation) => {
        const newAvailableRooms = [];
        const checkStart = moment(newFromDate, "DD-MM-YYYY");
        const checkEnd = moment(newToDate, "DD-MM-YYYY");

        for (const room of accommodation.rooms) {
            let bookedrooms = 0;

            for (const booking of room.bookings) {
                const existingStart = moment(booking.fromDate, "DD-MM-YYYY");
                const existingEnd = moment(booking.toDate, "DD-MM-YYYY");

                if (checkStart.isSameOrAfter(existingStart) && checkStart.isSameOrBefore(existingEnd)) {
                    bookedrooms++;
                }
                else if (checkEnd.isSameOrAfter(existingStart) && checkEnd.isSameOrBefore(existingEnd)) {
                    bookedrooms++;
                }
                else if (checkStart.isSameOrBefore(existingStart) && checkEnd.isSameOrAfter(existingEnd)) {
                    bookedrooms++;
                }
                else if (existingStart.isSameOrBefore(checkStart) && existingEnd.isSameOrAfter(checkEnd)) {
                    bookedrooms++;
                }
                else if (checkStart.isSame(existingStart) || checkEnd.isSame(existingEnd)) {
                    bookedrooms++;
                }
            }

            newAvailableRooms.push({
                ...room,
                available: room.total - bookedrooms,
                bookedrooms
            });
        }

        setAvailableRooms(newAvailableRooms);
        return true;
    };

    const handleAvailabilityCheck = () => {
        const available = checkAvailability(fromDate, toDate, accommodation);
        setIsAvailable(available);
        setText(`Here are the available rooms from ${fromDate} to ${toDate} !`);
    }

    function filterByDate(dates) {
        setFromDate(dates[0].format("DD-MM-YYYY"));
        setToDate(dates[1].format("DD-MM-YYYY"));
        setText("");



    }





    return (
        <div className="container-fluid py-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
            <div className="container">
                {accommodation && (
                    <div className="card shadow-lg mb-5">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <h1 className="display-4 text-primary fw-bold mb-3">
                                    <i className="fas fa-hotel me-3"></i>
                                    {accommodation.name}
                                </h1>
                                <div className="w-25 mx-auto">
                                    <hr className="text-primary" style={{ height: '3px', opacity: '0.5' }} />
                                </div>
                                <h4 className="text-muted mt-4">{accommodation.minidescription}</h4>
                            </div>

                            <div className="row mt-5">
                                <div className="col-md-8">
                                    <div className="p-4 bg-white rounded shadow-sm">
                                        <h5 className="text-primary mb-3">
                                            <i className="fas fa-info-circle me-2"></i>
                                            About This Property
                                        </h5>
                                        <p className="text-muted">{accommodation.description}</p>
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
                                                    {isAvailable &&
                                                        <div>
                                                            <div className="text-success mt-2 text-center">{text}</div>

                                                        </div>
                                                    }
                                                    {isAvailable === false &&
                                                        <div className="text-danger mt-2 text-center">
                                                            These dates are not available
                                                        </div>
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {accommodation?.rooms && (
                    <div className="room-list">
                        <h3 className="text-primary mb-4">
                            <i className="fas fa-bed me-2"></i>
                            Available Rooms
                        </h3>
                        {accommodation.rooms.map((room, index) => (
                            <HotelRoom
                                key={room.id}
                                name={room.name}
                                type={room.grade}
                                price={room.price}
                                capacity={room.capacity}
                                available={availableRooms[index]?.available}
                                id={room.id}
                                fromDate={fromDate}
                                toDate={toDate}
                                hid={accommodation.id}
                               images={room.images?.length > 0 ? room.images : undefined}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookHotel;
