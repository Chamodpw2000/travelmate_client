import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import moment from 'moment';

const Booking = ({ accName, roomName, roomCount, price, toDate, fromDate, daysCount, id, status, date }) => {
    const cancleBooking = async (id) => {
        const mySwal = withReactContent(Swal);
        mySwal.fire({
            title: "Are you sure?",
            text: "Do you want to Delete the Booking ?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I Want !"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete("http://localhost:3000/booking/deletebooking", {
                    params: { id: id }
                })
                .then(window.location.reload())
                .catch((err) => {
                    console.log(err);
                });
            }
        });
    };

    return (
        <div className="card shadow-lg mb-4">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="mb-0">Booking ID: {id}</h5>
                    <small>
                        {moment(date).format('MMMM Do YYYY, h:mm:ss a')}
                    </small>
                </div>
                <div className="d-flex align-items-center">
                    {status === "Booked" && (
                        <button
                            className="btn btn-danger btn-sm me-3"
                            onClick={() => cancleBooking(id)}
                        >
                            <i className="fas fa-times-circle me-2"></i>
                            Cancel Booking
                        </button>
                    )}
                    <span className={`badge ${status === 'Booked' ? 'bg-success' : 'bg-secondary'}`}>
                        {status}
                    </span>
                </div>
            </div>

            <div className="card-body">
                <h4 className="text-primary mb-3">{roomName} at {accName}</h4>
                <div className="row">
                    <div className="col-md-6">
                        <div className="booking-details">
                            <div className="detail-item mb-3">
                                <i className="fas fa-bed text-primary me-2"></i>
                                <span className="fw-bold">Rooms:</span> {roomCount}
                            </div>
                            <div className="detail-item mb-3">
                                <i className="fas fa-dollar-sign text-primary me-2"></i>
                                <span className="fw-bold">Price:</span> ${price}
                            </div>
                            <div className="detail-item mb-3">
                                <i className="fas fa-calendar-alt text-primary me-2"></i>
                                <span className="fw-bold">Check-in:</span> {moment(fromDate).format('MMMM Do YYYY')}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="booking-details">
                            <div className="detail-item mb-3">
                                <i className="fas fa-calendar-check text-primary me-2"></i>
                                <span className="fw-bold">Check-out:</span> {moment(toDate).format('MMMM Do YYYY')}
                            </div>
                            <div className="detail-item mb-3">
                                <i className="fas fa-clock text-primary me-2"></i>
                                <span className="fw-bold">Duration:</span> {daysCount} days
                            </div>
                            <div className="detail-item mb-3">
                                <i className="fas fa-info-circle text-primary me-2"></i>
                                <span className="fw-bold">Total Amount:</span> ${price * roomCount * daysCount}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
