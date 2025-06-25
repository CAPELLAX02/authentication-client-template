import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import './SetPhonePage.css'

export default function SetPhonePage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
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
      await axios.put('http://localhost:8888/auth/phone', { username, phoneNumber })
      navigate('/register/password')
    }
    catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to set phone number.'
      setError(msg)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-container">
      {loading && <LoadingSpinner />}
      <h1>Add your phone number</h1>
      <p className="register-subtitle">This will be used for recovery and 2FA</p>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Next →</button>
      </form>
      <p className="redirect-login">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  )
}
