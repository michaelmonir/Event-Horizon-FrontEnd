import {Navigate, Outlet, useLocation} from "react-router-dom";
import {isUserLoggedIn} from "./UserAuthentication";
import {RoutePathNames} from "../Routes/RoutePathNames";


const RequireAuth = () => {

    const location = useLocation()

    return (
        isUserLoggedIn()
            ? <Outlet />
            : <Navigate to={RoutePathNames.login} state={{ from:location}} replace={true} />
    )
}

export default RequireAuth