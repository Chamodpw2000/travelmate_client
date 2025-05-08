import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import moment from 'moment';

const GuideBookingC = ({ guide, fromDate, toDate, totaldays, totalprice, status, id, date, onMarkCancle }) => {
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
                            onClick={() => onMarkCancle(id)}
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
                <h4 className="text-primary mb-3">Guide Booking - {guide.name}</h4>
                <div className="row">
                    <div className="col-md-6">
                        <div className="booking-details">
                            <div className="detail-item mb-3">
                                <i className="fas fa-map-marker-alt text-primary me-2"></i>
                                <span className="fw-bold">Areas:</span> {guide.area.join(', ')}
                            </div>
                            <div className="detail-item mb-3">
                                <i className="fas fa-language text-primary me-2"></i>
                                <span className="fw-bold">Languages:</span> {guide.languages.join(', ')}
                            </div>
                            <div className="detail-item mb-3">
                                <i className="fas fa-calendar-alt text-primary me-2"></i>
                                <span className="fw-bold">From Date:</span> {fromDate}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="booking-details">
                            <div className="detail-item mb-3">
                                <i className="fas fa-calendar-check text-primary me-2"></i>
                                <span className="fw-bold">To Date:</span> {toDate}
                            </div>
                            <div className="detail-item mb-3">
                                <i className="fas fa-clock text-primary me-2"></i>
                                <span className="fw-bold">Duration:</span> {totaldays} days
                            </div>
                            <div className="detail-item mb-3">
                                <i className="fas fa-dollar-sign text-primary me-2"></i>
                                <span className="fw-bold">Total Price:</span> ${totalprice}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuideBookingC;
