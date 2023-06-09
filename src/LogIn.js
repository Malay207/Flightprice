import React, { useState } from 'react'

const LogIn = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleclick = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;
        const response = await fetch('https://flightpriceserver.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json();
        localStorage.setItem('price', json.authToken);
        props.closemodal();
    }
    return (
        <div>
            <form method='POST' >
                <div className="form-floating mb-3">
                    <input type="email" name='email' value={credentials.email} onChange={onChange} className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" name='password' value={credentials.password} onChange={onChange} className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button type="submit" className="btn btn-primary mt-3" onClick={handleclick}>Submit</button>
            </form>
        </div>
    )
}

export default LogIn