import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const { token } = useSelector(state => state.auth)

    // USER IS LOGGED IN YET
    useEffect(() => {
        if (token !== null) {
            return;

        } else {
            return navigate('/login');;
        }
    })
    return children
}

export default PrivateRoute