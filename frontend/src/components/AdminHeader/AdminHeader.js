import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const navigate = useNavigate()
    return (
        <>
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Link to='/adminHome' style={{ textDecoration: 'none', color: '#fff' }}>
                        <Navbar.Brand href="#home">Admin-Pannel</Navbar.Brand>
                        </Link>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            </Nav>
                            <Nav>
                                <Nav.Link style={{color: '#fff' }}
                                    onClick={() => {
                                        localStorage.removeItem("adminInfo");
                                        navigate('/admin')
                                    }}
                                >
                                    Logout
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            </div>
        </>
    );
}

export default AdminHeader;
