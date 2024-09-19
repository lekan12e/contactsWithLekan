import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RemoveRedEye, VisibilityOff } from '@mui/icons-material';
import loginLogo from '../assets/login-logo.png';
import companyLogo from '../assets/company-logo.png';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(''); // Clear any previous errors

        try {
            const response = await fetch('https://sever-1-qnb2.onrender.com/api/user/login', {
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
            setError(`${error}`);
        }
    };

    return (
        <div className='relative flex flex-col sm:flex-row items-center justify-center h-screen w-full'>
            {/* Image container */}
            <div className='absolute inset-0 sm:relative sm:h-full sm:w-[50%] flex items-center justify-center bg-[#FBFAF9] shadow-md'>
                <img
                    className='h-[200px] w-[200px] sm:h-[510px] sm:w-[886px] object-cover z-0'
                    src={loginLogo}
                    alt="login logo"
                />
            </div>

            {/* Form container */}
            <div className='relative sm:w-[50%] z-10 flex items-center justify-center'>
                <div className='flex flex-col items-center justify-center w-full px-8 sm:px-16 md:px-52 font-sans text-xl gap-10'>
                    <div className='flex flex-col gap-7 w-full'>
                        <div className='flex justify-start items-start'>
                            <img className='w-[180px] h-[80px] sm:w-[286px] sm:h-[128px]' src={companyLogo} alt="company logo" />
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='text-3xl sm:text-4xl font-bold'>Welcome Back</h2>
                            <p className='text-[#989898] text-xl sm:text-2xl leading-8 sm:leading-10'>Welcome back! Please enter your details.</p>
                        </div>
                        {error && (
                            <p className="text-red-600 font-bold">{error}</p>
                        )}

                        <form className='flex flex-col pr-8 items-center gap-4' onSubmit={handleSubmit}>
                            <div className='flex flex-col items-start gap-2 justify-center w-full'>
                                <label>Email</label>
                                <input
                                    className='outline-none text-xl sm:text-2xl px-4 sm:px-5 bg-[#EDEDED] py-4 sm:py-6 rounded w-full'
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className='flex flex-col items-start gap-2 justify-center w-full relative'>
                                <label>Password:</label>
                                <input
                                    className='outline-none text-xl sm:text-2xl px-4 sm:px-5 bg-[#EDEDED] py-4 sm:py-6 rounded w-full'
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span 
                                    className='absolute right-4 top-14 cursor-pointer'
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <VisibilityOff sx={{width : '22px', height: '22px'}} /> : <RemoveRedEye sx={{width : '22px', height: '22px'}} />}
                                </span>
                            </div>
                            <button className='text-xl sm:text-2xl mt-4 font-bold bg-black w-full py-3 rounded-md text-white hover:bg-red-400 shadow-md' type="submit">
                                Login
                            </button>
                        </form>
                        <div className='pt-10 text-end'>
                            <p>
                                Don't have an account? Create here <Link className='text-white font-bold bg-slate-500 rounded-md p-2 hover:bg-red-400 hover:text-green-300' to='/signup'>Sign Up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
