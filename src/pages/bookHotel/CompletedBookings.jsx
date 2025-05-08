import React, { useEffect, useState } from 'react';
import Booking from './Booking';
import axios from 'axios';

const CompletedBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (user) {
            axios.get("http://localhost:3000/booking/getcombookings", {
                params: { email: user.email }
            })
            .then((res) => {
                setBookings(res.data);
                console.log("Bookings are", res.data);
            })
            .catch((err) => {
                console.log("Error is", err);
            })
            .finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <div className="container">
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                    <div className="spinner-border text-success" style={{ width: '5rem', height: '5rem' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : bookings.length > 0 ? (
                <div>
                    {bookings.map((booking) => (
                        <Booking
                            key={booking._id}
                            roomName={booking.room.name}
                            accName={booking.accommodation.name}
                            roomCount={booking.roomcount}
                            price={booking.totalprice}
                            toDate={booking.to}
                            fromDate={booking.from}
                            daysCount={booking.totaldays}
                            id={booking._id}
                            status={booking.status}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-5">
                    <div className="card shadow-sm border-0 py-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                        <div className="card-body">
                            <i className="fas fa-check-circle text-success mb-4" style={{ fontSize: '4rem' }}></i>
                            <h3 className="text-success mb-3">No Completed Bookings</h3>
                            <p className="text-muted">You haven't completed any bookings yet.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompletedBookings;
