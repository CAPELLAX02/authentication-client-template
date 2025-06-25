import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import './LoginPage.css'

type LoginRequest = {
  email: string
  password: string
}

export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const payload: LoginRequest = { email, password }

        try {
            const response = await axios.post('http://localhost:8888/auth/login', payload)

            const { accessToken, refreshToken } = response.data.data
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)

            navigate('/home')
        }
        catch (err: any) {
            const msg = err.response?.data?.message || 'Login failed.'
            setError(msg)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
        {loading && <LoadingSpinner />}
        <h1>Welcome back</h1>
        <p className="login-subtitle">Log in to your account</p>
        <form onSubmit={handleSubmit} className="login-form">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <div className="error-message">{error}</div>}
            <button type="submit">Log In →</button>
        </form>
        <p className="redirect-register">
            Don’t have an account? <Link to="/register">Sign up</Link>
        </p>
        </div>
    )
}