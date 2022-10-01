import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import Errormessage from '../../Errormessage';
import './AddCar.css'
import { useSelector, useDispatch } from 'react-redux';
import { addCar,reset } from '../../redux/authSlice';


const AddCar = () => {
    const [carModel, setCarModel] = useState("");
    const [transmissionType, setTransmissionType] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [seats, setSeats] = useState("");
    const [dayRent, setdayRent] = useState("");
    const [extraFare, setExtraFare] = useState("");
    const [picture, setPicture] = useState(null);
    const [plan1, setPlan1] = useState("");
    const [plan2, setPlan2] = useState("");
    const [plan3, setPlan3] = useState("");
    const [km1, setKm1] = useState("");
    const [km2, setKm2] = useState("");
    const [km3, setKm3] = useState("");
    const [fare1, setFare1] = useState("");
    const [fare2, setFare2] = useState("");
    const [fare3, setFare3] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { car, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    useEffect(() => {

    }, [car, isLoading, isError, isSuccess, message, navigate, dispatch]);



    const submitData = async (e) => {
        e.preventDefault()

        try {
            const carData = new FormData();

            carData.append("carModel", carModel);
            carData.append("image", picture);
            carData.append("transmissionType", transmissionType);
            carData.append("fuelType", fuelType);
            carData.append("seats", seats);
            carData.append("dayRent", dayRent);
            carData.append("extraFare", extraFare);
            carData.append("plan1", plan1);
            carData.append("plan2", plan2);
            carData.append("plan3", plan3);
            carData.append("km1", km1);
            carData.append("km2", km2);
            carData.append("km3", km3);
            carData.append("fare1", fare1);
            carData.append("fare2", fare2);
            carData.append("fare3", fare3);

            axios.post("/admin/addCar", carData).then(res => {
                console.log(res)
                dispatch(addCar(res))
            }).catch(err => console.log(err));

            if (carData) {
                navigate('/viewcars')
            }

        } catch (error) {
            setError(error.response.data.message)

        }
    }
    const inputImage = (e) => {
        setPicture(e.target.files[0])
    }
    return (
        <>
            <AdminHeader />
            <div>
                {error && <Errormessage varient="danger">{error}</Errormessage>}

                <Container>
                    <Card className='my-5 bg-success text-dark'>
                        <h3 className='text-dark my-3'>Add Cars</h3>
                        <Form className='mx-auto' onSubmit={submitData} encType="multipart/form-data">
                            <Row className="mb-3">

                                <Form.Group className="mb-3">
                                    <Form.Control placeholder="Car Model"
                                        type='text'
                                        value={carModel}
                                        onChange={(e) => setCarModel(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Control placeholder="Transmission Type"
                                        type='text'
                                        value={transmissionType}
                                        onChange={(e) => setTransmissionType(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Control placeholder="Fuel Type"
                                        type='text'

                                        value={fuelType}
                                        onChange={(e) => setFuelType(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Control placeholder="Seats"
                                        type='number'
                                        value={seats}
                                        onChange={(e) => setSeats(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} >
                                    <Form.Control type='number' placeholder='DayRent'
                                        value={dayRent}
                                        onChange={(e) => setdayRent(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Control type='number' placeholder='Extra Fare'
                                        value={extraFare}
                                        onChange={(e) => setExtraFare(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Control type='file' placeholder='picture' name='image'
                                        onChange={inputImage}

                                    />
                                </Form.Group>
                            </Row>
                            <h6 className='my-3'>Rental Plans and Fare</h6>

                            <Row className='mb-3'>

                                <Form.Group as={Col} >
                                    <Form.Control type="number" placeholder="Plan-1"
                                        value={plan1}
                                        onChange={(e) => setPlan1(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Control type="number" placeholder="Enter Km"
                                        value={km1}
                                        onChange={(e) => setKm1(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Control type="number" placeholder="Enter Fare"
                                        value={fare1}
                                        onChange={(e) => setFare1(e.target.value)}
                                    />
                                </Form.Group>

                            </Row>

                            <Row className='mb-3'>

                                <Form.Group as={Col} >
                                    <Form.Control type="number" placeholder="Plan-2"
                                        value={plan2}
                                        onChange={(e) => setPlan2(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Control type="number" placeholder="Enter Km"
                                        value={km2}
                                        onChange={(e) => setKm2(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Control type="number" placeholder="Enter Fare"
                                        value={fare2}
                                        onChange={(e) => setFare2(e.target.value)}
                                    />
                                </Form.Group>

                            </Row>

                            <Row className='mb-3'>

                                <Form.Group as={Col} >
                                    <Form.Control type="number" placeholder="Plan-3"
                                        value={plan3}
                                        onChange={(e) => setPlan3(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Control type="text" placeholder="Enter Km"
                                        value={km3}
                                        onChange={(e) => setKm3(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Control type="number" placeholder="Enter Fare"
                                        value={fare3}
                                        onChange={(e) => setFare3(e.target.value)}
                                    />
                                </Form.Group>

                            </Row>

                            <Button className='my-3' variant="dark" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card>
                </Container>

            </div>
        </>

    );
}

export default AddCar;
