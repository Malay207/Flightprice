import React, { useState } from 'react'

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch('https://flightprices-vt58.onrender.com/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })

        })
        const json = await response.json();
        localStorage.setItem('price', json.authToken);
        props.closemodal();
        window.location.reload();

    }
    return (
        <>
            < div className="container">
                <form >
                    <div className="form-floating mb-3">
                        <input type="text" name='name' className="form-control" id="floatingInput" placeholder="Enter your name" value={credentials.name} onChange={onChange} />
                        <label htmlFor="floatingInput">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" name='email' value={credentials.email} onChange={onChange} className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" name='password' value={credentials.password} onChange={onChange} className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating mt-3">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Confirm Password" name='cpassword' value={credentials.cpassword} onChange={onChange} />
                        <label htmlFor="floatingPassword">Confirm Password</label>
                    </div>

                    <button type="submit" className="btn btn-primary mt-3" onClick={onSubmit}>Sign Up</button>
                </form>
            </div>

        </>
    )
}

export default SignUp