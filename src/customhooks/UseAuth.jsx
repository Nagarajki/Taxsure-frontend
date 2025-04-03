import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
// import Swal from "sweetalert2";

export const UseAuth = () => {
    const token = localStorage.getItem("Dana");
    // const resToken = JSON.parse(token);
    // console.log("UseAuth", token)
    if (!token) {
        // Swal.fire({
        //     icon: "error",
        //     title: "Unauthorized Access",
        //     text: `You must be logged in to access the application. Please log in with your credentials to proceed`,
        // });
        return <Navigate to='/login' />
    }
    if (token) {
        try {
            const decode = jwtDecode(token);
            const { id, name, email, roles } = decode;
            // console.log("user data ==>>", decode)
            return { userId: id, name, email, roles }; // Fixed typo in 'useRole'
        } catch (error) {
            // Handle decoding error here
            console.error("Error decoding token:", error);
        }
    }
}