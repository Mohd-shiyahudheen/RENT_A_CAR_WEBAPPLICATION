import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import Errormessage from "../../Errormessage";
import Loading from "../../Loading";
import OTPInput, { ResendOTP } from "otp-input-react";
import GoogleLogin from "react-google-login";
import {useSelector,useDispatch} from 'react-redux'
import { register,reset } from "../../redux/authSlice";
// import {toast} from 'react-toastify'



const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(false);
  const [OTP, setOTP] = useState("");



  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isLoading, isError, isSuccess,message} = useSelector((state)=>state.auth)
  useEffect(() => {
   
  }, [user, isError, isSuccess, isLoading, message, navigate, dispatch]);

  // form submition
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email);
    if (password !== confirmpassword) {
      setMessages("password not match");
    } else {
      setMessages(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        setLoading(true);

        const data = await axios.post(
          "/user/signup",
          { name, email, phone, password},
          config
        );
        setLoading(false);
        
        if (data) {
          console.log(data);
          // dispatch(register(data))
          setOtp(true);
        }
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    }
  };

  //Otp verification//
  const handlesubmit = async (e) => {
    console.log(OTP);
    console.log(phone);

    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const userDetails = await axios.post(
        "/user/otp",
        {
          otp: OTP,
          name: name,
          email: email,
          phone: phone,
          password: password
        },
        config
      );
      console.log(userDetails);
      if (userDetails) {
        dispatch(register(userDetails))
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  //user popup closer error solver//
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "564495729125-0tlktng4v8c1078o58ed1j3his1khmmu.apps.googleusercontent.com",
      plugin_name: "rent",
    });
  });

  // window.gapi.load('client:auth2', () => {
  //   window.gapi.client.init({
  //     clientId: '564495729125-0tlktng4v8c1078o58ed1j3his1khmmu.apps.googleusercontent.com',
  //     plugin_name: "chat"
  //   })
  // })

  
 //Google signup//
  const googleSuccess = async(googleData) => {
    console.log(googleData);

    try {
      const res = await axios({
        method: 'post',
        url:'/user/google',
        data:{
          token:googleData.tokenId
        }
      })
      console.log(res);
      if(res){
        dispatch(register(res))
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Authentication failed try again later");
  };
  return (
    <>
      <div className="register col-sm-12">
        <Container>
          <Row></Row>
        </Container>
        <div className="signupContainer">
          {error && <Errormessage varient="danger">{error}</Errormessage>}
          {messages && <Errormessage variant="danger">{messages}</Errormessage>}
          {loading && <Loading></Loading>}
          <Card style={{ width: "18rem" }} className="mt-5 mx-auto bg-primary">
            <Card.Body>
              {otp === false && (
                <Card.Title className="my-4">Register</Card.Title>
              )}
              {otp === false && (
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter Number"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      value={confirmpassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="ConfirmPassword"
                    />
                  </Form.Group>
                  <div className=" mx-auto my-4">
                    All redy have an account?{" "}
                    <Link to="/login" className="text-light">
                      Login
                    </Link>
                  </div>
                  <Button variant="success" type="submit">
                    Submit
                  </Button>
                </Form>
              )}

              {/* Login With Google */}
             {otp===false && <GoogleLogin
                className="my-3"
                clientId="564495729125-0tlktng4v8c1078o58ed1j3his1khmmu.apps.googleusercontent.com"
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              />}

              {/* OTP Verification  */}
              {otp && (
                <Form className="mx-auto" onSubmit={handlesubmit}>
                  <h3 className="text-dark mx-auto">Enter Your OTP</h3>
                  <div className="otppp my-3 ">
                    <OTPInput
                      value={OTP}
                      onChange={setOTP}
                      autoFocus
                      OTPLength={4}
                      otpType="number"
                      disabled={false}
                      secure
                    />
                  </div>
                  <div className="mx-auto bg-light" style={{ width: "120px" }}>
                    <ResendOTP
                      onResendClick={() => console.log("Resend clicked")}
                    />
                  </div>

                  <button type="submit" className="btn btn-danger my-4">
                    Confirm
                  </button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Signup;
