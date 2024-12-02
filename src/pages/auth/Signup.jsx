import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/auth";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Signup = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
	const [loading, setLoading] = useState(false); // State to track API request status

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true); // Set loading to true
		try {
			const response = await signup(username, email, password);
			localStorage.setItem("auth-token", response.data.access_token);
			navigate("/");
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false); // Set loading to false after request completes
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
				Signup to<br />Generator Maintenance Dashboard
			</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<label htmlFor="name" className="block text-sm font-medium">
						Username
					</label>
					<input
						id="name"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="johndoe"
						required
						className="w-full px-3 py-2 bg-[#ececec] border border-[#C7C7C7] rounded-md  focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
					/>
				</div>
				<div className="space-y-2">
					<label htmlFor="email" className="block text-sm font-medium">
						Email
					</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="john@example.com"
						required
						className="w-full px-3 py-2 bg-[#ececec] border border-[#C7C7C7] rounded-md  focus:outline-none focus:ring-2 focus:ring-[#FF8500]"
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
					disabled={loading} // Disable button while loading
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
							<span>Signing Up...</span>
						</div>
					) : (
						"Sign Up"
					)}
				</button>
			</form>
			<div className="mt-4 text-center">
				<button
					onClick={() => navigate("/login")}
					className="text-[#FF8500] hover:underline"
				>
					Already have an account? Login
				</button>
			</div>
		</>
	);
};

export default Signup;
