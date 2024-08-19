import React from 'react';
import DrugDetails from '../components/DrugDetails';
import { Container, Row, Col } from 'react-bootstrap';

function DrugDetailsPage() {
  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col>
          <h1>Drug Details</h1>
        </Col>
      </Row>
      <DrugDetails />
    </Container>
  );
}

export default DrugDetailsPage;