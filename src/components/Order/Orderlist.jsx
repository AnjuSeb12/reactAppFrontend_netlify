
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import instance from '../../axios';
import OrderDelete from '../OrderDelete/OrderDelete';
import './Orderlist.css';




function Orderlist() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const getAllUsersOrder = async () => {
            try {
                const res = await instance.get("api/v1/orderlist",
                {withCredentials:true});
                setOrders(res.data.orders);
            } catch (error) {
              toast.error(error.message);  
            }
        
               
            
           
        }
        getAllUsersOrder();
    }, [orders]);
 
  return (
    <Container>
    <Row>
        <Col className='topicColor mt-3'>Orders</Col>
    </Row>
    <ToastContainer position='top-center'/>
    <Row>
        <Col className='mt-3 mb-3'>
            <Table striped bordered hover >
                <thead >
                    <tr >
                        <th className='colorWhite'>#</th>
                        <th className='colorWhite' >Product Name</th>
                        <th className='colorWhite'>Full Name</th>
                        <th className='colorWhite'>Address</th>
                        <th className='colorWhite'>Phone No</th>
                        <th className='colorWhite'>Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map((order, index) => (
                        <tr key={index}>
                            <td className='colorWhite'>{index + 1}</td>
                            <td className='colorWhite'>{order.productname}</td>
                            <td className='colorWhite'>{order.fullname}</td>
                            <td className='colorWhite'>{order.address}</td>
                            <td className='colorWhite'>{order.number}</td>
                           
                            <td className='colorWhite'><OrderDelete id={order._id}/></td>
                          
                        </tr>


                    ))}
                </tbody>
            </Table>

        </Col>
    </Row>
</Container>
  )
}

export default Orderlist