import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Errormessage from '../../Errormessage';
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate();
  const submitHandler = async (e) => {

    e.preventDefault()
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      };
      const { data } = await axios.post(
        "/user/login", {
        email,
        password
      },
        config
      )
      console.log(data);
      localStorage.setItem("userInfo",JSON.stringify(data))
      if (data) {
        navigate('/')
      }

    } catch (error) {
      setError(error.response.data.message)
    }
  }
  return (
    <>
      <div className='login col-sm-12'>
        <Container>
          <Row>
          </Row>
        </Container>
      <div className='loginContainer'>
          {error && <Errormessage varient='success'>{error}</Errormessage>}
          <Form className='mt-5' onSubmit={submitHandler}>
          <Container>
            <Card className='mx-auto bg-success' style={{ width: '22rem' }}>
              <h1 className='text-dark mx-auto my-3'>Login</h1>
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

              <div className=' mx-auto my-3'>

                New User? <Link to="/signup" className='text-light'>Register Here</Link>

              </div>
              <Button variant="dark" type="submit" className='mx-auto mb-4'>
                Submit
              </Button>
            </Card>
          </Container>

        </Form>


      </div>
      </div>

    </>
  );
}

export default Login;
