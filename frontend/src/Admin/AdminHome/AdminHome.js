import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import './AdminHome.css'

const AdminHome = () => {

  return (
    <>
      <AdminHeader />
      <div>
        <Container>
          <h3 className='my-3'>Dashboard</h3>
          <Row>
            <Col className='my-5' xs={12} sm={12} md={4}>
              <Card style={{ width: '15rem', height: '10rem', backgroundColor: '  rgba(221, 200, 9, 0.979)' }}>
                <Card.Body>
                  <Link to='/addcar' style={{ textDecoration: 'none', color: 'black' }}>
                    <i class='bx bxs-add-to-queue fs-5 my-5'> ADD CAR</i>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            <Col className='my-5' xs={12} sm={12} md={4}>
              <Card style={{ width: '15rem', height: '10rem', backgroundColor: 'rgba(221, 200, 9, 0.979)' }}>
                <Card.Body>
                  <Link to='/viewcars' style={{ textDecoration: 'none', color: 'black' }}>
                  <i class='bx bxs-car fs-5 my-5'> VIEW CARS</i>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col className='my-5' xs={12} sm={12} md={4}>
            <Card style={{ width: '15rem', height: '10rem', backgroundColor: '  rgba(221, 200, 9, 0.979)' }}>
              <Card.Body>
                 <Link to='/viewBlog' style={{ textDecoration: 'none', color: 'black' }}>
                <i class='bx bx-edit fs-5 my-5'> Manage Blog</i>
                 </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col className='my-5' xs={12} sm={12} md={4}>
            <Card style={{ width: '15rem', height: '10rem', backgroundColor: '  rgba(221, 200, 9, 0.979)' }}>
              <Card.Body>
                  <Link to='/bookedcars' style={{ textDecoration: 'none', color: 'black' }}>
                <i class='bx bx-bookmarks fs-5 my-5'>BOOKED CARS</i>
                  </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col className='my-5' xs={12} sm={12} md={4}>
            <Card style={{ width: '15rem', height: '10rem', backgroundColor: '  rgba(221, 200, 9, 0.979)' }}>
              <Card.Body>
                 <Link to='/cancelledbooking' style={{ textDecoration: 'none', color: 'black' }}>
                <i class='bx bx-block fs-5 my-5'>CANCELLED BOOKING</i>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col className='my-5' xs={12} sm={12} md={4}>
            <Card style={{ width: '15rem', height: '10rem', backgroundColor: '  rgba(221, 200, 9, 0.979)' }}>
              <Card.Body>
                  <Link to='/viewUser' style={{ textDecoration: 'none', color: 'black' }}>
                <i class='bx bxs-user-account fs-5 my-5'>USER MANAGMENT</i>
                  </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
}

export default AdminHome;
