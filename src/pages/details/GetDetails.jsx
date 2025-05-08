import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap'; // Import Button
import logo from "../../assets/TravalMateLogo2.png";
import "../details/GetDetails.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const GetDetails = () => {

    const navigate = useNavigate()

    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        country: '',
        state: '',
        mobileNo: '',
        birthday: '',
        gender: ''
    });

    const { id } = useParams(); // Get the ID from the URL

    // Function to fetch profile data based on ID
    const getProfile = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/travelmate/getprofile/${id}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log("Use effect called");
        
        const fetchProfile = async () => {
            const data = await getProfile(id);
            console.log(data);
            if (data) {
                setProfileData(data); // Set the profile data into the state
            }
        };

        fetchProfile();
    }, [id]);

    // Update state when form values change
    const changeHandler = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    // Submit handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log("Form submitted", profileData);

        try {
            // Post the updated profile data to the server
            const response = await axios.post(`http://localhost:3000/travelmate/updateprofile/${id}`, profileData);
            console.log("Profile updated successfully", response.data);
            if(response.data.success){
                localStorage.setItem('auth-token', response.data.token);
                console.log(response.data.token);
                
    }
            navigate('/')
        } catch (error) {
            console.log("Error updating profile", error);
        }
    };

    return (
        <header>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: '100%' }}
                >
                    <div
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            padding: '30px',
                            borderRadius: '15px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            maxWidth: '1200px',
                            width: '100%'
                        }}
                    >
                        <div className="d-flex justify-content-left align-items-left">
                            <img
                                src={logo}
                                alt="Icon"
                                style={{ height: '98px', paddingBottom: '33px' }}
                            />
                        </div>
                        <h2 className='fw-bold' style={{ paddingBottom: '25px' }}>Hello, adventurer!</h2>

                        <Container style={{ maxWidth: '100%' }}>
                            <Form onSubmit={handleSubmit}> {/* Form submission handler */}
                                <Row>
                                    <Col md="6">
                                        <Form.Group controlId="formFirstName" className="mb-3">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                placeholder="Enter First Name"
                                                style={{
                                                    borderRadius: '10px',
                                                    height: '50px',
                                                    borderWidth: '2px',
                                                }}
                                                value={profileData.firstName || ''}
                                                onChange={changeHandler}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md="6">
                                        <Form.Group controlId="formLastName" className="mb-3">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                placeholder="Enter Last Name"
                                                style={{
                                                    borderRadius: '10px',
                                                    height: '50px',
                                                    borderWidth: '2px',
                                                }}
                                                value={profileData.lastName || ''}
                                                onChange={changeHandler}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="6">
                                        <Form.Group controlId="formCountry" className="mb-3">
                                            <Form.Label>Country</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="country"
                                                placeholder="Enter Country"
                                                style={{
                                                    borderRadius: '10px',
                                                    height: '50px',
                                                    borderWidth: '2px',
                                                }}
                                                value={profileData.country || ''}
                                                onChange={changeHandler}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md="6">
                                        <Form.Group controlId="formState" className="mb-3">
                                            <Form.Label>State</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="state"
                                                placeholder="Enter State"
                                                style={{
                                                    borderRadius: '10px',
                                                    height: '50px',
                                                    borderWidth: '2px',
                                                }}
                                                value={profileData.state || ''}
                                                onChange={changeHandler}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                
                                <Row>
                                    <Col md="6">
                                        <Form.Group controlId="formMobileNo" className="mb-3">
                                            <Form.Label>Mobile No</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="mobileNo"
                                                placeholder="Enter Mobile Number"
                                                style={{
                                                    borderRadius: '10px',
                                                    height: '50px',
                                                    borderWidth: '2px',
                                                }}
                                                value={profileData.mobileNo || ''}
                                                onChange={changeHandler}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md="6">
                                        <Form.Group controlId="formBday" className="mb-3">
                                            <Form.Label>Birthday</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="birthday"
                                                placeholder="Enter Birthday"
                                                style={{
                                                    borderRadius: '10px',
                                                    height: '50px',
                                                    borderWidth: '2px',
                                                }}
                                                value={profileData.birthday || ''}
                                                onChange={changeHandler}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="6">
                                        <Form.Group controlId="formGender" className="mb-3">
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="gender"
                                                placeholder="Select Gender"
                                                style={{
                                                    borderRadius: '10px',
                                                    height: '50px',
                                                    borderWidth: '2px',
                                                }}
                                                value={profileData.gender || ''}
                                                onChange={changeHandler}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* Submit Button */}
                                <div className="d-flex justify-content-end mt-4">
                                    <Button type="submit" variant="primary" style={{ padding: '10px 20px' }}>
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </Container>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default GetDetails;
