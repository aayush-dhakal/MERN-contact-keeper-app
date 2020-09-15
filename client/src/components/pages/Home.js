import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AuthContext from "../../context/auth/AuthContext";
import ContactFilter from "../contacts/ContactFilter";
import ContactForm from "../contacts/ContactForm";
import Contacts from "../contacts/Contacts";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Container className="mt-3">
        <Row>
          {/* starting from extra small screen take full 12 width and once medium width is hit start taking half ie 6 width */}
          <Col xs={12} md={6}>
            <ContactForm />
          </Col>

          <Col xs={12} md={6}>
            <ContactFilter />
            <Contacts />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
