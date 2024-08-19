import React from 'react';
import DrugSearch from '../components/DrugSearch';
import { Container, Row, Col } from 'react-bootstrap';

function SearchPage() {
  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col>
          <h1 className="display-4">Drug Search</h1>
        </Col>
      </Row>
      <DrugSearch />
    </Container>
  );
}

export default SearchPage;