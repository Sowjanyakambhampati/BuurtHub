import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../Navbar.css';
import {supabase} from '../supabaseClient';

function NavBar() {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const session = supabase.auth.getSession();

        if (session && session.user) {
            console.log('session', session.user);
            setUser(session.user);
            fetchUserName(session.user.id);
        }

        supabase.auth.onAuthStateChange((_event, session) => {
            if (session && session.user) {
                setUser(session.user);
                fetchUserName(session.user.id);
            } else {
                setUser(null);
                setUserName('');
            }
        });
    }, []);

    const fetchUserName = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('name')
                .eq('id', userId)
                .single();
            console.log("data::", data);

            if (error) throw error;
            setUserName(data.name);
        } catch (error) {
            console.error('Error fetching user name:', error.message);
        }
    };

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
                        <p>Welcome,{userName} {user.email}</p>
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
