import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const Surfing = () => {
  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <h1 className="display-4">Surfing</h1>
      </Row>
      <Row>
        {/* Left Column - Main Image */}
        <Col xs={12} md={7}>
          <Image
            src="https://picsum.photos/850/515"
            alt="Activity"
            fluid
            rounded
            className="mb-3"
            style={{ width: "100%", height: "auto", maxHeight: "600px" }}
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
            style={{ width: "100%", height: "auto", maxHeight: "300px" }}
          />

          {/* Thumbnail images */}
          <Row>
            <Col xs={4}>
              <Image
                src="https://picsum.photos/200/100"
                alt="Activity 1"
                fluid
                rounded
                style={{ width: "100%", height: "135px", objectFit: "cover" }}
              />
            </Col>
            <Col xs={4}>
              <Image
                src="https://picsum.photos/201/100"
                alt="Activity 2"
                fluid
                rounded
                style={{ width: "100%", height: "135px", objectFit: "cover" }}
              />
            </Col>
            <Col xs={4}>
              <Image
                src="https://picsum.photos/202/100"
                alt="Activity 3"
                fluid
                rounded
                style={{ width: "100%", height: "135px", objectFit: "cover" }}
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
            Sri Lanka is widely regarded as one of the top surfing destinations
            in the world, offering a unique blend of stunning beaches, warm
            tropical waters, and consistently perfect waves. The island's
            coastline stretches across both the east and southwest, providing
            ideal surf conditions year-round. Whether you're an experienced
            surfer looking for challenging point breaks or a beginner eager to
            catch your first wave, Sri Lanka's surf spots cater to all levels.
            From the famous swells of Arugam Bay to the mellow shores of
            Weligama, there's a wave for everyone. Arugam Bay, located on the
            east coast, is Sri Lanka's surf capital, drawing surfers from all
            over the world for its long, reliable right-hand point breaks. Its
            laid-back vibe, combined with world-class waves, creates a unique
            surf culture that welcomes riders of all skill levels. On the
            southwest coast, Hikkaduwa offers powerful reef breaks and a vibrant
            beach scene, making it the perfect spot for more advanced surfers.
            Weligama, known for its gentle, rolling waves, is the ideal place
            for beginners to learn and improve their surfing skills, with
            numerous surf schools and a relaxed atmosphere. No matter where you
            choose to surf, Sri Lanka promises more than just great waves. After
            an action-packed surf session, you can unwind on golden beaches,
            savor fresh seafood at beachfront cafes, and immerse yourself in the
            local surf culture. The island's natural beauty and the warm
            hospitality of its coastal towns make surfing here an unforgettable
            experience. With ideal surfing conditions and a range of surf spots
            to explore, Sri Lanka is a must-visit destination for surfers
            seeking adventure and relaxation by the sea.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Surfing;
