import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader/AdminHeader";

const EditCars = () => {
    const [state, setState] = useState({
        carModel: "",
        transmissionType: "",
        fuelType: "",
        seats: "",
        securityDeposite: "",
        extraFare: "",
        picture: "",
        farePlan: [
            {
                plan1: "",
                km1: "",
                fare1: "",
            },
            {
                plan2: "",
                km2: "",
                fare2: "",
            },
            {
                plan3: "",
                km3: "",
                fare3: "",
            },
        ],
    });

    let { carId } = useParams();
    const editCars = async (carId) => {
        const updateCars = await axios.get(`/admin/editCar/${carId}`);
        setState(updateCars.data);
    };

    const handleChange = (e) => {
        console.log(e.target.value);
        setState({ ...state, [e.target.name]: e.target.value });
    };
    const CarEdit = async (e) => {
        e.preventDefault();
        const postEditCars = async (carId, state) => {
            const editedData = await axios.put(`/admin/postEditCar/${carId}`);
            console.log(editedData);
            setState(editedData)
        };
    };

    useEffect(() => {
        editCars(carId);
    }, []);

    return (
        <>
            <AdminHeader />
            <div>
                <Container>
                    <Card className="my-5 bg-warning text-dark">
                        <h3 className="text-dark my-3">Edit Car</h3>
                        <Form className="mx-auto" onSubmit={CarEdit}>
                            <Row className="mb-3">
                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Control
                                        placeholder="Car Model"
                                        value={state.carModel}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Control
                                        placeholder="Transmission Type"
                                        value={state.transmissionType}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Control
                                        placeholder="Fuel Type"
                                        value={state.fuelType}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Control
                                        placeholder="Seats"
                                        value={state.seats}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Control
                                        type="number"
                                        placeholder="Security Deposite"
                                        value={state.securityDeposite}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Extra Fare"
                                        value={state.extraFare}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Control
                                        type="file"
                                        placeholder="picture"
                                        onChange={(e) => setState(e.target.files[0])}
                                    />
                                    <img
                                        src={state.image}
                                        alt=""
                                        style={{ width: "100px", height: "50px" }}
                                    />
                                </Form.Group>
                            </Row>
                            <h6 className="my-3">Rental Plans and Fare</h6>

                            {state.farePlan.map((plan) => (
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Plan-1"
                                            value={plan.plan}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Km"
                                            value={plan.km}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Fare"
                                            value={plan.fare}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Row>
                            ))}
                            <Button className="my-3" variant="success" type="submit">
                                Save
                            </Button>
                        </Form>
                    </Card>
                </Container>
            </div>
        </>
    );
};

export default EditCars;
