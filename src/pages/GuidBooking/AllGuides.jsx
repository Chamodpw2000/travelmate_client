import { FaUserTie } from 'react-icons/fa';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from 'antd';
import axios from 'axios';

const { RangePicker } = DatePicker;

const AllGuides = () => {
    const [allGuides, setAllGuides] = useState([]);
    const [availableGuides, setAvailableGuides] = useState([]);
    const [text, setText] = useState("");
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            axios.get('http://localhost:3000/travelmate/allGuides')
                .then((response) => {
                    setAllGuides(response.data);
                    console.log("Guides:", response.data);
                }).catch((error) => { console.log(error) });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleAvailabilityCheck = () => {
        checkAvailability(fromDate, toDate, allGuides);
        setText(`Available Travel Guides from ${fromDate} to ${toDate}`);
    }

    const checkAvailability = (fromDate, toDate, guides) => {
        const checkStart = moment(fromDate, "DD-MM-YYYY");
        const checkEnd = moment(toDate, "DD-MM-YYYY");

        const availableGuides = guides.filter(guide => {
            return !guide.bookings.some(booking => {
                const existingStart = moment(booking.fromDate, "DD-MM-YYYY");
                const existingEnd = moment(booking.toDate, "DD-MM-YYYY");
                return checkStart.isBetween(existingStart, existingEnd, null, '[)') ||
                    checkEnd.isBetween(existingStart, existingEnd, null, '(]') ||
                    (checkStart.isBefore(existingStart) && checkEnd.isAfter(existingEnd));
            });
        });

        setAvailableGuides(availableGuides);
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
                                <FaUserTie className="me-3" />
                                Find Your Perfect Travel Guide
                            </h1>
                            <div className="w-25 mx-auto">
                                <hr className="text-primary" style={{ height: '3px', opacity: '0.5' }} />
                            </div>
                            <h4 className="text-muted mt-4">Expert Local Guides for Your Journey!</h4>
                        </div>

                        <div className="row mt-5">
                            <div className="col-md-8">
                                <div className="p-4 bg-white rounded shadow-sm">
                                    <div className="text-muted">
                                        <p>Discover the best local experiences with our expert travel guides. Our certified guides offer:<br /><br />
                                            🌟 Local Expertise & Cultural Insights<br />
                                            🗣️ Multiple Language Support<br />
                                            🎯 Customized Tour Planning<br />
                                            🏛️ Historical & Cultural Knowledge<br />
                                            ⭐ Top-Rated Experiences<br /><br />
                                            Let our guides transform your journey into an unforgettable adventure! 🌍✨</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h4 className="card-title mb-4">
                                            <FaUserTie className="me-2 text-primary" />
                                            Check Guide Availability
                                        </h4>
                                        <RangePicker
                                            format={"DD-MM-YYYY"}
                                            onChange={filterByDate}
                                            className="w-100 mb-3"
                                            disabledDate={(current) => current && current < moment().startOf('day')}
                                        />
                                        {!fromDate || !toDate ? (
                                            <div className="alert alert-warning mt-3">
                                                Select dates to find available guides
                                            </div>
                                        ) : (
                                            <div>
                                                <button onClick={handleAvailabilityCheck} className="btn btn-primary w-100 py-3 mt-3">
                                                    Find Available Guides
                                                </button>
                                                <div className="text-success mt-2 text-center">{text}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {availableGuides.length > 0 && (
                    <div className="guide-list container py-4">
                        <h3 className="text-primary mb-4 border-bottom pb-3">
                            <FaUserTie className="me-2" />
                            Available Guides For Selected Dates
                        </h3>

                        <div className="row">
                            {availableGuides.map((guide, index) => (
                                <div key={index} className="col-md-4 mb-4">
                                    <div className="card h-100 shadow-sm hover-card" 
                                         onClick={() => navigate("/conguidebook", 
                                             { state: { from: fromDate, to: toDate, guide: guide } })}>
                                        <img
                                            src={guide.image || 'https://picsum.photos/300/200'}
                                            className="card-img-top"
                                            alt={guide.name}
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title text-primary">{guide.name}</h5>
                                            <p className="mb-2">
                                                <i className="fas fa-map-marker-alt me-2"></i>
                                                <strong>Areas:</strong> {guide.area.join(', ')}
                                            </p>
                                            <p className="mb-2">
                                                <i className="fas fa-language me-2"></i>
                                                <strong>Languages:</strong> {guide.languages.join(', ')}
                                            </p>
                                            <p className="mb-2">
                                                <i className="fas fa-dollar-sign me-2"></i>
                                                <strong>Rate per Day:</strong> ${guide.chargesPerDay}
                                            </p>
                                            <p className="mb-0">
                                                <i className="fas fa-star me-2 text-warning"></i>
                                                <strong>Rating:</strong> {guide.rating} / 5
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AllGuides;
