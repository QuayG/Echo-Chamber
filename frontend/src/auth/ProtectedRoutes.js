import { useAuth } from './AuthProvider'
import { Redirect, Route } from 'react-router-dom'

export default function ProtectedRoute({ ...props }) {
    const { user } = useAuth()

    if (!user) {
        return <Redirect to="/" />
    }

    if (props.adminOnly && user.role !== "admin"){
        return <Redirect to="/main_menu" />
    }

    return <Route {...props} />
}