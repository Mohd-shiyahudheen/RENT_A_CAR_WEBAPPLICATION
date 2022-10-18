import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'

const Header = () => {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("userInfo"))

  
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className='nav_1' variant="dark">
        <Container>
          <Navbar.Brand href="#home"><span><img style={{ width: '40px', height: '40px', backgroundColor: 'blue' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEzXtWMNd0oNBmQuXmizjkimf5vonZF6ikbO_I_FHFBT7R96sbT0O2u7Z4_NaRzX5WZc&usqp=CAU" alt="" /></span> 
          <Link to='/'></Link> RENT-A-CAR</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            {user ?
              <Nav className="mx-auto">
                <Nav.Link href="#features"><Link to='/' style={{ textDecoration: 'none', color: '#fff' }}>Home</Link></Nav.Link>
                <Nav.Link href="#pricing"><Link to='/cars' style={{ textDecoration: 'none', color: '#fff' }}>Cars</Link></Nav.Link>
                <Nav.Link href="#pricing"><Link to='/blog' style={{ textDecoration: 'none', color: '#fff' }}>Blog</Link></Nav.Link>
                <Nav.Link href="#pricing"><Link to='/about' style={{ textDecoration: 'none', color: '#fff' }}>About</Link></Nav.Link>
              </Nav>
              :
              <>
                <Nav className="mx-auto">
                </Nav>
              </>
            }
            {user ?
                <Nav>
                <Nav.Link style={{ textDecoration: 'none', color: '#fff' }}>{user.name || user.data.name}</Nav.Link>
                <Nav.Link 
                  onClick={() => {
                    localStorage.removeItem("userInfo");
                    navigate('/login')
                  }}
                >
                <Link to='/login' style={{ textDecoration: 'none', color: '#fff' }}>Logout</Link>
                </Nav.Link>
                </Nav>
              :
              <Nav>
                <Nav.Link href="#deets"> <Link to='/login' style={{ textDecoration: 'none', color: '#fff' }}>Login</Link></Nav.Link>
                <Nav.Link className='text-light' eventKey={2} href="#memes"><Link to='/signup' style={{ textDecoration: 'none', color: '#fff' }}>Signup</Link></Nav.Link>
              </Nav>
            }
          </Navbar.Collapse> 
        </Container>
      </Navbar>


    </div>

  )
}

export default Header