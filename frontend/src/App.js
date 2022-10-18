import React  from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Register/Signup';
import About from './pages/About/About';
import Cars from './pages/Cars/Cars';
import Blog from './pages/Blog/Blog';
import AdminHome from './Admin/AdminHome/AdminHome';
import BookingDetails from './pages/BookingDetails/BookingDetails';
import AdminLogin from './Admin/AdminLogin/AdminLogin';
import AddCar from './Admin/AddCars/AddCar';
import ViewCars from './Admin/ViewCars/ViewCars';
import EditCars from './Admin/EditCars/EditCars';
import BookedCars from './Admin/BookedCars/BookedCars';
import CancelledBooking from './Admin/CancelledBooking/CancelledBooking';
import UserManagement from './Admin/UserManagement/UserManagement';
import ManageBlog from './Admin/ManageBlog/ManageBlog';
import Payment from './pages/Payment/Payment';
import BookingStatus from './pages/BookingStatus/BookingStatus';



function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/cars' element={<Cars/>}></Route>
          <Route path='/blog' element={<Blog/>}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/booking/:carId' element={<BookingDetails/>}></Route>
          <Route path='/payment' element={<Payment/>}></Route>
          <Route path='/bookingStatus' element={<BookingStatus/>}></Route>



          <Route path='/adminHome' element={<AdminHome/>}></Route>
          <Route path='/admin' element={<AdminLogin />}></Route>
          <Route path='/addcar' element={<AddCar/>}></Route>
          <Route path='/viewcars' element={<ViewCars />}></Route>
          <Route path='/editcar/:carId' element={<EditCars />}></Route>
          <Route path='/bookedcars' element={<BookedCars />}></Route>
          <Route path='/cancelledbooking' element={<CancelledBooking />}></Route>
          <Route path='/viewUser' element={<UserManagement />}></Route>
          <Route path='/viewBlog' element={<ManageBlog />}></Route>
          </Routes>
        </main>
      </Router>
     
     
    </div>
  );
}

export default App;
