import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container } from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  
  const BookingData = JSON.parse(localStorage.getItem('BookingData'))
  const data = BookingData.data
  console.log(data);

  const navigate = useNavigate()


  const initPayment = (resData) => {
    const options = {
      key: "rzp_test_f7sa5NWzF3hQsL",
      amount: resData.amount,
      currency: resData.currency,
      name: data.carId.carModel,
      description: "Test Transaction",
      image: data.carId.image,
      order_id: resData.id,
      handler: async (response) => {
        console.log(response);
        try {
          const { resdata } = await axios.post("/user/verifyPayment",response).then(res=>{
            console.log(res);
            if (res) {
              navigate('/bookingStatus')
            }
          })
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  //Razorpay Payment//
  const handlePayment = async()=>{
    try {
      const dayRent =data.carId.dayRent
      const {paymentData}  = await axios.post('/user/razorpay',{amount:dayRent}).then(res=>{
        console.log(res.data.data);
        initPayment(res.data.data);
      })    
    } catch (error) {
      console.log(error)
    }
  }

 
//table//
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
      <>
        <Box className='my-5' sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={8}>
                <Container className='my-5'>
                  <TableContainer>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align='center'>Car</StyledTableCell>
                          <StyledTableCell align="center">From</StyledTableCell>
                          <StyledTableCell align="center">To</StyledTableCell>
                          <StyledTableCell align="center">Booked Date</StyledTableCell>
                          <StyledTableCell align="center">Return Date</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          <StyledTableRow>
                          <StyledTableCell align="center">
                            <img style={{ width: "60px", height: "60px" }} src={data.carId.image} />
                          </StyledTableCell>
                          <StyledTableCell align="center">{data.from}</StyledTableCell> 
                          <StyledTableCell align="center">{data.to}</StyledTableCell>
                          <StyledTableCell align="center">{data.picupDate}</StyledTableCell>
                          <StyledTableCell align="center">{data.dropoutDate}</StyledTableCell>
                          </StyledTableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Container>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200"
                      src={data.carId.image}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {data.carId.carModel}
                      </Typography>
                      <Typography className='d-flex' variant="body2" color="text.secondary">
                        <Button style={{ height: "40px", width: "90px", marginLeft: "15px" }}  variant="outlined" color="info">
                          {data.carId.fuelType}
                        </Button>
                        <Button style={{ height: "40px", width: "90px", marginLeft: "10px" }} variant="outlined" color="success">
                          {data.carId.seats}
                        </Button>
                        <Button style={{ height: "40px", width: "90px", marginLeft: "10px" }} variant="outlined" color="error">
                          {data.carId.transmissionType}
                        </Button>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                  <Button onClick={handlePayment} className='mx-auto' color="success" variant="contained">₹{data.carId.dayRent}
                    {/* <Link className='text-light' to={`/razorpay/${data._id}`} style={{ textDecoration: 'none' }}> ₹{data.carId.dayRent}</Link> */}
                    </Button>
                  </CardActions>
                </Card>
            </Grid>
          </Grid>
        </Box>
      </>
      <Footer/>
    </>
  )
}

export default Payment