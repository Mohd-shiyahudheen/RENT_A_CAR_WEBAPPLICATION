import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './BookingDetails.css'

const BookingDetails = () => {
    const [state, setState] = useState({});

    let {carId} = useParams()
    const BookCar = async (carId)=>{
        const BookingDt = await axios.get(`/user/booking/${carId}`)
        console.log(BookingDt.data);
        setState(BookingDt.data)
    }

    useEffect(() => {
        BookCar(carId)
    }, []);
    return (
        <>
            <Header />
            <div className='my-5'>
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={6}>
                            <div>
                                <img style={{ height: '300' }} src={state.image} class="img-fluid" alt="Responsive image"></img>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6}>
                            <>
                                <Button  className='my-2' style={{ height: "60px", width: "300px", marginLeft: "20px" }} variant="info"><h3>{state.carModel}</h3></Button>
                                <div className='mx- my-3 d-flex'>
                                    <Button style={{ height: "60px", width: "150px", marginLeft: "20px" }} variant="outline-primary">Fuel-Type<br/>{state.fuelType}</Button>
                                    <Button style={{ height: "60px", width: "150px", marginLeft: "20px" }} variant="outline-success">Seat<br />{state.seats} </Button>
                                    <Button style={{ height: "60px", width: "150px", marginLeft: "20px" }} variant="outline-danger">Transmission<br />{state.transmissionType}</Button>
                                </div>
                                <div className='mx-auto d-flex'>
                                    <Button style={{ height: "60px", width: "150px",marginLeft:"20px" }} variant="outline-warning">Ac</Button>
                                    <Button style={{ height: "60px", width: "150px", marginLeft: "20px" }} variant="outline-danger">Seat <br /> </Button>
                                </div>

    
                            </>
                        </Col>

                        <Col xs={12} sm={12} md={6}>
                            <Form className='my-5'>
                                <h3 className='my-3'>Booking Details</h3>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Control type="email" placeholder="Enter email" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>

                                </Row>

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Control placeholder="1234 Main St" />
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Control placeholder="1234 Main St" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Control placeholder="Apartment, studio, or floor" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Control placeholder="Apartment, studio, or floor" />
                                </Form.Group>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Control />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Select defaultValue="Choose...">
                                            <option>Choose...</option>
                                            <option>...</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Control />
                                    </Form.Group>
                                </Row>

                                <Button className='my-3' variant="success" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>

                        <Col xs={12} sm={12} md={6}>
                            <Card>
                                <h3 className='my-5'>Payment Method</h3>
                                <Form className='my-5 mx-auto'>

                                    <Form.Group className="mb-3">
                                        <Col sm={12}>
                                            <Form.Check
                                                type="radio"
                                                label="first radio"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios1"
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="second radio"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios2"
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="third radio"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios3"
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Col sm={{ span: 10, offset: 2 }}>
                                            <Button type="submit">Sign in</Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default BookingDetails;
