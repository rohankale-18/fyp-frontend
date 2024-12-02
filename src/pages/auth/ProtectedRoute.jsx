// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const token = localStorage.getItem("auth-token");
	if (!token) {
		// Redirect to login if not authenticated
		return <Navigate to="/login" replace />;
	}

	// Render the child component if authenticated
	return children;
};

export default ProtectedRoute;
