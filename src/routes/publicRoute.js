import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { loginSelector } from '../redux/selector'

function PublicRoute() {
    const loginList = useSelector(loginSelector)
    return loginList.isLoggedIn ? <Navigate to='/' /> : <Outlet />
}

export default PublicRoute