import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, FloatingLabel, Form,Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import './Blog.css'

const Blog = () => {
    const [userName, setUserName] = useState('');
    const [blog, setBlog] = useState('');
    const [picture, setPicture] = useState('');
    const [state, setState] = useState([]);

    const user = JSON.parse(localStorage.getItem('userInfo'))
    console.log(user);
    const userId = user._id || user.data._id
    console.log(userId);

    const navigate = useNavigate()

    const submitBlog=async(e)=>{
        e.preventDefault()
        try {
            const blogData = new FormData();
            blogData.append("userName",userName);
            blogData.append("blog",blog);
            blogData.append("picture",picture)
            blogData.append("userId",userId)

            axios.post('/admin/postBlog',blogData).then(res=>{
                console.log(res);
                if (res) {
                    // localStorage.setItem("blogData",JSON.stringify(res))
                    navigate('/blog')
                }
            }).catch(err=> console.log(err))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        axios.get("/admin//blogData").then(res=>{
            console.log(res);
            setState(res.data)
        }).catch(err=> console.log(err))
    }, []);

    const inputImage = (e) => {
        setPicture(e.target.files[0])
    }

    return (
        <>
            <Header />
            <div>
                <Container>
                    <h3 className='my-3 m-0 p-0'>User-Experiance / Feedback</h3>
                    <Row className='my-3'>
                        {state.map((state)=>(
                            <Col xs={12} sm={12} md={4}>
                                <div>
                                    <img style={{ height: '300px' }} src={state.picture} class="img-fluid" alt="Responsive image"></img>
                                </div>
                                <div className='my-3'>
                                    <div>
                                        <h4 className='text-primary'>
                                            {state.userName}
                                        </h4>
                                    </div>
                                    <div>
                                        <p>
                                            {state.blog}
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        ))}
                        
                    </Row>
                    <div className='me-auto'>
                        <h5 className='text-primary'>Here You Can Share Your own Experiance</h5>
                    </div>
                    <div className='my-5'>
                        <Form onSubmit={submitBlog}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Control type="text" placeholder="Enter your name" 
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Control type="file" placeholder="choose picture"
                                    onChange={inputImage}

                                     />
                                </Form.Group>
                            </Row>

                            <FloatingLabel controlId="floatingTextarea2" label="Type somthing"
                                type='text'
                                value={blog}
                                onChange={(e) => setBlog(e.target.value)}
                            >
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    style={{ height: '100px' }}
                                />
                            </FloatingLabel>

                            <Button className='my-3' variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>

                </Container>
            </div>
            <Footer />
        </>
    )
}

export default Blog