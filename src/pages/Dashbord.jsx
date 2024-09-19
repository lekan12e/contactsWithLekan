import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [editForm, setEditForm] = useState(false);
    const [data, setData] = useState([]); // Initialize as an empty array
    const [editContactId, setEditContactId] = useState(null); // Track the contact being edited
    const [editName, setEditName] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const navigate = useNavigate();

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
                setData(result.contact || []); // Set data or an empty array if undefined
            } else {
                setIsAuthenticated(false);
                localStorage.removeItem('token'); // Clear invalid token
            }
        } catch (error) {
            setError('Failed to validate session. Please log in again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                await checkAuth(); // Refresh data after successfully creating a contact
                setEmail(''); setPhone(''); setName(''); // Reset form fields after submission
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = async (e, _id) => {
        e.preventDefault();
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
                await checkAuth(); // Refresh data after successfully editing a contact
                setEditForm(false); // Hide edit form
                setEditContactId(null); // Clear edit contact ID
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggleEdit = (contact) => {
        setEditForm(true);
        setEditContactId(contact._id); // Set the contact ID being edited
        setEditName(contact.name); // Populate the form fields with existing data
        setEditPhone(contact.phone);
        setEditEmail(contact.email);
    };

    const handleLogOut = () =>  {
        localStorage.removeItem('token');
        navigate("/");
    };

    const handleDelete = async (_id) => {
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
                await checkAuth(); // Refresh data after successfully deleting a contact
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        checkAuth(); // Initial data fetch
    }, []);

    if (!isAuthenticated) {
        return <p>loading......</p>;
    }

    return (
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
                <button className='text-xl font-bold bg-blue-800 px-8 py-2 rounded-md text-white hover:bg-red-400' type="submit">Create</button>
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
                                <button className='text-xl font-bold bg-blue-800 px-8 py-2 rounded-md text-white hover:bg-red-400' type="submit">Update</button>
                            </form>
                        ) : (
                            <div className='flex gap-1 flex-col items-start justify-center'>
                                <p>Name: {contact.name}</p>
                                <p>Phone: {contact.phone}</p>
                                <p>Email: {contact.email}</p>
                                <div className='flex justify-between gap-16'>
                                    <button className='text-xl font-bold bg-blue-800 px-8 py-2 rounded-md text-white hover:bg-red-400 shadow-md hover:shadow-red-400 shadow-blue-500' type="button" onClick={() => handleDelete(contact._id)}>Delete</button>
                                    <button className='text-xl font-bold bg-blue-800 px-8 py-2 rounded-md text-white hover:bg-red-400 shadow-md hover:shadow-red-400 shadow-blue-500' type="button" onClick={() => handleToggleEdit(contact)}>Edit</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button className='text-xl mt-8 font-bold bg-blue-800 px-8 py-2 rounded-md text-white hover:bg-red-400' style={{ textTransform: "uppercase" }} onClick={handleLogOut}>logout</button>
        </div>
    );
}

export default Dashboard;
