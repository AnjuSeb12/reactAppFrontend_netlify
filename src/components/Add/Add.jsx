import React, { useState } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom'
import instance from '../../axios';



function Add() {
    const [productName, setProductName] = useState('');
    const [details, setDetails] = useState('');
    const [amount, setAmount] = useState('');
    const [Photograph, setPhotograph] = useState(null);
    const navigate=useNavigate();
    const [validated, setValidated] = useState(false);

    const handleProductName = (e) => {
        setProductName(e.target.value);
    }
    const handleDetails = (e) => {
        setDetails(e.target.value);
    }
    const handleAmount= (e) => {
        setAmount(e.target.value);
    }
    const handlePhotograph = (e) => {

        setPhotograph(e.target.files[0]);
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            const formData = new FormData();
            formData.append("name", productName);
            formData.append("details", details);
            formData.append("amount", amount);
            formData.append("photograph", Photograph);
            try {
                const res = await instance.post('api/v1/smartadd', formData, {
                 
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                if (res.data.success) {
                    toast.success(res.data.message, {
                        autoClose: 2000
                    });
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    navigate('/');

                } else {
                    toast.error(res.data.message);

                }
            }
            catch(error){
                toast.error(error.response.data.message)
            }
          

           
        }
        setValidated(true);
    }
  return (
    <Container>
    <Row>
        <Col className='mt-3 mb-3'>
            <ToastContainer position='top-right' />
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Product Name:</Form.Label>
                    <Form.Control type="text" placeholder="Product Name" onChange={(e) => handleProductName(e)} required />
                    <Form.Control.Feedback type='invalid'>Please enter Product Name</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>Entered Successfully</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Product Details:</Form.Label>
                    <Form.Control type="text" placeholder="Product Details" onChange={(e) => handleDetails(e)} required />
                    <Form.Control.Feedback type='invalid'>Please enter Product Details</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>Entered Successfully</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Amount:</Form.Label>
                    <Form.Control type="text" placeholder="Amount" onChange={(e) => handleAmount(e)} required />
                    <Form.Control.Feedback type='invalid'>Amount</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>Entered Successfully</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Photograph:</Form.Label>
                    <Form.Control type="file" onChange={(e) => handlePhotograph(e)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Details
                </Button>
            </Form>




        </Col>
    </Row>
</Container>
  )
}

export default Add