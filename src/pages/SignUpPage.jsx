import React, {useState} from 'react';
import {supabase} from '../supabaseClient';
import {useNavigate} from 'react-router-dom';

function SignUpPage() {
    // States for registration
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

    // Handling the name change
    const handleName = (e) => {
        setFullName(e.target.value);
        setSubmitted(false);
    };

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the confirm password change
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            setError(true);
            setPasswordError(false);
        } else if (password !== confirmPassword) {
            setPasswordError(true);
            setError(false);
        } else {
            setSubmitted(true);
            setError(false);
            setPasswordError(false);
        }
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="text-green-500 mb-4"
                style={{
                    display: submitted ? "" : "none",
                }}
            >
                <h1>User {name} successfully registered!!</h1>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="text-red-500 mb-4"
                style={{
                    display: error ? "" : "none",
                }}
            >
                <h3>Please enter all the fields</h3>
            </div>
        );
    };

    // Showing password error message if passwords do not match
    const passwordErrorMessage = () => {
        return (
            <div
                className="text-red-500 mb-4"
                style={{
                    display: passwordError ? "" : "none",
                }}
            >
                <h3>Passwords do not match</h3>
            </div>
        );
    };


    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        const {data, error} = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    fullName,
                    avatar: "",
                },
            },
        });

        if (error) {
            setError(error.message);
        } else {
            console.log('User:', data.user);
            navigate('/login');
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
                    <h1 className="text-2xl font-bold mb-4 text-center">Sign Up Here</h1>
                </div>

                {/* Calling to the methods */}
                <div className="messages">
                    {errorMessage()}
                    {passwordErrorMessage()}
                    {successMessage()}
                </div>

                <form onSubmit={handleSignUp}>
                    {/* Labels and inputs for form data */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            onChange={handleName}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={fullName}
                            type="text"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            onChange={handleEmail}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={email}
                            type="email"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Password (min 8 characters)</label>
                        <input
                            onChange={handlePassword}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={password}
                            type="password"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            onChange={handleConfirmPassword}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={confirmPassword}
                            type="password"
                        />
                    </div>

                    <button
                        // onClick={handleSubmit}
                        className="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;