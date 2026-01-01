import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ setView }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/users/register', { name, email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            alert("Registration Successful!");
            window.location.reload(); // Refresh to update login state
        } catch (err) {
            alert(err.response.data.message || "Registration Failed");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ddd' }}>
            <h2>Create Account</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
                <button type="submit" style={{ width: '100%', background: '#f0c14b', padding: '10px' }}>Register</button>
            </form>
            <p onClick={() => setView('login')} style={{ color: 'blue', cursor: 'pointer' }}>Already have an account? Sign in</p>
        </div>
    );
};

export default Register;