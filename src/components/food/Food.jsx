import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const Food = () => {
  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <h1 className="display-4">Food</h1>
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
            Sri Lanka is a food lover's paradise, offering a rich and diverse
            culinary experience influenced by centuries of history and cultural
            fusion. From aromatic spices to tropical fruits and fresh seafood,
            Sri Lankan cuisine is a perfect blend of bold flavors and vibrant
            colors. Whether you're indulging in a traditional rice and curry
            meal, savoring crispy hoppers, or enjoying the heat of a spicy kottu
            roti, every dish tells a story of the island's heritage and love for
            food. One of the must-try staples is rice and curry, a flavorful
            combination of steamed rice served with an array of curries,
            including dhal lentils, coconut-infused vegetables, and spicy
            meats or seafood. For a more interactive food experience, kottu roti
            is a street food favorite—chopped roti stir-fried with vegetables,
            egg, and your choice of meat, creating a rhythmic clatter as it's
            prepared. If you're in the mood for something light, hoppers
            bowl-shaped crispy pancakes and string hoppers steamed rice
            noodle nests are perfect for breakfast or dinner, often enjoyed
            with spicy sambols and coconut milk-based curries. Beyond its
            traditional dishes, Sri Lanka's food culture is deeply rooted in
            hospitality, with locals taking pride in sharing home-cooked meals
            and fresh produce. Whether you're exploring bustling street food
            stalls, seaside seafood restaurants, or cozy village kitchens, every
            bite is an explosion of flavors, from fiery chilies to creamy
            coconut and tangy tamarind. For those with a sweet tooth, treats
            like kiribath milk rice and watalappan spiced coconut custard
            offer the perfect way to end a delicious meal. Embark on a culinary
            journey through Sri Lanka and experience the heart and soul of its
            flavorful cuisine.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Food;
