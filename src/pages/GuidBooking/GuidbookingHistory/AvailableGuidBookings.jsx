import React, { useEffect, useState } from 'react';
// import Booking from './Booking';
import axios from 'axios';
import GuideBookingC from './GuideBookingCard';
import Swal from 'sweetalert2';

const AvailableGuidBookings = () => {


    const [refreshBookings, setRefreshBookings] = useState(false);


    const onMarkCancle = async (bookingId) => {
        const result = await Swal.fire({
            title: "Confirm Completion",
            text: "Are you sure you want to mark this booking as Cancled ?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, mark as Cancled",
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.put("https://travelmate-backend-zuqb.onrender.com/booking/cancleguidebooking", null, {
                    params: { id: bookingId },
                });

                if (response.data.success) {
                    Swal.fire({
                        title: "Success!",
                        text: "Guide booking has been marked as Cancled",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });

                    setRefreshBookings(!refreshBookings);
                }
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to mark guide booking as Cancle",
                    icon: "error",
                });
                console.log(error);
            }
        }
    };
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User is", user);

    useEffect(() => {
        
        if (user) {
            axios.get("https://travelmate-backend-zuqb.onrender.com/booking/getguidebookings", {
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
    }, [refreshBookings]);

    return (
        <div className="container">
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                    <div className="spinner-border text-primary" style={{ width: '5rem', height: '5rem' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : bookings.length > 0 ? (
                <div>
                    {bookings.map((booking) => (
                        <GuideBookingC
                        guide={booking.guide}
                        fromDate={booking.fromDate}
                        toDate={booking.toDate}
                        totaldays={booking.totaldays}
                        totalprice={booking.totalprice}
                        status={booking.status}
                        id={booking._id}
                        onMarkCancle={onMarkCancle}
                    />
                    ))}
                </div>
            ) : (
                <div className="text-center py-5">
                    <div className="card shadow-sm border-0 py-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                        <div className="card-body">
                            <i className="fas fa-calendar-times text-primary mb-4" style={{ fontSize: '4rem' }}></i>
                            <h3 className="text-primary mb-3">No Available Bookings</h3>
                            <p className="text-muted">You don't have any current bookings at the moment.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvailableGuidBookings;
