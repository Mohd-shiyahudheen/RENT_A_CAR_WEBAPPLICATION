import React from 'react';
import { Container, Table } from 'react-bootstrap';
import AdminHeader from '../../components/AdminHeader/AdminHeader';

const BookedCars = () => {
  return (
      <>
          <AdminHeader />
          <div>
              <Container className='my-5'>
                  <Table striped bordered hover>
                      <thead>
                          <tr>
                              <th>#</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Username</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>1</td>
                              <td>Mark</td>
                              <td>Otto</td>
                              <td>@mdo</td>
                          </tr>
                          <tr>
                              <td>2</td>
                              <td>Jacob</td>
                              <td>Thornton</td>
                              <td>@fat</td>
                          </tr>

                      </tbody>
                  </Table>
              </Container>
          </div>
      </>
  );
}

export default BookedCars;
