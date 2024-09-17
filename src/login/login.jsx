import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(''); // Clear any previous errors

        try {
            const response = await fetch('http://localhost:5001/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) { // If login is successful
                console.log("Login successful", data.accessToken);
                localStorage.setItem('token', data.accessToken);
                navigate("/dashboard");
            } else {
                // If login fails, show an error message
                setError('Wrong email or password entered. Please try again.');
            }

        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className='flex flex-col items-center h-[100vh] bg-orange-200 w-full justify-center'>
            <div className='flex flex-col items-center justify-center py-40 px-20 rounded-lg shadow-xl font-mono text-xl gap-10 bg-lime-500'>
                <h2 className='text-4xl font-bold'>Login</h2>

                {/* Display the error message above the form if it exists */}
                {error && (
                    <p className="text-red-600 font-bold">{error}</p>
                )}

                <form className='flex flex-col items-center gap-4' onSubmit={handleSubmit}>
                    <div className='flex items-center gap-2 justify-center w-full p-3'>
                        <label>Email:</label>
                        <input
                            className='outline-none text-2xl px-3 py-1 rounded-lg'
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className='flex items-center gap-2 justify-center w-full p-3'>
                        <label>Password:</label>
                        <input
                            className='outline-none text-2xl px-3 py-1 rounded-lg' 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button className='text-xl mt-4 font-bold bg-blue-800 px-8 py-2 rounded-md text-white hover:bg-red-400 shadow-md' type="submit">
                        Login
                    </button>
                </form>
                <div>
                    <p>
                        Don't have an account? Create here <Link className='text-white font-bold bg-slate-500 rounded-md p-2 hover:bg-red-400 hover:text-green-300' to='/signup'>Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
