import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './Footer.css'

const Footer = () => {
  return (
    <div>
      <Container fluid className='ft-1 d-flex justify-content-md-center'>
        <Row>
          <Col xs={6} md={3} className='text-light'>
            <div className='my-3'>
              <h5>
              <i class='bx bx-car'></i>
              Rent a car service
             </h5>
            </div>
            <div>
              <p>
                In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without
              </p>
            </div>
          </Col>
          <Col xs={6} md={3} className='text-light'>
            <div className='my-3'>
              <h5>
                Quick links
              </h5>
            </div>
            <div>
              <h6>About</h6>
              <h6>Privacy & Policy</h6>
              <h6>Contact</h6>
            </div>
          </Col>
          <Col xs={6} md={3} className='text-light'>
            <div className='my-3'>
              <h5>
                Head office
              </h5>
            </div>
            <div>
              <h6>Calicute,Kerala,India</h6>
              <h6>rentacar@gmail.com</h6>
              <h6>phone:9526602414</h6>
            </div>
          </Col>
          <Col xs={6} md={3} className='text-light'>
            <div className='my-3'>
              <h5>
                Quick links
              </h5>
            </div>
            <div>
              <h6>About</h6>
              <h6>Privacy & Policy</h6>
              <h6>Contact</h6>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Footer