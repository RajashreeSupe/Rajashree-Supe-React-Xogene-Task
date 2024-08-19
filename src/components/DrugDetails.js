import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDrugs, getDrugDetails, getNDCs } from '../Api';
import { Container, ListGroup, Spinner, Alert } from 'react-bootstrap';

function DrugDetails() {
  const { drugName } = useParams();
  const [drugDetails, setDrugDetails] = useState(null);
  const [ndcs, setNdcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError('');
      try {
        console.log('Fetching drug data...');
        const drugsData = await getDrugs(drugName);
        console.log('Drugs data:', drugsData);

        if (drugsData && drugsData.drugGroup && drugsData.drugGroup.conceptGroup) {
          const firstDrug = drugsData.drugGroup.conceptGroup[0].conceptProperties[0];
          const rxcui = firstDrug.rxcui;
          console.log('RXCUI:', rxcui);

          console.log('Fetching drug details...');
          const drugDetailsData = await getDrugDetails(rxcui);
          console.log('Drug details data:', drugDetailsData);
          setDrugDetails(drugDetailsData.properties || {});

          console.log('Fetching NDCs...');
          const ndcData = await getNDCs(rxcui);
          console.log('NDC data:', ndcData);
          setNdcs(ndcData.ndcGroup.ndcList.ndc || []);
        } else {
          setError('No details found.');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to fetch drug details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [drugName]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!drugDetails) {
    return <Alert variant="info">No details found.</Alert>;
  }

  return (
    <Container>
      <h2>Drug Details</h2>
      <h4>Id: {drugDetails.rxcui}</h4>
      <h4>Name: {drugDetails.name}</h4>
      <h5>Synonyms: {drugDetails.synonym ? drugDetails.synonym.join(', ') : 'N/A'}</h5>

      <h6>Associated NDCs:</h6>
      <ListGroup>
        {ndcs.map((ndc, index) => (
          <ListGroup.Item key={index}>{ndc}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default DrugDetails;