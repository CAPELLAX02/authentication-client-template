import { createBrowserRouter } from 'react-router-dom'
import RegisterPage from '../pages/register/RegisterPage'

export const router = createBrowserRouter([
    {
        path: '/register',
        element: <RegisterPage />,
    },
])
