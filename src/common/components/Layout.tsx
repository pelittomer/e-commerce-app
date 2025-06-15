import { Outlet, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'
import Button from './button/Button'
import { useSendLogoutMutation } from '../../modules/auth/store/authApiSlice'
import { useEffect } from 'react'

function Layout() {
    const navigate = useNavigate()
    const { roles, userId, username } = useAuth()
    const [sendLogout, { isLoading, isSuccess }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    return (
        <div>
            <h1>Header</h1>
            <div>
                <h3>roles:{roles}</h3>
                <h3>userId:{userId}</h3>
                <h3>username:{username}</h3>
                {
                    username &&
                    <Button onClick={sendLogout} disabled={isLoading}>Logout</Button>
                }
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout