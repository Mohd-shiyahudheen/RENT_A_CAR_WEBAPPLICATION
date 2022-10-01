import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Errormessage from '../../Errormessage';

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const navigate = useNavigate()


  const submitHandler = async (e) => {

    e.preventDefault()
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      };
      const { data } = await axios.post(
        "/admin/adminLogin", {
        email,
        password
      },
        config
      )
      console.log(data);
      localStorage.setItem("adminInfo",JSON.stringify(data))
      if (data) {
        navigate('/adminHome')
      }

    } catch (error) {
      setError(error.response.data.message)
    }
  }


  return (
    <div>
      <Container>
        {error && <Errormessage varient='success'>{error}</Errormessage>}
        <Form className='mt-5' onSubmit={submitHandler}>
          <Card className='mx-auto bg-success ' style={{ width: '22rem' }}>
            <h1 className='text-dark mx-auto my-3'> Admin-Login</h1>
            <Form.Group className="mt-4" controlId="formBasicEmail">

              <Form.Control type="email" className='mx-auto' style={{ width: '17rem' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="my-4" controlId="formBasicPassword">

              <Form.Control type="password" className='mx-auto' style={{ width: '17rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" />
            </Form.Group>


            <Button variant="dark" type="submit" className='mx-auto mb-4'>
              Submit
            </Button>
          </Card>

        </Form>
      </Container>

    </div>
  );
}

export default AdminLogin;
