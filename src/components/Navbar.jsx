/*
import React, { useContext } from 'react'
import { AuthContext } from './../context/auth.context'
import { Link } from 'react-router-dom'

function NavBar() {

    const {
        isLoggedIn,
        user,
        logOutUser
    } = useContext(AuthContext);

    return (
        <nav>
            <div className='left'>

                <Link to={`/`}>Dashboard</Link>
                {/* <button onClick={logOutUser}>Log Out</button> 


                <Link to={`/login`}>Login</Link>
                <Link to={`/signup`}>Sign Up</Link>


            </div>
            <div className='right'>
                {isLoggedIn && <h3>Hello, {user.name}</h3>}
            </div>
        </nav>
    )
}

export default NavBar


/*
return (
        <nav>
            <div className='left'>
                {isLoggedIn ? <>
                    <Link to={`/`}>Dashboard</Link>
                    <button onClick={logOutUser}>Log Out</button>
                </>
                    :
                    <>
                        <Link to={`/login`}>Login</Link>
                        <Link to={`/signup`}>Sign Up</Link>
                    </>
                }
            </div>
            <div className='right'>
                {isLoggedIn && <h3>Hello, {user.name}</h3>}
            </div>
        </nav>
    )
*/

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './../context/auth.context';
import '../Navbar.css';

function NavBar() {
  const {
    isLoggedIn,
    user,
    logOutUser
  } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/"> {/* Link to the home page */}
          <img src="/logo.png" alt="Logo" />
        </Link>
      </div>
    
      <div className="navbar-buttons">
        {isLoggedIn ? (
          <>
            <Link to={`/`}>Dashboard</Link>
            <button onClick={logOutUser} className="navbar-button">Log Out</button>
            <h3>Hello, {user.name}</h3>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-button">Login</Link>
            <Link to="/signup" className="navbar-button">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
