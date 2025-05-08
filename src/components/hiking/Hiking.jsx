import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const Hiking = () => {
  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <h1 className="display-4">Hiking</h1>
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
            Sri Lanka is a hiker's paradise, boasting a diverse range of trails
            that lead through misty mountains, lush forests, and breathtaking
            viewpoints. Whether you're an experienced trekker seeking a
            challenging climb or a casual explorer looking for a scenic walk,
            the island offers an array of hiking opportunities suited to all
            skill levels. From rugged mountain peaks to hidden waterfalls and
            vast tea plantations, every trail in Sri Lanka promises a unique and
            rewarding experience amidst nature. One of the most popular hiking
            destinations is Ella, home to stunning trails such as Little Adam's
            Peak and Ella Rock, where hikers are treated to panoramic views of
            rolling hills and tea estates. For a more adventurous challenge, the
            Knuckles Mountain Range offers a remote and rugged terrain filled
            with dense forests, waterfalls, and rich biodiversity. Another
            must-visit location is Pidurangala Rock, which provides a
            breathtaking sunrise view over the famous Sigiriya Rock Fortress,
            making it a favorite among photographers and adventure seekers
            alike. Hiking in Sri Lanka is more than just a physical activity;
            it's an opportunity to connect with nature and experience the
            island's cultural and ecological beauty. Along the way, you'll pass
            through vibrant villages, encounter unique wildlife, and witness
            some of the most awe-inspiring landscapes in South Asia. Whether
            you're chasing sunrises from mountain peaks or wandering through
            lush green trails, Sri Lanka's hiking destinations offer an
            unforgettable escape into the heart of nature.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Hiking;
