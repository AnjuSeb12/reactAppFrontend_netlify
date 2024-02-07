import React from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogout } from '../../redux/userAuth';
import Cookies from 'js-cookie';
import './Header.css';









function Header() {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLogout());
    Cookies.remove("token");
    navigate("/login");

  }
  return (
    <Navbar expand="lg" className="bg-dark " >
      <Container>
        <Navbar.Brand as={Link} to="/">Branded Watches</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {/* <Nav.Link as={Link} to="/admin">Admin</Nav.Link> */}
            <NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to = "/add">Add

              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to = "/users">
                Users List
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/order">Orders List</NavDropdown.Item>
              <NavDropdown.Divider />
              {/* <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>







          </Nav>
          <Nav className='ms-auto'>
            {isAuthenticated ? <Button onClick={handleLogout} >Logout</Button> : <Nav.Link as={Link} to="/login"><Button>Login</Button></Nav.Link>}
            <Nav.Link as={Link} to="/signup"><Button>SignUp</Button></Nav.Link>



          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header