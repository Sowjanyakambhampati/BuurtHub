import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import AddTopicPage from './pages/TopicPage'
import AllProductsPage from './pages/AllProductsPage'
import AllEventsPage from './pages/AllEventsPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AddProductPage from './pages/AddProductPage'
import Navbar from './components/Navbar'
import IsAnon from './components/IsAnon'
import IsPrivate from './components/IsPrivate'
import Footer from './components/Footer'
import CitySelection from './components/CitySelection';
import UserCityPage from './pages/UserCityPage'


function App() {

  return (
    <div className={`app light`}>
      <Navbar />

      <Routes>
        <Route path='/' element={<IsAnon><HomePage /></IsAnon>} />
        <Route path='/admin-dashboard' element={<IsPrivate><AdminDashboardPage /></IsPrivate>} />
        <Route path='/usercitypage/:city/add-product' element={<AddProductPage />} />
        <Route path='/login' element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path='/signup' element={<IsAnon><SignUpPage /></IsAnon>} />
        <Route path='/add-topic' element={<IsPrivate><AddTopicPage /></IsPrivate>} />
        <Route path='/all-events' element={<IsPrivate><AllEventsPage /></IsPrivate>} />
        <Route path='/all-products' element={<IsAnon><AllProductsPage /></IsAnon>} />
        <Route path='/city-selection' element={<CitySelection />} />
        <Route path='/usercitypage/:city' element={<UserCityPage />} /> 
        {/* <Route path='/add-product-listing' element={<AddProduct />} />   */}
        <Route path='*' element={<div>404 Page Not Found</div>} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App
