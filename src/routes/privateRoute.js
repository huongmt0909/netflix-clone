import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { loginSelector } from '../redux/selector'

function PrivateRoute() {
    const loginList = useSelector(loginSelector)
    return loginList.isLoggedIn ? <Outlet /> : <Navigate to='/' />
}

export default PrivateRoute
