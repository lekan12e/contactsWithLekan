import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RemoveRedEye, VisibilityOff } from '@mui/icons-material';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUserName] = useState('');
    const [error, setError] = useState('');
    const [toggle, setToggle] = useState(false);
    const [message, setMessage] = useState('');
    
    // States to track password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        // Check if passwords match before proceeding
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch('https://5784-102-89-23-170.ngrok-free.app/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError('Account already exists.');
                setToggle(false);
            } else {
                setMessage('Account created successfully, proceed to log in.');
                handleToggle();
            }

        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again.');
            setToggle(false);
        }
    };

    const handleToggle = () => {
        setToggle(true);
    };

    // Toggles for password visibility
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <div className='flex flex-col items-center h-[100vh] bg-orange-200 w-full justify-center'>
            <div className='flex flex-col items-center justify-center py-40 px-20 rounded-lg shadow-xl font-mono text-xl gap-10 bg-lime-500'>
                <h2 className='text-4xl font-bold'>Register</h2>
                <div className='flex'>
                    <p className='text-xl text-red-500'>{error || message}<Link className={`${toggle ? "block" : "hidden"} text-white`} to='/'>here</Link></p>
                </div>

                {/* Form */}
                <form className={`flex flex-col items-center gap-4 ${toggle ? 'hidden' : 'block'}`} onSubmit={handleSubmit}>
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
                    <div className='flex items-center gap-2 justify-center w-full p-3 relative'>
                        <label>Password:</label>
                        <input
                            className='outline-none text-2xl px-3 py-1 rounded-lg w-full'
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span 
                            className='absolute right-3 cursor-pointer'
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <VisibilityOff /> : <RemoveRedEye />}
                        </span>
                    </div>
                    <div className='flex items-center gap-2 justify-center w-full p-3 relative'>
                        <label>Confirm Password:</label>
                        <input
                            className='outline-none text-2xl px-3 py-1 rounded-lg w-full'
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <span 
                            className='absolute right-3 cursor-pointer'
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {showConfirmPassword ? <VisibilityOff /> : <RemoveRedEye />}
                        </span>
                    </div>
                    <div className='flex items-center gap-2 justify-center w-full p-3'>
                        <label>Username:</label>
                        <input
                            className='outline-none text-2xl px-3 py-1 rounded-lg'
                            type="text"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <button className='text-xl mt-4 font-bold bg-blue-800 px-8 py-2 rounded-md text-white hover:bg-red-400 shadow-md' type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
