import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import TopicPage from './pages/TopicPage'
import AllProductsPage from './pages/AllProductsPage'
import AllEventsPage from './pages/AllEventsPage'
import Dashboard from './pages/Dashboard'
import AddProductPage from './pages/AddProductPage'
import Navbar from './components/Navbar'
import IsAnon from './components/IsAnon'
import Footer from './components/Footer'
import CitySelection from './components/CitySelection';
import UserCityPage from './pages/UserCityPage';
import PostsPage from './pages/PostsPage';
import AddItem from './pages/AddItem';
import AboutUs from './pages/AboutUs';



function App() {

  return (
    <div className={`app light`}>
      <Navbar />

      <Routes>
        <Route path='/' element={<IsAnon><HomePage /></IsAnon>} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/usercitypage/:city/add-product' element={<AddProductPage />} />
        <Route path='/login' element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path='/signup' element={<IsAnon><SignUpPage /></IsAnon>} />
        <Route path='/topic' element={<TopicPage />} />
        <Route path='/all-events' element={<AllEventsPage />} />
        <Route path='/all-products' element={<IsAnon><AllProductsPage /></IsAnon>} />
        <Route path='/city-selection' element={<CitySelection />} />
        <Route path='/usercitypage/:city' element={<UserCityPage />} />
        <Route path='/manage-user' element={<AddItem />} />
        <Route path='/posts' element={<PostsPage />} />
        <Route path='/about' element={<AboutUs/>} />  
        <Route path='*' element={<div>404 Page Not Found</div>} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App
