import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './BookingDetails.css'
import { useDispatch, useSelector } from 'react-redux';
import { booking } from '../../redux/authSlice';

const BookingDetails = () => {
    //Data Storing  States//
    const [state, setState] = useState({});

    //form data state//
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [adhaarNo, setAdhaarNo] = useState("");
    const [licenceNo, setLiceneceNo] = useState("");
    const [picupDate, setPicupDate] = useState("");
    const [dropoutDate, setDropoutDate] = useState("");

    const dispatch = useDispatch()
    const { data, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    useEffect(() => {

    }, [data, isError, isSuccess, isLoading, message, navigate, dispatch]);


    const navigate = useNavigate()
    const {carId} = useParams()

    const userDatas = JSON.parse(localStorage.getItem('userInfo'))
    const userId = userDatas.data._id

    const SubmitBookingData = async (e) => {
        e.preventDefault()
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };
            const { Bookingdata } = await axios.post(
                "/user/bookingData", {
                from,
                to,
                adhaarNo,
                licenceNo,
                picupDate,
                dropoutDate,
                carId,
                userId
            },
                config
            ).then(res=>{
                if (res) {
                    dispatch(booking(res))
                    navigate('/payment')
                }
            }).catch(err=>console.log(err));
            
        } catch (error) {
            console.log(error)
        }

    }

    const BookCar = async (carId)=>{
        const BookingDt = await axios.get(`/user/booking/${carId}`)
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
                                <Button  className='my-2' style={{ height: "60px", width: "300px", marginLeft: "20px" }} variant="outline-dark"><h3>{state.carModel}</h3></Button>
                                <div className='mx- my-3 d-flex'>
                                    <Button style={{ height: "60px", width: "150px", marginLeft: "20px" }} variant="outline-primary">Fuel-Type<br/>{state.fuelType}</Button>
                                    <Button style={{ height: "60px", width: "150px", marginLeft: "20px" }} variant="outline-success">Seat<br />{state.seats} </Button>
                                    <Button style={{ height: "60px", width: "150px", marginLeft: "20px" }} variant="outline-danger">Transmission<br />{state.transmissionType}</Button>
                                </div>
                                <div className='mx-auto d-flex'>
                                    <Button style={{ height: "60px", width: "150px",marginLeft:"20px" }} variant="outline-warning">Ac</Button>
                                    <Button style={{ height: "60px", width: "150px", marginLeft: "20px" }} variant="outline-danger">Day/{state.dayRent}<br /> </Button>
                                </div>
                            </>
                        </Col>
                        <Col xs={12} sm={12} md={6}>
                            <Form className='my-3' onSubmit={SubmitBookingData}>
                                <h3 className='my-3'>Booking Details</h3>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Control type="text" placeholder="From Address" 
                                        value={from}
                                        onChange={(e)=>setFrom(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Control type="text" placeholder="To Address"
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                         />
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Control placeholder="Adhaar No" type='number'
                                        value={adhaarNo}
                                        onChange={(e) => setAdhaarNo(e.target.value)}
                                    />
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Control placeholder="Licence No" type='number'
                                        value={licenceNo}
                                        onChange={(e) => setLiceneceNo(e.target.value)}
                                     />
                                </Form.Group>
                                
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Control type='date' placeholder='Picup Date'
                                            value={picupDate}
                                            onChange={(e) => setPicupDate(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Control type='date' placeholder='Dropout Date'
                                            value={dropoutDate}
                                            onChange={(e) => setDropoutDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Button className='my-3' variant="success" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default BookingDetails;
