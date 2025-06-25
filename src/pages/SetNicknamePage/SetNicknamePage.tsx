import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import './SetNicknamePage.css'

export default function SetNicknamePage() {
    const navigate = useNavigate()
    const [nickname, setNickname] = useState<string>('')
    const [username, setUsername] = useState<string>('')
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

        try {
            await axios.put(`http://localhost:8888/users/me/nickname`, { username, nickname })
            navigate('/login')
        }
        catch (err: any) {
            const msg = err.response?.data?.message || 'Nickname setup failed.'
            setError(msg)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="register-container">
            {loading && <LoadingSpinner />}
            <h1>Choose your nickname</h1>
            <p className="register-subtitle">Visible to others as your display name</p>
            <form onSubmit={handleSubmit} className="register-form">
                <input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                />
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Finish →</button>
            </form>
        </div>
    )
}
