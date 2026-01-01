import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setView }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            alert("Login Successful!");
            window.location.reload();
        } catch (err) {
            alert(err.response.data.message || "Login Failed");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ddd' }}>
            <h2>Sign-In</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
                <button type="submit" style={{ width: '100%', background: '#f0c14b', padding: '10px' }}>Sign-In</button>
            </form>
            <p onClick={() => setView('register')} style={{ color: 'blue', cursor: 'pointer' }}>New customer? Start here.</p>
        </div>
    );
};

export default Login;