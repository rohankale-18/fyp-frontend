import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { ImSpinner2 } from "react-icons/im"; // Import spinner icon

const Login = () => {
	const navigate = useNavigate();
	const [loginIdentifier, setLoginIdentifier] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
	const [loading, setLoading] = useState(false); // State for loading spinner

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true); // Start loading
		try {
			await login(loginIdentifier, password);
			navigate("/");
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false); // Stop loading
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("auth-token");
		if (token) {
			navigate("/");
		}
	}, [navigate]);

	return (
		<>
			<h1 className="text-xl font-bold text-center mb-6">
				Login to<br />Generator Maintenance Dashboard
			</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<label
						htmlFor="email"
						className="block text-sm font-medium"
					>
						Username/Email
					</label>
					<input
						id="loginIdentifier"
						type="text"
						value={loginIdentifier}
						onChange={(e) => setLoginIdentifier(e.target.value)}
						placeholder="john@example.com"
						required
						className="w-full px-3 py-2 bg-[#ececec] border border-[#C7C7C7] rounded-md placeholder-[#C7C7C7] focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
					/>
				</div>
				<div className="space-y-2 relative">
					<label htmlFor="password" className="block text-sm font-medium">
						Password
					</label>
					<div className="relative">
						<input
							id="password"
							type={showPassword ? "text" : "password"} // Toggle input type
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full px-3 py-2 bg-[#ececec] border border-[#C7C7C7] rounded-md  focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)} // Toggle visibility
							className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF8500]"
						>
							{showPassword ? <IoEyeOutline size={24} /> : <IoEyeOffOutline size={24} />} {/* Icon */}
						</button>
					</div>
				</div>
				<button
					type="submit"
					disabled={loading} // Disable the button when loading
					className={`w-full py-2 px-4 font-semibold rounded-md transition-colors duration-300 text-white ${loading
						? "bg-[#FF8500]/60 cursor-not-allowed"
						: "bg-[#FF8500] hover:bg-[#FF8500]/80"
						}`}
				>
					{loading ? (
						<div className="flex items-center justify-center space-x-2">
							<svg
								className="animate-spin h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
								></path>
							</svg>
							<span>Logging in...</span>
						</div>
					) : (
						"Login"
					)}
				</button>
			</form>
			<div className="mt-4 text-center">
				<button
					onClick={() => navigate("/signup")}
					className="text-[#FF8500] hover:underline"
				>
					Need an account? Sign Up
				</button>
			</div>
		</>
	);
};
export default Login;
