import { createBrowserRouter } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import SetPhonePage from '../pages/SetPhonePage/SetPhonePage'
import VerifyEmailPage from '../pages/VerifyEmailPage/VerifyEmailPage'
import SetPasswordPage from '../pages/SetPasswordPage/SetPasswordPage'
import SetNicknamePage from '../pages/SetNicknamePage/SetNicknamePage'
import LoginPage from '../pages/LoginPage/LoginPage'
import HomePage from '../pages/HomePage/HomePage'

export const router = createBrowserRouter([
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/register/email-verification',
        element: <VerifyEmailPage />
    },
    {
        path: '/register/phone',
        element: <SetPhonePage />,
    },
    {
        path: '/register/password',
        element: <SetPasswordPage />,
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register/nickname',
        element: <SetNicknamePage />,
    },
    {
        path: "/home",
        element: <HomePage />
    }
])
