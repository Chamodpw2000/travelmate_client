import React, { useContext } from 'react'
import { ClientContext } from '../../context/ClientContext'
import { Card, Badge, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

const RestaurantCard = ({
    name,
    location,
    reviews,
    description,
    cuisines,
    priceRange,
    imageUrl,
    id
}) => {
    return (
        <Link to={`/restaurants/${id}`} style={{ textDecoration: 'none' }}>
            <Card className="mb-4 bg-light border-0">
                <Row className="g-0">
                    <Col md={4}>
                        <Card.Img src={imageUrl} alt={`${name} image`} className="h-100" />
                    </Col>
                    <Col md={8}>
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between">
                                <div>
                                    <h5>{name}</h5>
                                    <small className="text-muted">{location}</small>
                                </div>
                                <Badge bg="success">Top Rated</Badge>
                            </Card.Title>
                            <Card.Text className="mt-3">{description}</Card.Text>
                            <div>
                                <strong>Cuisines:</strong>{" "}
                                {cuisines.map((cuisine, index) => (
                                    <Badge key={index} bg="secondary" className="me-2">
                                        {cuisine}
                                    </Badge>
                                ))}
                            </div>
                            <div className="mt-2">
                                <strong>Price Range:</strong>{" "}
                                <Badge bg="warning" text="dark">
                                    {priceRange}
                                </Badge>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Link>
    );
};


const RestaurantsInCategoryPage = ({restaurantType}) => {
    const { allRestaurants } = useContext(ClientContext);
    const allRestaurantsInCategory = allRestaurants.filter(restaurant => restaurant.mainCategory === restaurantType);
    console.log("Test", allRestaurants)
    return (
        <>
            <div className='bg-light'>
                <div className="container pt-4">
                    {allRestaurantsInCategory.map((restaurant) => (
                        <div key={restaurant.id}>
                            <RestaurantCard
                                name={restaurant.restaurantName}
                                location="Rhodes, Greece"
                                reviews="1,029"
                                description={restaurant.description}
                                cuisines={restaurant.category}
                                priceRange="$$$$"
                                imageUrl="https://picsum.photos/400/300" // Replace with actual image URL
                                id={restaurant.id}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default RestaurantsInCategoryPage