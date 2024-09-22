import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../utils/sidebar';

function Dashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [editForm, setEditForm] = useState(false);
    const [data, setData] = useState([]); 
    const [editContactId, setEditContactId] = useState(null); 
    const [editName, setEditName] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);  // For form submit spinner
    const [isDeleting, setIsDeleting] = useState(null);  // For delete button spinner
    const [isEditing, setIsEditing] = useState(null);  // For edit button spinner
    const navigate = useNavigate();
    const [userData, setUserData] = useState({})

    const checkAuth = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        try {
            const response = await fetch('https://sever-1-qnb2.onrender.com/api/contacts', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const result = await response.json();

            if (response.ok) {
                setIsAuthenticated(true);
                setData(result.contact || []); 
            } else {
                setIsAuthenticated(false);
                localStorage.removeItem('token'); 
            }
        } catch (error) {
            setError('Failed to validate session. Please log in again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Start form spinner
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://sever-1-qnb2.onrender.com/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ email, phone, name }),
            });

            if (response.ok) {
                await checkAuth(); 
                setEmail(''); setPhone(''); setName(''); 
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false); // Stop form spinner
        }
    };

    const handleEdit = async (e, _id) => {
        e.preventDefault();
        setIsEditing(_id); // Start edit spinner for this contact
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://sever-1-qnb2.onrender.com/api/contacts/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ email: editEmail, phone: editPhone, name: editName }),
            });

            if (response.ok) {
                await checkAuth(); 
                setEditForm(false); 
                setEditContactId(null); 
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsEditing(null); // Stop edit spinner
        }
    };
    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://sever-1-qnb2.onrender.com/api/user/current', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            // Check the entire response before extracting json
        console.log('Fetch userData response:', response);
            if (response.ok) {
                const result = await response.json();
                console.log('User Data:', result); // Check the structure of the result
                setUserData(result); // Assuming result contains the user data
            } else {
                console.log('Error fetching user data:', response.statusText);
            }
        } catch (error) {
            console.log('Fetch error:', error.message);
        }
      }

    const handleDelete = async (_id) => {
        setIsDeleting(_id); // Start delete spinner for this contact
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://sever-1-qnb2.onrender.com/api/contacts/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.ok) {
                await checkAuth(); 
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(null); // Stop delete spinner
        }
    };

    const handleToggleEdit = (contact) => {
        setEditForm(true);
        setEditContactId(contact._id); 
        setEditName(contact.name); 
        setEditPhone(contact.phone);
        setEditEmail(contact.email);
    };

    const handleLogOut = () =>  {
        localStorage.removeItem('token');
        navigate("/");
    };

    useEffect(() => {
        fetchUser();
    }, [])
    
    useEffect(() => {
        checkAuth(); 
    }, []);

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-20 h-20 border-4 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className='flex'>
            <Sidebar userData={userData} />
            <div className='flex overflow-hidden flex-col items-center justify-start p-10 bg-orange-200 h-full w-full'>
                <h1 className='text-4xl font-bold mb-4'>Dashboard</h1>
                <p>Create Contact</p>
                <form className='flex font-mono flex-col p-8 bg-slate-100 items-center justify-center rounded-lg shadow-xl' onSubmit={handleSubmit}>
                    <div className='flex items-center gap-2 justify-center w-full p-3'>
                        <label>Email:</label>
                        <input
                        className='outline-none px-3 py-1 rounded-lg'
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className='flex items-center gap-2 justify-center w-full p-3'>
                        <label>Phone:</label>
                        <input 
                        className='outline-none px-3 py-1 rounded-lg'
                            type="text" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className='flex items-center gap-2 justify-center w-full p-3'>
                        <label>Name:</label>
                        <input 
                        className='outline-none px-3 py-1 rounded-lg'
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </div>
                    <button className='text-xl font-bold bg-blue-800 px-8 py-2 rounded-md text-white hover:bg-red-400' type="submit">
                        {isSubmitting ? (
                            <div className="w-6 h-6 border-2 border-t-2 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            "Create"
                        )}
                    </button>
                </form>

                <div className={`flex flex-col gap-4 mt-10 px-24 py-10 rounded-xl font-mono text-xl text-neutral-600 shadow-xl bg-neutral-100 ${data.length === 0 ? 'hidden' : 'block'}`}>
                    {data.map((contact) => (
                        <div key={contact._id}>
                            {editContactId === contact._id ? (
                                <form className='flex font-mono flex-col p-8 bg-slate-100 items-center justify-center rounded-lg shadow-xl' onSubmit={(e) => handleEdit(e, contact._id)}>
                                    <div className='flex items-center gap-2 justify-center w-full p-3'>
                                        <label>Email:</label>
                                        <input
                                        className='outline-none px-3 py-1 rounded-lg'
                                            type="email" 
                                            value={editEmail} 
                                            onChange={(e) => setEditEmail(e.target.value)} 
                                            required 
                                        />
                                    </div>
                                    <div className='flex items-center gap-2 justify-center w-full p-3'>
                                        <label>Phone:</label>
                                        <input 
                                        className='outline-none px-3 py-1 rounded-lg'
                                            type="text" 
                                            value={editPhone} 
                                            onChange={(e) => setEditPhone(e.target.value)} 
                                            required 
                                        />
                                    </div>
                                    <div className='flex items-center gap-2 justify-center w-full p-3'>
                                        <label>Name:</label>
                                        <input 
                                        className='outline-none px-3 py-1 rounded-lg'
                                            type="text" 
                                            value={editName} 
                                            onChange={(e) => setEditName(e.target.value)} 
                                            required 
                                        />
                                    </div>
                                    <button className='text-xl font-bold bg-blue-800 px-8 py-2 rounded-md text-white hover:bg-red-400' type="submit">
                                        {isEditing === contact._id ? (
                                            <div className="w-6 h-6 border-2 border-t-2 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            "Update"
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <div className="flex flex-col gap-2 items-center justify-between w-full">
                                    <p>{contact.name}</p> <p>{contact.phone}</p>  <p>{contact.email}</p>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleToggleEdit(contact)} className='bg-yellow-500 text-white px-4 py-2 rounded-lg'>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(contact._id)}
                                            className='bg-red-500 text-white px-4 py-2 rounded-lg'>
                                            {isDeleting === contact._id ? (
                                                <div className="w-6 h-6 border-2 border-t-2 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                "Delete"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <button className='text-xl mt-8 font-bold bg-blue-800 px-8 py-2 rounded-md text-white hover:bg-red-400' style={{ textTransform: "uppercase" }} onClick={handleLogOut}>logout</button>
            </div>
        </div>
    );
}

export default Dashboard;
