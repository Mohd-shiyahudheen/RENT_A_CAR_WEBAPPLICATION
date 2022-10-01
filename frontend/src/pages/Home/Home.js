import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Home.css";

const Home = () => {
  const [cars, setCars] = useState([])

  useEffect(() => {
    axios.get("/user/displayCars").then(res => {
      console.log(res)
      setCars(res.data)
    }).catch(err => console.log(err));
  }, []);
  return (
    <>
      <Header />
      <div className="main">
        <Container>
          <Row>
            <Col>
              {/* <img style={{ height: '300px' }} src={require('../Home/rent-a-car-1.2.png')} class="img-fluid" alt="Responsive image"></img> */}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Find Your Best Car */}
      <div className="">
        <Container fluid className="p-0">
          <Row>
            <Col sm={4} className="bg-warning">
              <h4 className="my-5 ">
                Find Your Best Car here
                <br />&<br />
                Book Now
              </h4>
            </Col>
            <Col sm={8} className="fm-1">
              <Form className="from1 my-3">
                <div className="">
                  <input
                    placeholder="from address"
                    className="input2"
                    type="text"
                  ></input>
                  <input
                    placeholder="To address"
                    className="input2"
                    type="text"
                  ></input>
                  <input
                    placeholder="dd/mm/yy"
                    className="input2"
                    type="text"
                  ></input>
                </div>
                <div className="">
                  <input
                    placeholder="Journytime"
                    className="input2"
                    type="text"
                  ></input>
                  <input
                    placeholder="Cartype"
                    className="input2"
                    type="text"
                  ></input>
                </div>
                <Button variant="success">Submit</Button>{" "}
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      {/* About us */}
      <div className="about my-5">
        <Container fluid className="p-0">
          <Row>
            <Col xs={12} sm={12} md={6}>
              <div>
                <h3 className="text-primary ">About us</h3>
              </div>
              <h5>Welcome To Car Rental Service</h5>
              <div>
                <p className="ml-3">
                  With Flexible Bookings & No Hidden Fees, Secure Your Car
                  Rental at The Best Price Now. Unbeatable Prices. We Speak Your
                  Language. No Credit Card Fees. Types: Economy, Mini, Compact,
                  People carrier, Intermediate, Premium, 4x4, Estate, SUV,
                  Convertible. In publishing and graphic design, Lorem ipsum is
                  a placeholder text commonly used to demonstrate the visual
                  form of a document or a typeface without relying on meaningful
                  content. Lorem ipsum may be used as a placeholder before final
                  copy is available.
                </p>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} className="">
              <Row>
                <img
                  style={{ height: "300px" }}
                  src={require("../Home/rent-a-car-2.png")}
                  class="img-fluid"
                  alt="Responsive image"
                ></img>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Populer Services */}
      <div>
        <Container fluid className="p-0">
          <div className="my-3">
            <h3>
              <span className="text-primary">See Our</span>
              <br /> Populer Services
            </h3>
          </div>
          <Row>
            <Col xs={6} md={4}>
              <div className="text-primary" style={{ fontSize: "50px" }}>
                <i class="bx bxs-location-plus"></i>
              </div>
              <h5>City Transfer</h5>
              <div className="text-left">
                <p>
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available.
                </p>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div className="text-primary" style={{ fontSize: "50px" }}>
                <i class="bx bxs-business"></i>
              </div>
              <h5>Whole City Tour</h5>
              <div>
                <p>
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available.
                </p>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div className="text-primary" style={{ fontSize: "50px" }}>
                <i class="bx bxs-car"></i>
              </div>
              <h5>Unlimited Malies Car Rental</h5>
              <div>
                <p>
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available.
                </p>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div className="text-primary" style={{ fontSize: "50px" }}>
                <i class="bx bx-timer"></i>
              </div>
              <h5>Fast & Easy Booking</h5>
              <div>
                <p>
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available.
                </p>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div className="text-primary" style={{ fontSize: "50px" }}>
                <i class="bx bx-current-location"></i>
              </div>
              <h5>Many Picup Locations</h5>
              <div>
                <p>
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available.
                </p>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div className="text-primary" style={{ fontSize: "50px" }}>
                <i class="bx bxs-plane-take-off"></i>
              </div>
              <h5>Airport Transfer</h5>
              <div>
                <p>
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Hot Offer */}
      <div className="my-5 mx-auto">
        <Container>
          <div className="my-5">
            <h3 className="text-primary">Hot Offer</h3>
          </div>
          <Row>
            {cars.map(cars => (
              <Col xs={12} md={3}>
                <Card className="mx-auto" style={{ width: "16rem" }}>
                  <Card.Img style={{height:"200px"}}
                    variant="top"
                    src={cars.image}
                  />
                  <ListGroup className="list-group-flush d-flex">
                    <ListGroup.Item> 
                      <Card.Title>{cars.carModel}</Card.Title>
                    </ListGroup.Item>
                      <ListGroup.Item className="d-flex">
                      <Button style={{ height: "60px", width: "70px"}} variant="outline-primary">Fuel<br/>{cars.fuelType}</Button>
                      <Button style={{ height: "60px", width: "70px", marginLeft: "10px" }} variant="outline-success">Seat <br/> {cars.seats} </Button>
                      <Button style={{ height: "60px", width: "70px", marginLeft: "10px" }} variant="outline-danger">Day/<br/>{cars.dayRent}</Button>
                     
                      </ListGroup.Item>
                  </ListGroup>
                  <Card.Footer>
                    <Button variant="outline-success"><Link to={`/booking/${cars._id}`} style={{ textDecoration: 'none' }}>Rent Now</Link></Button>
                  </Card.Footer>
                </Card>
              </Col>
          ))}
          </Row>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default Home;
