import {Navigate, Outlet, useLocation} from "react-router-dom";
import {isUserLoggedIn} from "./UserAuthentication";
import {RoutePathNames} from "../Routes/RoutePathNames";


const RequireNoAuth = () => {

    const location = useLocation()

    return (
        !isUserLoggedIn()
            ? <Outlet />
            : <Navigate to={RoutePathNames.dashboard} state={{ from:location}} replace={true} />
    )
}

export default RequireNoAuth