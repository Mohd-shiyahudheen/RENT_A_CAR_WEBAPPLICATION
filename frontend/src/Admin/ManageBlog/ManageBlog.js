import React, { useEffect, useState } from 'react'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import axios from 'axios';


const ManageBlog = () => {

    const [state, setState] = useState([]);

    useEffect(() => {
        axios.get("/admin//blogData").then(res => {
            console.log(res);
            setState(res.data)
        }).catch(err => console.log(err))
    }, []);

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
                                  <StyledTableCell>Index</StyledTableCell>
                                  <StyledTableCell align="center">User Name</StyledTableCell>
                                  <StyledTableCell align="center">Blog</StyledTableCell>
                                  <StyledTableCell align="center">Picture</StyledTableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                            {state.map((state,index)=>(
                                <StyledTableRow>
                                    <StyledTableCell align="center">{index+1}</StyledTableCell>
                                    <StyledTableCell align="center">{state.userName}</StyledTableCell>
                                    <StyledTableCell align="center">{state.blog}</StyledTableCell>
                                    <img style={{ width: "60px", height: "60px" }} src={state.picture} />
                                </StyledTableRow> 
                            ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
              </Container>
    </div>
    </>
  )
}

export default ManageBlog