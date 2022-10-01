import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import './Cars.css'

const Cars = () => {
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
            <div>
                <div className='my-5 mx-auto'>
                    <Container>
                        <div className='my-5'>
                            <h3 className='text-primary'>New Models</h3>
                        </div>
                        <Row>
                            {cars.map(cars => (
                                <Col xs={12} md={3}>
                                    <Card className="mx-auto" style={{ width: "16rem" }}>
                                        <Card.Img style={{ height: "200px" }}
                                            variant="top"
                                            src={cars.image}
                                        />
                                        <ListGroup className="list-group-flush d-flex">
                                            <ListGroup.Item>
                                                <Card.Title>{cars.carModel}</Card.Title>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="d-flex">
                                                <Button style={{ height: "60px", width: "70px" }} variant="outline-primary">Fuel<br />{cars.fuelType}</Button>
                                                <Button style={{ height: "60px", width: "70px", marginLeft: "10px" }} variant="outline-success">Seat <br /> {cars.seats} </Button>
                                                <Button style={{ height: "60px", width: "70px", marginLeft: "10px" }} variant="outline-danger">Day/<br />{cars.dayRent}</Button>

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
            </div>
        </>
    )
}

export default Cars