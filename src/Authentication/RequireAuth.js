import {Navigate, Outlet, useLocation} from "react-router-dom";
import {RoutePathNames} from "../Routes/RoutePathNames";
import {useMyContext} from "./LogInContext";


const RequireAuth = () => {

    const { isUserLoggedIn} = useMyContext();
    const location = useLocation()

    return (
        isUserLoggedIn
            ? <Outlet />
            : <Navigate to={RoutePathNames.login} state={{ from:location}} replace={true} />
    )
}

export default RequireAuth