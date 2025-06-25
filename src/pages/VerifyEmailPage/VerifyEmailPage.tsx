import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import './VerifyEmailPage.css'

type CompleteEmailVerificationRequest = {
  username: string
  verificationCode: string
}

export default function VerifyEmailPage() {
    const navigate = useNavigate()
    const [username, setUsername] = useState<string>("")
    const [verificationCode, setVerificationCode] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const [info, setInfo] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const storedUsername = localStorage.getItem("username")
        if (!storedUsername) {
            navigate("/register")
        } else {
            setUsername(storedUsername)
        }
    }, [navigate])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setInfo(null)

        try {
            const payload: CompleteEmailVerificationRequest = {
                username,
                verificationCode
            }
            await axios.put("http://localhost:8888/auth/verify", payload)
            navigate("/register/phone")
        }
        catch (err: any) {
            const msg = err.response?.data?.message || "Email verification failed."
            setError(msg)
        }
        finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        try {
            setLoading(true)
            setError(null)
            await axios.put("http://localhost:8888/auth/email/verification/resend")
            setInfo("A new code has been sent to your email.")
        }
        catch (err: any) {
            const msg = err.response?.data?.message || "Email verification failed."
            setError(msg)
        }
        finally {
            setLoading(false)
        }
    } 

    return (
        <div className="register-container">
        {loading && <LoadingSpinner />}
        <h1>Verify your email</h1>
        <p className="register-subtitle">Check your inbox and enter the code</p>
        <form onSubmit={handleSubmit} className="register-form">
            <input
            type="text"
            name="verificationCode"
            placeholder="Enter code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
            />
            {error && <div className="error-message">{error}</div>}
            {info && <div className="info-message">{info}</div>}
            <button type="submit">Verify →</button>
        </form>
        <button onClick={handleResend} className="resend-button">Resend Code</button>
        <p className="redirect-login">
            Already have an account? <Link to="/login">Sign in</Link>
        </p>
        </div>
    )
}