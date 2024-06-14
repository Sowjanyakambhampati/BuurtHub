import React, { useState } from 'react';

function LogInPage() {
    // States for login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // States for checking the errors 
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

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

    // Handling the form submission 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
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
                <h1>User successfully logged in!!</h1>
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

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold mb-4 text-center">Log In Here</h1>
                </div>

                {/* Calling to the methods */}
                <div className="messages">
                    {errorMessage()}
                    {successMessage()}
                </div>

                <form className="space-y-4">
                    {/* Labels and inputs for form data */}
                    <div className="flex flex-col">
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            onChange={handleEmail}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={email}
                            type="email"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            onChange={handlePassword}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={password}
                            type="password"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
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

export default LogInPage;
