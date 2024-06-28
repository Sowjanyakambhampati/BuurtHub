import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../Navbar.css';
import {supabase} from '../supabaseClient';

function NavBar() {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const session = supabase.auth.getSession();

        const userData = supabase.auth.getUser();


        if (session && session.user) {
            setUser(session.user);
            setUserName(session.user.user_metadata.fullName);

            console.log("Session:: " + session);
        }
        if(userData && userData.user){

            console.log("USER ID:: " + userData.user.fullName);
        }

        supabase.auth.onAuthStateChange((_event, session) => {
            if (session && session.user) {
                setUser(session.user);
                setUserName(session.user.user_metadata.fullName);
            } else {
                setUser(null);
                setUserName('');
            }
        });
    }, []);


    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src="/logo.png" alt="Logo"/>
                </Link>
            </div>

            <div className="navbar-buttons">
                {user ? (
                    <>
                        <p>Welcome,{userName}</p>
                        <Link to="/login" onClick={() => supabase.auth.signOut()}
                              className="navbar-button">Logout</Link>
                        {/*<button onClick={() => supabase.auth.signOut()}>Logout</button>*/}
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
