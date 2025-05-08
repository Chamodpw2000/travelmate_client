import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

function ActivitiesMainArea() {
    return (
        <Container className="mt-5">
            <Row className="mb-4">
                <h1 className="display-4">Cultural Attractions</h1>
            </Row>
            <Row>
                {/* Left Column - Main Image */}
                <Col xs={12} md={7}>
                    <Image
                        src="https://picsum.photos/850/515"
                        alt="Cinnamon Life Hotel"
                        fluid
                        rounded
                        className="mb-3"
                        style={{ width: '100%', height: 'auto', maxHeight: '600px' }}
                    />
                </Col>

                {/* Right Column - Additional Images */}
                <Col xs={12} md={5} className="mt-2 mt-md-0">
                    {/* Secondary image */}
                    <Image
                        src="https://picsum.photos/500/350"
                        alt="Cinnamon Life Hotel"
                        fluid
                        rounded
                        className="mb-3"
                        style={{ width: '100%', height: 'auto', maxHeight: '300px' }}
                    />

                    {/* Thumbnail images */}
                    <Row>
                        <Col xs={4}>
                            <Image
                                src="https://picsum.photos/200/100"
                                alt="Hotel View 1"
                                fluid
                                rounded
                                style={{ width: '100%', height: '135px', objectFit: 'cover' }}
                            />
                        </Col>
                        <Col xs={4}>
                            <Image
                                src="https://picsum.photos/201/100"
                                alt="Hotel View 2"
                                fluid
                                rounded
                                style={{ width: '100%', height: '135px', objectFit: 'cover' }}
                            />
                        </Col>
                        <Col xs={4}>
                            <Image
                                src="https://picsum.photos/202/100"
                                alt="Hotel View 3"
                                fluid
                                rounded
                                style={{ width: '100%', height: '135px', objectFit: 'cover' }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* Extended Description Section */}
            <Row className="mt-4">
                <Col xs={12} className="text-center text-md-start">
                    <h2>What you will do,</h2>
                    <p>
                        Our city is home to a rich tapestry of cultural attractions that highlight the deep-rooted history and traditions of the local community. From grand historical monuments and ancient temples to bustling markets and local art exhibitions, every corner tells a story. The cultural heritage sites not only offer a glimpse into the past but also connect visitors to the essence of the community,
                        creating an immersive experience. As you explore these sites, you'll witness a blend of architectural marvels and serene landscapes, each narrating a unique chapter of our city’s journey. Local guides are available to provide insights into the folklore, rituals, and architectural significance of each attraction, allowing you to truly connect with the heart of our culture. Be sure to savor
                        the flavors of traditional cuisine along the way, as many attractions are located near famous local eateries.
                        Whether you're here to learn about ancient customs, admire traditional art forms, or simply enjoy the beauty of historic landmarks, our cultural attractions promise an unforgettable experience. Join us and become part of a story that spans generations.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default ActivitiesMainArea;
