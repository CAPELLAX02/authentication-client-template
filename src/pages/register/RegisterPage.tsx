import './RegisterPage.css'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

type StartRegistrationRequest = {
    firstName: string,
    lastName: string,
    email: string,
    dateOfBirth: string
}

export default function RegisterPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState<StartRegistrationRequest>({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
    })
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        try {
            // const response = await axios.post('/api/auth/register', form)
            // const username = response.data.data.username
            // localStorage.setItem('username', username)
            navigate('/register/phone')
        }
        catch (err: any) {
            const msg = err.response?.data?.message || 'Something went wrong.'
            setError(msg)
        }
    }

    return (
    <div className="register-container">
        <h1>Create your account</h1>
        <p className="register-subtitle">Begin your registration in a few simple steps</p>
        <form onSubmit={handleSubmit} className="register-form">
            <input name="firstName" placeholder="First Name" onChange={handleChange} required />
            <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
            <input name="dateOfBirth" type="date" onChange={handleChange} required />
            {error && <div className="error-message">{error}</div>}
            <button type="submit">Next →</button>
        </form>
        <p className="redirect-login">
            Already have an account? <Link to="/login">Sign in</Link>
        </p>
    </div>
    )
}
