import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const Trekking = () => {
  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <h1 className="display-4">Trekking</h1>
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
            Sri Lanka is a hidden gem for trekking enthusiasts, offering diverse
            landscapes, stunning natural beauty, and trails that wind through
            lush rainforests, rolling hills, and towering mountains. The
            island's varied terrain provides an adventure for trekkers of all
            levels, from beginners to seasoned hikers. Whether you're seeking
            the thrill of conquering a mountain peak, exploring dense forests,
            or simply enjoying breathtaking views, Sri Lanka's trekking routes
            promise an unforgettable experience in nature. One of the most
            iconic trekking destinations is Adam's Peak, a sacred pilgrimage
            site with a challenging ascent that rewards trekkers with panoramic
            views at sunrise. For those seeking something more serene, the
            Knuckles Mountain Range offers a network of picturesque trails
            through misty forests, valleys, and rivers, showcasing Sri Lanka's
            rich biodiversity. The Horton Plains National Park, home to the
            famous World's End, provides a moderate trek with stunning views of
            the surrounding mountains and valleys, making it a favorite among
            nature lovers and photographers alike. Trekking in Sri Lanka is not
            just about the trails; it's about immersing yourself in the island's
            rich natural heritage. Along the way, trekkers can encounter exotic
            wildlife, explore tea plantations, and discover remote villages that
            offer a glimpse into the traditional rural life. Whether you're
            hiking through cloud forests, climbing ancient hills, or wandering
            the misty peaks, Sri Lanka's trekking trails invite you to connect
            with nature and explore some of the most breathtaking landscapes the
            island has to offer.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Trekking;
