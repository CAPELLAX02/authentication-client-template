import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import './SetPasswordPage.css'

export default function SetPasswordPage() {
    const navigate = useNavigate()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const storedUsername = localStorage.getItem('username')
        if (!storedUsername)
            navigate('/register')
        else
            setUsername(storedUsername)
    }, [navigate])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (password !== confirm) {
            setError('Passwords do not match.')
            setLoading(false)
            return
        }

        try {
            await axios.put('http://localhost:8888/auth/password', { username, password })
            navigate('/login')
        }
        catch (err: any) {
            const msg = err.response?.data?.message || 'Failed to set password.'
            setError(msg)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="register-container">
            {loading && <LoadingSpinner />}
            <h1>Set your password</h1>
            <p className="register-subtitle">Choose a secure password</p>
            <form onSubmit={handleSubmit} className="register-form">
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Next →</button>
            </form>
        </div>
    )
}