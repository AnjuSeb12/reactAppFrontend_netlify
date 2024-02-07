import React from 'react';
import { Card, Col, Container,Row,Button} from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import './Details.css';

function Details() {
    
  const { id } = useParams();
  const smartW=useSelector((state) => state.data.smarts);
  console.log(id);
 
  const currentRes = smartW.find((res) => res._id === id);
  console.log(currentRes);
  return (
    <Container>
    {currentRes &&
      <Row>
        <Col> <Card md={8} className='mt-3'>
          
          <Card.Img variant="top"  className='imageSize' src={process.env.REACT_APP_SERVER_URL + currentRes.photograph} />
          <Card.Body>
            <Card.Title>{currentRes.name}</Card.Title>
            <Card.Text>
              <p> {currentRes.details}</p>
              <p>{currentRes.amount}</p>

            </Card.Text>
            <Button variant="dark" className='button'><Link  to={`/buynow/${currentRes._id}`}>Order Now</Link></Button>

          </Card.Body>
        </Card>
      
        </Col>
       
      </Row>
    }
  </Container>

  )
}

export default Details