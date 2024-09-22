import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RemoveRedEye, VisibilityOff } from '@mui/icons-material';
import signupLogo from '../assets/login-logo.png';  // Reusing login logo for signup
import companyLogo from '../assets/company-logo.png';  // Same company logo as in login

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [image, setImage] = useState(''); // For storing image URL
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // States to track password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const maxWidth = 500; // Max width for the compressed image
                    const scaleSize = maxWidth / img.width;
                    canvas.width = maxWidth;
                    canvas.height = img.height * scaleSize;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    // Convert the resized canvas to base64
                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // 70% quality
                    resolve(compressedBase64);
                };
            };

            reader.onerror = (error) => {
                reject(error);
            };
        });
    };


    // Handle image upload and convert it to a base64 URL
    const handleImageUpload = async (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const compressedImageUrl = await compressImage(file); // Compress the image
            setImage(compressedImageUrl); // Set the compressed base64 URL
        }
    };
console.log(image)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true); // Start the loader

        // Check if passwords match before proceeding
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false); // Stop loader if error
            return;
        }

        try {
            const response = await fetch('https://sever-1-qnb2.onrender.com/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    firstName,
                    lastName,
                    image // Send the image base64 URL
                }),
            });

            const data = await response.json();
            console.log(data);
            console.log(error.message)

            if (!response.ok) {
                setError('Account already exists.');
            } else {
                setMessage('Account created successfully, proceed to log in.');
            }

        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false); // Stop the loader after response
        }
    };

    // Toggles for password visibility
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <div className='flex flex-col md:flex-row items-center h-[100vh] w-full'>
            {/* Logo section - appears behind form on small devices */}
            <div className='hidden md:flex h-full w-[50%] bg-[#FBFAF9] shadow-md items-center justify-center'>
                <div className='w-[886px] h-[510px]'>
                    <img className='w-full h-full' src={signupLogo} alt="signup logo" />
                </div>
            </div>

            {/* Signup form section */}
            <div className='relative w-full md:w-[50%] flex items-center justify-center bg-white'>
                {/* Mobile responsive background logo */}
                <div className='absolute md:hidden w-full h-full inset-0 z-0'>
                    <img src={signupLogo} alt="signup logo" className='w-full h-full object-cover opacity-10' />
                </div>

                <div className='relative z-10 flex flex-col items-center justify-center w-full px-8 md:px-52 font-sans text-xl gap-10'>
                    <div className='flex flex-col gap-7 w-full'>
                        <div className='flex justify-start items-start'>
                            <img className='w-[286px] h-[128px]' src={companyLogo} alt="company logo" />
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='text-4xl font-bold'>Create Account</h2>
                            <p className='text-[#989898] text-2xl leading-10'>Sign up to get started.</p>
                        </div>
                        {error && (
                            <p className="text-red-600 font-bold">{error}</p>
                        )}
                        {message && (
                            <p className="text-green-600 font-bold">{message}</p>
                        )}

                        <form className='flex flex-col pr-8 items-center gap-4' onSubmit={handleSubmit}>
                            <div className='flex flex-col items-start gap-2 justify-center w-full'>
                                <label>Username</label>
                                <input
                                    className='outline-none text-2xl px-5 bg-[#EDEDED] py-6 rounded w-full'
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='flex flex-col items-start gap-2 justify-center w-full'>
                                <label>Email</label>
                                <input
                                    className='outline-none text-2xl px-5 bg-[#EDEDED] py-6 rounded w-full'
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* First Name and Last Name fields inline */}
                            <div className='flex justify-between gap-4 w-full'>
                                <div className='flex flex-col items-start gap-2 w-[50%]'>
                                    <label>First Name</label>
                                    <input
                                        className='outline-none text-2xl px-5 bg-[#EDEDED] py-6 rounded w-full'
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col items-start gap-2 w-[50%]'>
                                    <label>Last Name</label>
                                    <input
                                        className='outline-none text-2xl px-5 bg-[#EDEDED] py-6 rounded w-full'
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className='flex flex-col items-start gap-2 justify-center w-full'>
                                <label>Profile Picture</label>
                                <input
                                    className='outline-none text-2xl px-5 py-6 rounded w-full'
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    required
                                />
                            </div>

                            <div className='flex flex-col items-start gap-2 justify-center w-full relative'>
                                <label>Password</label>
                                <input
                                    className='outline-none text-2xl px-5 bg-[#EDEDED] py-6 rounded w-full'
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span 
                                    className='absolute right-5 top-14 cursor-pointer'
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <VisibilityOff sx={{width : '22px', height: '22px'}} /> : <RemoveRedEye sx={{width : '22px', height: '22px'}} />}
                                </span>
                            </div>
                            <div className='flex flex-col items-start gap-2 justify-center w-full relative'>
                                <label>Confirm Password</label>
                                <input
                                    className='outline-none text-2xl px-5 bg-[#EDEDED] py-6 rounded w-full'
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <span 
                                    className='absolute right-5 top-14 cursor-pointer'
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {showConfirmPassword ? <VisibilityOff sx={{width : '22px', height: '22px'}} /> : <RemoveRedEye sx={{width : '22px', height: '22px'}} />}
                                </span>
                            </div>
                            <button className='text-2xl mt-4 font-bold bg-black w-full py-3 rounded-md text-white hover:bg-red-400 shadow-md flex justify-center items-center' type="submit">
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>
                        <p className='text-[#989898] text-xl text-center'>
                            Already have an account? <Link className='font-semibold text-black' to="/">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
