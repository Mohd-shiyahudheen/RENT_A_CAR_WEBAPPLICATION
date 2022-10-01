import axios from 'axios';
import React, { useEffect } from 'react';
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
import { useDispatch } from 'react-redux';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import { display } from '../../redux/authSlice';

const UserManagement = () => {

    const dispatch = useDispatch();

    const displayUser = async () => {
        const viewUser = await axios.get('/admin/findUser')
        console.log(viewUser);

        if (viewUser) {
            dispatch(display(viewUser))
        }
    }

    useEffect(() => {
        displayUser();
    }, []);

    const userInfo = JSON.parse(localStorage.getItem('Users'))
    console.log(userInfo);
    const userDetails = userInfo.data
    console.log(userDetails);


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
        <AdminHeader/>
            <div>
                <Container className='my-5'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align='center'>No</StyledTableCell>
                                    <StyledTableCell align="center">Name</StyledTableCell>
                                    <StyledTableCell align="center">Email</StyledTableCell>
                                    <StyledTableCell align="center">Phone</StyledTableCell>
                                    <StyledTableCell align="center">Status</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userDetails.map((userDetails, index) => (
                                    <StyledTableRow>
                                        <StyledTableCell align="center">{index + 1}</StyledTableCell>
                                        <StyledTableCell align="center">{userDetails.name}</StyledTableCell>
                                        <StyledTableCell align="center">{userDetails.email}</StyledTableCell>
                                        <StyledTableCell align="center">{userDetails.phone}</StyledTableCell>
                                        <Button variant="outlined" color="success" className='my-2'>Block</Button>
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

export default UserManagement;
