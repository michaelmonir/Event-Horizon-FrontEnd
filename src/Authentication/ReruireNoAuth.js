import {Navigate, Outlet, useLocation} from "react-router-dom";
import {RoutePathNames} from "../Routes/RoutePathNames";
import {useMyContext} from "./LogInContext";


const RequireNoAuth = () => {

    const { isUserLoggedIn} = useMyContext();
    const location = useLocation()

    return (
        !isUserLoggedIn
            ? <Outlet />
            : <Navigate to={RoutePathNames.dashboard} state={{ from:location}} replace={true} />
    )
}

export default RequireNoAuth