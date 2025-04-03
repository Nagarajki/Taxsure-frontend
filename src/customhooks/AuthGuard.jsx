import { Navigate } from "react-router-dom";
import { UseAuth } from "./UseAuth";
// import Swal from "sweetalert2";

const AuthGuard = ({ children }) => {
    const { roles } = UseAuth();
    const authRoles = [
        1000,
        2000,
        3000
    ]
    console.log("roles", roles)
    if (roles && roles?.roleId === undefined) {
        // Swal.fire({
        //     icon: "error",
        //     title: "Unauthorized Access",
        //     text: `You must be logged in to access the application. Please log in with your credentials to proceed`,
        // });
        return <Navigate to={'/sign-in'} />
    }
    const rolesMatch = authRoles.includes(roles?.roleId);
    if (!rolesMatch) {
        // Swal.fire({
        //     icon: "error",
        //     title: "Unauthorized Access",
        //     text: `You must be logged in to access the application. Please log in with your credentials to proceed`,
        // });
        return <Navigate to={'/sign-in'} />
    }
    return children;
}

export default AuthGuard