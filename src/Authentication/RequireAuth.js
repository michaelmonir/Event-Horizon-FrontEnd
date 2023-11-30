import {Navigate, Outlet, useLocation} from "react-router-dom";
import {isUserLoggedIn} from "./UserAuthentication";


const RequireAuth = () => {

    const location = useLocation()

    return (
        isUserLoggedIn()
            ? <Outlet />
            : <Navigate to="/login" state={{ from:location}} replace={true} />
    )
}

export default RequireAuth