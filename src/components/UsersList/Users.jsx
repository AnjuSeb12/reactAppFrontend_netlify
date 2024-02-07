import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../../axios';
import Delete from '../Delete/Delete';
import './Users.css';







function Users() {
  
  
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const res = await instance.get("api/v1/users",
                {withCredentials:true});
                setUsers(res.data.users);
            } catch (error) {
              toast.error(error.message);  
            }
         
           
        }
        getAllUsers();
    }, [users]);
    console.log(users);

  return (
    <Container>
    <Row>
        <Col className='topicColor mt-3'>Users</Col>
    </Row>
    <ToastContainer position='top-center'/>
    <Row>
        <Col className='mt-3 mb-3'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className='colorWhite'>#</th>
                        <th className='colorWhite'>Full Name</th>
                        <th className='colorWhite'>Email</th>
                        <th className='colorWhite'>Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, index) => (
                        <tr key={index}>
                            <td className='colorWhite'>{index + 1}</td>
                            <td className='colorWhite'>{user.fullname}</td>
                            <td className='colorWhite'>{user.email}</td>
                            <td className='colorWhite'><Delete id={user._id}/></td>
                          
                          
                        </tr>


                    ))}
                </tbody>
            </Table>

        </Col>
    </Row>
</Container>
  )
}

export default Users