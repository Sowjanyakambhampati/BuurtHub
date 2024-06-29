import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AllTopicPage from './pages/AllTopicPage';
import AllProductsPage from './pages/AllProductsPage';
import AllEventsPage from './pages/AllEventsPage';
import Dashboard from './pages/Dashboard';
import AddProductPage from './pages/AddProductPage';
import AddEventPage from './pages/AddEventPage';
import AddPostPage from './pages/AddPostPage';
import AddTopicPage from './pages/AddTopicPage';
import Navbar from './components/Navbar';
import IsAnon from './components/IsAnon';
import Footer from './components/Footer';
import CitySelection from './components/CitySelection';
import UserCityPage from './pages/UserCityPage';
import AllPostsPage from './pages/AllPostsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AboutUs from './pages/AboutUs';
import {CityProvider} from './context/CityContext';

import './App.css'
import {useState, useEffect} from 'react'
import {supabase} from './supabaseClient'


function App() {


    const [session, setSession] = useState(supabase.auth.getSession());

    useEffect(() => {
        const {data: authListener} = supabase.auth.onAuthStateChange(
            async () => setSession(supabase.auth.getSession())
        );
        return () => {
            authListener.unsubscribe();
        };
    }, []);
    return (
        <CityProvider>
            {!session ? <LoginPage/> :
                <div className={`app light`}>
                    <Navbar/>
                    <Routes>
                        <Route path='/' element={<IsAnon><HomePage/></IsAnon>}/>
                        <Route path='/dashboard' element={<Dashboard/>}/>
                        <Route path='/city/:city/add-product' element={<AddProductPage/>}/>
                        <Route path='/city/:city/add-event' element={<AddEventPage/>}/>
                        <Route path='/city/:city/add-post' element={<AddPostPage/>}/>
                        <Route path='/city/:city/add-topic' element={<AddTopicPage/>}/>
                        <Route path='/login' element={<IsAnon><LoginPage/></IsAnon>}/>
                        <Route path='/signup' element={<IsAnon><SignUpPage/></IsAnon>}/>
                        <Route path='/topics/city/:city' element={<AllTopicPage/>}/>
                        <Route path='/all-events/city/:city' element={<AllEventsPage/>}/>
                        <Route path='/all-events/city/:city/event/:eventId' element={<EventDetailsPage/>}/>
                        <Route path='/all-products/city/:city/product/:productId' element={<ProductDetailsPage/>}/>
                        <Route path='/all-products/city/:city' element={<AllProductsPage/>}/>
                        <Route path='/city-selection' element={<CitySelection/>}/>
                        <Route path='/city/:city' element={<UserCityPage/>}/>
                        <Route path='/all-posts/city/:city' element={<AllPostsPage/>}/>
                        <Route path='/about' element={<AboutUs/>}/>
                        <Route path='*' element={<div>404 Page Not Found 😞</div>}/>
                    </Routes>
                    <Footer/>
                </div>
            }
        </CityProvider>
    );
}

export default App;
