import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import './RegisterPage.css'

type StartRegistrationRequest = {
    firstName: string,
    lastName: string,
    email: string,
    dateOfBirth: string
}

export default function RegisterPage() {
    const [loading, setLoading] = useState(false)
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
        setLoading(true)

        try {
            const formattedForm: StartRegistrationRequest = {
                ...form,
                dateOfBirth: new Date(form.dateOfBirth).toISOString().split('T')[0]
            }
            console.log(formattedForm)
            const response = await axios.post('http://localhost:8888/auth/register', formattedForm, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const username = response.data.data.username
            localStorage.setItem('username', username)
            await axios.post('http://localhost:8888/auth/email/verification/send', {
                username
            })
            navigate('/register/email-verification')
        }
        catch (err: any) {
            const msg = err.response?.data?.message || 'Something went wrong.'
            setError(msg)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="register-container">
            {loading && <LoadingSpinner />}
            <h1>Create your account</h1>
            <p className="register-subtitle">Begin your registration in a few simple steps</p>
            <form onSubmit={handleSubmit} className="register-form">
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
                <input type="date" name="dateOfBirth" onChange={handleChange} required />
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Next →</button>
            </form>
            <p className="redirect-login">
                Already have an account? <Link to="/login">Sign in</Link>
            </p>
        </div>
    )
}
