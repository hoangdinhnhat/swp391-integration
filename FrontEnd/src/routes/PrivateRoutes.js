import {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {UserContext} from "~/userContext/Context";


function PrivateRoutes() {
    const context = useContext((UserContext))
    const user = context.state

    return user ? <Outlet/> : <Navigate to="/login"/>;
}

export default PrivateRoutes;
