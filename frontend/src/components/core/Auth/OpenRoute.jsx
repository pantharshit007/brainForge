
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function OpenRoute({ children }) {
    const { token } = useSelector(state => state.auth)
    const navigate = useNavigate();

    // USER IS NOT LOGGED IN YET
    useEffect(() => {
        if (token === null) {
            return
        } else {
            navigate('/dashboard/my-profile')
        }
    })
    return children
}
export default OpenRoute;