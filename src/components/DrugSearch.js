import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDrugs, getSpellingSuggestions } from '../Api';
import { Form, Button, ListGroup, Alert, Container } from 'react-bootstrap';

function DrugSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    setError('');
    setResults([]);
    try {
      const drugsData = await getDrugs(query);
      
      if (drugsData?.drugGroup?.conceptGroup) {
        const concepts = drugsData.drugGroup.conceptGroup.flatMap(group => group.conceptProperties || []);
        
        if (concepts.length > 0) {
          setResults(concepts.map(concept => concept.name));
        } else {
          const suggestionsData = await getSpellingSuggestions(query);
          
          if (suggestionsData?.suggestionGroup?.suggestionList?.suggestion?.length > 0) {
            setResults(suggestionsData.suggestionGroup.suggestionList.suggestion);
          } else {
            setError('No results or suggestions found.');
          }
        }
      } else {
        setError('No results found.');
      }
    } catch (err) {
      setError('An error occurred during the search.');
    }
  };

  return (
    <Container>
      <h2>Search for Drugs!</h2>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSearch}>
        Search
      </Button>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      
      <ListGroup className="mt-3">
        {results.map((result, index) => (
          <ListGroup.Item
            action
            key={index}
            onClick={() => navigate(`/drugs/${result}`)}
          >
            {result}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default DrugSearch;