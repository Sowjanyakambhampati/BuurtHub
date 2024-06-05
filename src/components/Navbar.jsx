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
}

export default NavBar