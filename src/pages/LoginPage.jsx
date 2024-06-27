import React, {useState} from 'react';
import {supabase} from '../supabaseClient';
import {useNavigate} from 'react-router-dom';

function LogInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const {data, error} = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            navigate('/dashboard');
            console.log('User:', data.user);
            console.log('Session:', data.session);
        }

        setLoading(false);
    };

    return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div className="flex justify-center mb-4">
                <img src="/logo.png" alt="Logo" className="h-16 w-auto"/>
            </div>
            <div>
                <h1 className="text-2xl font-bold mb-4 text-center">Log In Here</h1>
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
                {/* Labels and inputs for form data */}
                <div className="flex flex-col">
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        value={email}
                        type="email"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        value={password}
                        type="password"
                    />
                </div>

                <button
                    className="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    type="submit">
                    Submit
                </button>
            </form>
        </div>
    </div>


)
    ;
}

export default LogInPage;
