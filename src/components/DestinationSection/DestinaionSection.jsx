import React from 'react'
import DestinationCardComponent from '../destinationCardComponent/DestinationCardComponent';
import { Container, Row } from 'react-bootstrap';

const DestinaionSection = () => {
    return (
        <>
            <Container>
                <Row className="mb-4 mt-4">
                    <h4 >Related Destinations</h4>
                </Row>
                <Row>
                    <div className="d-flex justify-content-center gap-3">
                        <DestinationCardComponent
                            images={[
                                'https://picsum.photos/288/200?random=1',
                                'https://picsum.photos/288/200?random=2',
                                'https://picsum.photos/288/200?random=3'
                            ]}
                            title="Sigiriya The Ancient Rock Fortress"
                            reviewCount="11,738"
                            category="Ancient Ruins, Points of Interest & Landmarks"
                            year="2024"
                        />
                        <DestinationCardComponent
                            images={[
                                'https://picsum.photos/288/200?random=4',
                                'https://picsum.photos/288/200?random=5'
                            ]}
                            title="Pidurangala Rock"
                            reviewCount="2,555"
                            category="Points of Interest & Landmarks"
                            year="2024"
                        />
                        <DestinationCardComponent
                            images={[
                                'https://picsum.photos/288/200?random=6'
                            ]}
                            title="Kaludiya Pokuna"
                            reviewCount="30"
                            category="Historic Sites, Points of Interest & Landmarks"
                            year="2024"
                        />
                        <DestinationCardComponent
                            images={[
                                'https://picsum.photos/288/200?random=6',
                                'https://picsum.photos/288/200?random=7',
                                'https://picsum.photos/288/200?random=8'
                            ]}
                            title="Kaludiya Pokuna"
                            reviewCount="30"
                            category="Historic Sites, Points of Interest & Landmarks"
                            year="2024"
                        />
                    </div>
                </Row>
            </Container>

        </>
    );
}

export default DestinaionSection