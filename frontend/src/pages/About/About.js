import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

const About = () => {
  return (
    <>
      <Header />
      <div>
        <div className='d-flex justify-content-between align-items-left'>
          <Container>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <div>
                  <h3 className='text-primary'>Company Details</h3>
                  <p>
                    10+ Year of Success ,We providing best service for our customers<br />
                    Office Time : 9pm to 8pm<br />
                    office Location : kinfra techno industrial park kakkancherry,Malappuram
                  </p>
                </div>
              </Col>
              <Col xs={12} sm={12} md={6}>
                2 of 2
              </Col>
            </Row>
          </Container>
        </div>
        <div className='about my-5'>
          <Container fluid className='p-0'>
            <Row>
              <Col>
                <div>
                  <h3 className='text-primary '>About us</h3>
                </div>
                <h5>Welcome To Car Rental Service</h5>
                <div>
                  <p className='ml-3'>
                    With Flexible Bookings & No Hidden Fees, Secure Your Car Rental at The Best Price Now. Unbeatable Prices. We Speak Your Language. No Credit Card Fees. Types: Economy, Mini, Compact, People carrier, Intermediate, Premium, 4x4, Estate, SUV, Convertible.
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
                  </p>
                </div>
              </Col>
              <Col className=''>
                <Row>
                  <img style={{ height: '300px' }} src={require('../Home/rent-a-car-2.png')} class="img-fluid" alt="Responsive image"></img>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default About  