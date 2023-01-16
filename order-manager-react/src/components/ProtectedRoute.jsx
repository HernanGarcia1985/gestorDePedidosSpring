import { Navigate } from "react-router-dom";
import Login from '../views/Login';

const ProtectedRoute = ({user, redictPath, children}) => {
    if(!user || !(JSON.parse(user).roles[0]==="ADMIN")) {
        return <Navigate to={redictPath} />;
    }
    return children ? children : <Login />
}

export default ProtectedRoute;