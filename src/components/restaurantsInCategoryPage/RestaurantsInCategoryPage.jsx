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
    id,
    images
}) => {
    return (
        <Link to={`/restaurants/${id}`} style={{ textDecoration: 'none' }}>
            <Card className="mb-4 bg-light border-0" style={{ height: '250px' }}>
                <Row className="g-0 h-100">
                    <Col md={4} className="h-100">
                        <div style={{ height: '100%', overflow: 'hidden' }}>
                            <Card.Img 
                                src={images[0]} 
                                alt={`${name} image`} 
                                style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    objectFit: 'cover',
                                    objectPosition: 'center'
                                }} 
                            />
                        </div>
                    </Col>
                    <Col md={8}>
                        <Card.Body className="d-flex flex-column h-100">
                            <Card.Title className="d-flex justify-content-between">
                                <div>
                                    <h5>{name}</h5>
                                </div>
                            </Card.Title>
                            <Card.Text className="mt-3 flex-grow-1" style={{ 
                                overflow: 'hidden', 
                                textOverflow: 'ellipsis', 
                                display: '-webkit-box', 
                                WebkitLineClamp: 3, 
                                WebkitBoxOrient: 'vertical' 
                            }}>
                                {description}
                            </Card.Text>
                            <div>
                                <strong>Cuisines:</strong>{" "}
                                {cuisines.map((cuisine, index) => (
                                    <Badge key={index} bg="secondary" className="me-2">
                                        {cuisine}
                                    </Badge>
                                ))}
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
                                imageUrl="https://picsum.photos/400/300"
                                id={restaurant.id}
                                images={restaurant.images}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default RestaurantsInCategoryPage
