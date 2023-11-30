import {Navigate, Outlet, useLocation} from "react-router-dom";
import {isUserLoggedIn} from "./UserAuthentication";


const RequireNoAuth = () => {

    const location = useLocation()

    return (
        !isUserLoggedIn()
            ? <Outlet />
            : <Navigate to="/" state={{ from:location}} replace={true} />
    )
}

export default RequireNoAuth