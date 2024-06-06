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
import NavBar from './components/Navbar'
import IsAnon from './components/IsAnon'
import IsPrivate from './components/IsPrivate'
import Footer from './components/Footer'

function App() {

  return (
    <div className={`app light`}>
      <h1>Welcome to the Netherlands Community Forum</h1>
      

      <NavBar />

      <Routes>
        <Route path='/' element={<IsAnon> <HomePage /> </IsAnon>} />
        <Route path='/admin-dashboard' element={<IsPrivate> <AdminDashboardPage /> </IsPrivate>} />
        <Route path='/add-product' element={<IsPrivate> <AddProductPage /> </IsPrivate>} />
        <Route path='/login' element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path='/signup' element={<IsAnon><SignUpPage /></IsAnon>} />
        <Route path='/add-topic' element={<IsPrivate> <AddTopicPage /> </IsPrivate>} />
        <Route path='/all-events' element={<IsPrivate> <AllEventsPage /> </IsPrivate>} />
        <Route path='/products' element={<IsPrivate> <AllProductsPage /> </IsPrivate>} />
        {/* <Route path='/products/:productId' element={<IsPrivate> <ProductDetailsPage /> </IsPrivate>} /> */}
        <Route path='*' element={<div> 404 Page Not Found </div>} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App
