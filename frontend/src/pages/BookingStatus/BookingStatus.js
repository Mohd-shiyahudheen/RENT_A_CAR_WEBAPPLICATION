import React from 'react';
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
import Header from '../../components/Header/Header';
import axios from 'axios';
// import Footer from '../../components/Footer/Footer';


const BookingStatus = () => {
    
 
    const bookigStatus = JSON.parse(localStorage.getItem("BookingData"))
    const data = bookigStatus.data

    const cancellBooking = async (bookingId)=>{
        await axios.put(`/user/cancelled/${bookingId}`).then(res=>{
            if(res){
                localStorage.setItem("BookingData", JSON.stringify(res));
            }
        }).catch(err=>console.log(err))
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
            <Header />
            <div>
                <h3 className='text-primary my-5'>Booking Status</h3>
                <Container className='my-3'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align='center'>Picture</StyledTableCell>
                                    <StyledTableCell align='center'>Booking Id</StyledTableCell>
                                    <StyledTableCell align="center">Car-Model</StyledTableCell>
                                    <StyledTableCell align="center">Seat</StyledTableCell>
                                    <StyledTableCell align="center">Fuel Type</StyledTableCell>
                                    <StyledTableCell align="center">From</StyledTableCell>
                                    <StyledTableCell align="center">To</StyledTableCell>
                                    <StyledTableCell align="center">Booking Status</StyledTableCell>
                                    <StyledTableCell align="center">Cancelled</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                    <StyledTableCell align="center">
                                        <img style={{ width: "60px", height: "60px" }} src={data.carId.image} />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{data._id}</StyledTableCell>
                                    <StyledTableCell align="center">{data.carId.carModel}</StyledTableCell>
                                    <StyledTableCell align="center">{data.carId.seats}</StyledTableCell>
                                    <StyledTableCell align="center">{data.carId.fuelType}</StyledTableCell>
                                    <StyledTableCell align="center">{data.from}</StyledTableCell>
                                    <StyledTableCell align="center">{data.to}</StyledTableCell>
                                    <StyledTableCell align="center">{data.bookingStatus}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button variant="outlined" color="error" className='my-2'
                                            onClick={() => { cancellBooking(data._id) }}
                                        >Cancell</Button>
                                    </StyledTableCell>
                                </StyledTableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default BookingStatus;
