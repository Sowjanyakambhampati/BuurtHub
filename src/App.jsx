import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TopicPage from './pages/TopicPage';
import AllProductsPage from './pages/AllProductsPage';
import AllEventsPage from './pages/AllEventsPage';
import Dashboard from './pages/Dashboard';
import AddProductPage from './pages/AddProductPage';
import Navbar from './components/Navbar';
import IsAnon from './components/IsAnon';
import Footer from './components/Footer';
import CitySelection from './components/CitySelection';
import UserCityPage from './pages/UserCityPage';
import PostsPage from './pages/PostsPage';
import AddItem from './pages/AddItem';
import AboutUs from './pages/AboutUs';
import { CityProvider } from './context/CityContext';

function App() {
  return (
    <CityProvider> 
      <div className={`app light`}>
        <Navbar />

        <Routes>
          <Route path='/' element={<IsAnon><HomePage /></IsAnon>} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/usercitypage/:city/add-product' element={<AddProductPage />} />
          <Route path='/login' element={<IsAnon><LoginPage /></IsAnon>} />
          <Route path='/signup' element={<IsAnon><SignUpPage /></IsAnon>} />
          <Route path='/topics/city/:city' element={<TopicPage />} />
          <Route path='/all-events/city/:city' element={<AllEventsPage />} />
          <Route path='/all-products/city/:city' element={<AllProductsPage />} />
          <Route path='/city-selection' element={<CitySelection />} />
          <Route path='/usercitypage/:city' element={<UserCityPage />} />
          <Route path='/manage-user' element={<AddItem />} />
          <Route path='/posts/city/:city' element={<PostsPage />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='*' element={<div>404 Page Not Found</div>} />
        </Routes>
        
        <Footer />
      </div>
    </CityProvider>
  );
}

export default App;
