import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom"

function PrivateRoute() {
    const { token } = useSelector(state => state.auth)

    // USER IS LOGGED IN YET
    if (token !== null) {
        return children

    } else {
        return <Navigate to="/login" />
    }
}

export default PrivateRoute