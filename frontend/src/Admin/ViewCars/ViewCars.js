import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader/AdminHeader';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';

const ViewCars = () => {
    const [cars,setCars]=useState([])
    
  
    useEffect(() => {
        axios.get("/admin/findcars").then(res => {
            console.log(res)
           setCars(res.data)
        }).catch(err => console.log(err));
    }, []);

    const deleteCars = async(carId)=>{
        try {
            const response = await axios.delete(`/admin/deleteCar/${carId}`)
            console.log(response);
            if (response) {
                axios.get("/admin/findcars").then(res => {
                    console.log(res)
                    setCars(res.data)
                }).catch(err => console.log(err));
            }
            
        } catch (error) {
            console.log(error);  
        }
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <>
            <AdminHeader />
            <div>
                <Container className='my-5'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align='center'>No</StyledTableCell>
                                    <StyledTableCell align="center">Car Model</StyledTableCell>
                                    <StyledTableCell align="center">Transmission Type</StyledTableCell>
                                    <StyledTableCell align="center">Fule Type</StyledTableCell>
                                    <StyledTableCell align="center">Picture</StyledTableCell>
                                    <StyledTableCell align="center">Delete</StyledTableCell>
                                    <StyledTableCell align="center">Edit</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cars.map((cars, index) => (
                                    <StyledTableRow>
                                        <StyledTableCell align="center">{index + 1}</StyledTableCell>
                                        <StyledTableCell align="center">{cars.carModel}</StyledTableCell>
                                        <StyledTableCell align="center">{cars.transmissionType}</StyledTableCell>
                                        <StyledTableCell align="center">{cars.fuelType}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <img style={{ width: "60px", height: "60px" }}  src={cars.image} />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button variant="outlined" color="error" className='my-2' onClick={() => { deleteCars(cars._id) }}>Delete</Button>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button variant="outlined" color="success" className='my-2'><Link className='text-success' to={`/editcar/${cars._id}`} style={{ textDecoration: 'none' }}>Edit</Link></Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </div>
        </>
    );
}

export default ViewCars;
