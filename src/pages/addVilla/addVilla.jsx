import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import {
  InputGroup,
  Form,
  Col,
  Row,
  Container,
  Button,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddVilla = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [villaDetails, setVillaDetails] = useState({
    name: "",
    amenities: [],
    propertyType: "",
    address: "",
    area: "",
    contactNumber: "",
    email: "",
    website: "",
    checkInOut: [{ checkIn: "", checkOut: "" }],
    priceRange: [],
    bedrooms: "",
    bathrooms: "",
    maxGuests: "",
    description: "",
  });

  const amenitiesOptions = [
    { value: "Pool", label: "Pool" },
    { value: "WiFi", label: "WiFi" },
    { value: "Air Conditioning", label: "Air Conditioning" },
    { value: "Kitchen", label: "Kitchen" },
    { value: "Parking", label: "Parking" },
    { value: "Beach Access", label: "Beach Access" },
    { value: "Garden", label: "Garden" },
    { value: "BBQ Area", label: "BBQ Area" },
  ];

  const priceRangeOptions = [
    { value: "Budget", label: "Budget" },
    { value: "Mid-Range", label: "Mid-Range" },
    { value: "Luxury", label: "Luxury" },
  ];

  const propertyTypeOptions = [
    { value: "Beach Villa", label: "Beach Villa" },
    { value: "Mountain Villa", label: "Mountain Villa" },
    { value: "City Villa", label: "City Villa" },
    { value: "Countryside Villa", label: "Countryside Villa" },
    { value: "Lake Villa", label: "Lake Villa" },
  ];

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!villaDetails.name.trim()) {
      tempErrors.name = "Villa name is required";
      isValid = false;
    }

    if (!villaDetails.website.trim()) {
      tempErrors.website = "Website URL is required";
      isValid = false;
    } else if (
      !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
        villaDetails.website
      )
    ) {
      tempErrors.website = "Please enter a valid URL";
      isValid = false;
    }

    if (
      !villaDetails.checkInOut[0].checkIn ||
      !villaDetails.checkInOut[0].checkOut
    ) {
      tempErrors.checkInOut = "Check-in and check-out times are required";
      isValid = false;
    }

    if (villaDetails.amenities.length === 0) {
      tempErrors.amenities = "Please select at least one amenity";
      isValid = false;
    }

    if (villaDetails.priceRange.length === 0) {
      tempErrors.priceRange = "Please select price range";
      isValid = false;
    }

    if (!villaDetails.propertyType) {
      tempErrors.propertyType = "Property type is required";
      isValid = false;
    }

    if (!villaDetails.contactNumber.trim()) {
      tempErrors.contactNumber = "Contact number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(villaDetails.contactNumber)) {
      tempErrors.contactNumber = "Contact number must be 10 digits";
      isValid = false;
    }

    if (!villaDetails.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(villaDetails.email)) {
      tempErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!villaDetails.address.trim()) {
      tempErrors.address = "Address is required";
      isValid = false;
    }

    if (!villaDetails.area.trim()) {
      tempErrors.area = "Area is required";
      isValid = false;
    }

    if (!villaDetails.bedrooms.trim()) {
      tempErrors.bedrooms = "Number of bedrooms is required";
      isValid = false;
    } else if (!/^\d+$/.test(villaDetails.bedrooms) || parseInt(villaDetails.bedrooms) < 1) {
      tempErrors.bedrooms = "Please enter a valid number";
      isValid = false;
    }

    if (!villaDetails.bathrooms.trim()) {
      tempErrors.bathrooms = "Number of bathrooms is required";
      isValid = false;
    } else if (!/^\d+$/.test(villaDetails.bathrooms) || parseInt(villaDetails.bathrooms) < 1) {
      tempErrors.bathrooms = "Please enter a valid number";
      isValid = false;
    }

    if (!villaDetails.maxGuests.trim()) {
      tempErrors.maxGuests = "Maximum number of guests is required";
      isValid = false;
    } else if (!/^\d+$/.test(villaDetails.maxGuests) || parseInt(villaDetails.maxGuests) < 1) {
      tempErrors.maxGuests = "Please enter a valid number";
      isValid = false;
    }

    if (!villaDetails.description.trim()) {
      tempErrors.description = "Description is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleMultiSelectChange = (selectedOptions, action) => {
    setVillaDetails({
      ...villaDetails,
      [action.name]: selectedOptions.map((option) => option.value),
    });
    if (errors[action.name]) {
      setErrors({
        ...errors,
        [action.name]: "",
      });
    }
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setVillaDetails({
      ...villaDetails,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleTimeChange = (e, index, timeType) => {
    const updatedCheckInOut = [...villaDetails.checkInOut];
    updatedCheckInOut[index][timeType] = e.target.value;
    setVillaDetails({
      ...villaDetails,
      checkInOut: updatedCheckInOut,
    });
    if (errors.checkInOut) {
      setErrors({
        ...errors,
        checkInOut: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Convert string numbers to actual numbers before sending
      const villaData = {
        ...villaDetails,
        bedrooms: parseInt(villaDetails.bedrooms),
        bathrooms: parseInt(villaDetails.bathrooms),
        maxGuests: parseInt(villaDetails.maxGuests),
      };

      const response = await axios.post(
        "https://travelmate-backend-zuqb.onrender.com/travelmate/add-villa",
        villaData
      );

      if (response.data.success) {
        alert(response.data.message || "Villa added successfully! Pending admin approval.");
        setVillaDetails({
          name: "",
          amenities: [],
          propertyType: "",
          address: "",
          area: "",
          contactNumber: "",
          email: "",
          website: "",
          checkInOut: [{ checkIn: "", checkOut: "" }],
          priceRange: [],
          bedrooms: "",
          bathrooms: "",
          maxGuests: "",
          description: "",
        });
        window.location.reload();
      }
    } catch (error) {
      console.log("Error adding villa", error);
      alert("Error adding villa. Please try again.");
    }
  };

  return (
    <div className="AddVilla" style={{ marginTop: "200px", marginBottom: "150px" }}>
      <header>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "100%" }}
          >
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                padding: "30px",
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                maxWidth: "1200px",
                width: "100%",
              }}
            >
              <h2 className="fw-bold" style={{ paddingBottom: "25px" }}>
                Add a Villa
              </h2>

              <Container style={{ maxWidth: "100%" }}>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="6">
                      <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Villa Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the villa name"
                          name="name"
                          value={villaDetails.name}
                          onChange={changeHandler}
                          isInvalid={!!errors.name}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formWebsite" className="mb-3">
                        <Form.Label>Website URL</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter website url"
                          name="website"
                          value={villaDetails.website}
                          onChange={changeHandler}
                          isInvalid={!!errors.website}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.website}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    {villaDetails.checkInOut.map((time, index) => (
                      <Col md="6" key={index} className="mb-3">
                        <Form.Group controlId={`formCheckInOut-${index}`}>
                          <Form.Label>Check-in / Check-out</Form.Label>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip>Check-in time</Tooltip>}
                            >
                              <Form.Control
                                type="time"
                                name="checkIn"
                                value={time.checkIn}
                                onChange={(e) =>
                                  handleTimeChange(e, index, "checkIn")
                                }
                                isInvalid={!!errors.checkInOut}
                              />
                            </OverlayTrigger>
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip>Check-out time</Tooltip>}
                            >
                              <Form.Control
                                type="time"
                                name="checkOut"
                                value={time.checkOut}
                                onChange={(e) =>
                                  handleTimeChange(e, index, "checkOut")
                                }
                                isInvalid={!!errors.checkInOut}
                              />
                            </OverlayTrigger>
                          </div>
                          {errors.checkInOut && (
                            <div className="invalid-feedback d-block">
                              {errors.checkInOut}
                            </div>
                          )}
                        </Form.Group>
                      </Col>
                    ))}

                    <Col md="6">
                      <Form.Group controlId="formArea" className="mb-3">
                        <Form.Label>Area/Location</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter area or location"
                          name="area"
                          value={villaDetails.area}
                          onChange={changeHandler}
                          isInvalid={!!errors.area}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.area}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <Form.Group controlId="formAmenities" className="mb-3">
                        <Form.Label>Amenities</Form.Label>
                        <Select
                          isMulti
                          name="amenities"
                          options={amenitiesOptions}
                          value={amenitiesOptions.filter((option) =>
                            villaDetails.amenities.includes(option.value)
                          )}
                          onChange={handleMultiSelectChange}
                          className={errors.amenities ? "is-invalid" : ""}
                        />
                        {errors.amenities && (
                          <div className="invalid-feedback d-block">
                            {errors.amenities}
                          </div>
                        )}
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formPriceRange" className="mb-3">
                        <Form.Label>Price Range</Form.Label>
                        <Select
                          isMulti
                          name="priceRange"
                          options={priceRangeOptions}
                          value={priceRangeOptions.filter((option) =>
                            villaDetails.priceRange.includes(option.value)
                          )}
                          onChange={handleMultiSelectChange}
                          className={errors.priceRange ? "is-invalid" : ""}
                        />
                        {errors.priceRange && (
                          <div className="invalid-feedback d-block">
                            {errors.priceRange}
                          </div>
                        )}
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formPropertyType" className="mb-3">
                        <Form.Label>Property Type</Form.Label>
                        <Select
                          name="propertyType"
                          options={propertyTypeOptions}
                          value={propertyTypeOptions.find(
                            (option) =>
                              option.value === villaDetails.propertyType
                          )}
                          onChange={(selectedOption) => {
                            setVillaDetails({
                              ...villaDetails,
                              propertyType: selectedOption
                                ? selectedOption.value
                                : "",
                            });
                            if (errors.propertyType) {
                              setErrors({
                                ...errors,
                                propertyType: "",
                              });
                            }
                          }}
                          isClearable
                          className={errors.propertyType ? "is-invalid" : ""}
                        />
                        {errors.propertyType && (
                          <div className="invalid-feedback d-block">
                            {errors.propertyType}
                          </div>
                        )}
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group
                        controlId="formContactNumber"
                        className="mb-3"
                      >
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the contact number"
                          maxLength="10"
                          name="contactNumber"
                          value={villaDetails.contactNumber}
                          onChange={changeHandler}
                          isInvalid={!!errors.contactNumber}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.contactNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="email" className="mb-3">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter email address"
                          name="email"
                          value={villaDetails.email}
                          onChange={changeHandler}
                          isInvalid={!!errors.email}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formBedrooms" className="mb-3">
                        <Form.Label>Bedrooms</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Number of bedrooms"
                          name="bedrooms"
                          min="1"
                          value={villaDetails.bedrooms}
                          onChange={changeHandler}
                          isInvalid={!!errors.bedrooms}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.bedrooms}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formBathrooms" className="mb-3">
                        <Form.Label>Bathrooms</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Number of bathrooms"
                          name="bathrooms"
                          min="1"
                          value={villaDetails.bathrooms}
                          onChange={changeHandler}
                          isInvalid={!!errors.bathrooms}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.bathrooms}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formMaxGuests" className="mb-3">
                        <Form.Label>Maximum Guests</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Maximum number of guests"
                          name="maxGuests"
                          min="1"
                          value={villaDetails.maxGuests}
                          onChange={changeHandler}
                          isInvalid={!!errors.maxGuests}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.maxGuests}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group controlId="formAddress" className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Enter address"
                          name="address"
                          value={villaDetails.address}
                          onChange={changeHandler}
                          isInvalid={!!errors.address}
                          style={{
                            borderRadius: "10px",
                            borderWidth: "2px",
                            resize: "none",
                            height: "100px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.address}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md="12">
                      <Form.Group controlId="formDescription" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={10}
                          placeholder="Enter a brief description about the villa"
                          name="description"
                          value={villaDetails.description}
                          onChange={changeHandler}
                          isInvalid={!!errors.description}
                          style={{
                            borderRadius: "10px",
                            borderWidth: "2px",
                            resize: "none",
                            height: "100px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.description}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button variant="primary" type="submit">
                    Add a Villa
                  </Button>
                </Form>
              </Container>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AddVilla;