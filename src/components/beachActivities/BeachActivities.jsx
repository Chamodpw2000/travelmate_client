import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const BeachActivities = () => {
  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <h1 className="display-4">Beach Activities</h1>
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
            Sri Lanka's stunning coastline offers a vibrant mix of beach
            activities, inviting travelers to experience the island's sun, sand,
            and sea in unforgettable ways. From golden shores lined with swaying
            palms to hidden coves with crystal-clear waters, each destination
            presents a unique seaside adventure. Whether you seek thrilling
            water sports, peaceful relaxation, or marine exploration, Sri
            Lanka's beaches have something for everyone. For adrenaline seekers,
            the island's surfing hotspots, such as Arugam Bay and Hikkaduwa,
            provide world-class waves, while Bentota and Mirissa offer jet
            skiing, parasailing, and exciting banana boat rides. Snorkeling and
            scuba diving enthusiasts can discover the vibrant coral reefs and
            diverse marine life in places like Pigeon Island and Unawatuna.
            Whale and dolphin watching in Mirissa is another must-try
            experience, giving visitors a chance to witness these majestic
            creatures in their natural habitat. Beyond the waves, beach lovers
            can enjoy a serene sunset stroll along the shores of Negombo or
            unwind under the shade of a coconut tree in Passikudah's tranquil
            waters. Local fishermen still practice traditional stilt fishing
            along the southern coast, providing a glimpse into Sri Lanka's
            deep-rooted maritime culture. Many beachfront restaurants serve
            freshly caught seafood, offering an authentic taste of island
            cuisine with breathtaking ocean views. Whether you're looking for
            adventure, relaxation, or a cultural connection to the sea, Sri
            Lanka's beach activities create memories that last a lifetime.
            Immerse yourself in the rhythm of the waves and experience the
            tropical paradise that awaits along the island's shores.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default BeachActivities;
