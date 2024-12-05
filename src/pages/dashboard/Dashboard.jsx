// import React, { useState, useEffect } from "react";
// import ChartComponent from "@/components/ChartComponent";
// import MaintenanceTable from "@/components/MaintenanceTable";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "@/api/axiosInstance";
// import { set } from "date-fns";

// const Dashboard = () => {
// 	const navigate = useNavigate();

// 	const [humidityData, setHumidityData] = useState([]);
// 	const [temperatureData, setTemperatureData] = useState([]);
// 	const [voltageData, setVoltageData] = useState([]);
// 	const [thirty, setThirty] = useState(false);
// 	const [val, setVal] = useState(0);

// 	// Function to generate random data
// 	const generateRandomData = (min, max) => {
// 		return Math.random() * (max - min) + min;
// 	};

// 	const sendToPredict = async (data) => {
// 		try {
// 			const response = await axiosInstance.post("/predict", data);
// 			console.log("Prediction response:", response.data.prediction);
// 			// setVal(response.data.prediction[0]);
// 		} catch (error) {
// 			console.error("Error sending data to /predict:", error);
// 		}
// 	};

// 	useEffect(() => {
// 		const interval = setInterval(() => {
// 			setVal(1);
// 			const timeout = setTimeout(() => {
// 				setVal(0);
// 			}, 5000);

// 			return () => clearTimeout(timeout); // Cleanup timeout
// 		}, 20000);

// 		return () => clearInterval(interval); // Cleanup interval
// 	}, []);


// 	useEffect(() => {
// 		const interval = setInterval(() => {
// 			const timestamp = new Date();

// 			const newHumidity = {
// 				time: timestamp.toLocaleTimeString(),
// 				value: 49,
// 			};
// 			const newTemperature = {
// 				time: timestamp.toLocaleTimeString(),
// 				value: parseFloat(generateRandomData(15, 35).toFixed(2)),
// 			};

// 			const newVoltage = {
// 				time: timestamp.toLocaleTimeString(),
// 				value: thirty ? 219 : parseFloat(generateRandomData(220, 240).toFixed(2)),
// 			};

// 			setHumidityData((prev) => [...prev.slice(-19), newHumidity]);
// 			setTemperatureData((prev) => [...prev.slice(-19), newTemperature]);
// 			setVoltageData((prev) => [...prev.slice(-19), newVoltage]);

// 			const dataToSend = {
// 				Vrms: newVoltage.value,
// 				Humidity: newHumidity.value,
// 				Temperature: newTemperature.value,
// 				Vmax: newVoltage.value * 1.414, // Example derived value
// 			};

// 			sendToPredict(dataToSend);
// 		}, 5000);

// 		return () => clearInterval(interval); // Cleanup on unmount
// 	}, [thirty]);

// 	const handleLogout = () => {
// 		localStorage.removeItem("auth-token");
// 		navigate("/login");
// 	};
// 	console.log('val', val)

// 	return (
// 		<div className="flex flex-col items-center gap-5 pb-10">
// 			{val === 1 ?
// 				<div className="bg-orange-300 w-full py-8 text-center text-2xl font-semibold">
// 					Voltage level dropped below the threshold!!! Turning on the Generator.
// 				</div>
// 				:
// 				<></>
// 			}
// 			<div className="w-full flex justify-end items-center p-4">
// 				<button
// 					onClick={handleLogout}
// 					className="bg-black/80 hover:bg-black/75 text-white py-1.5 px-4 rounded"
// 				>
// 					Log out
// 				</button>
// 			</div>
// 			<h1 className="text-center font-bold text-3xl pb-5">Generator Maintenance Dashboard</h1>
// 			<div className="w-[90%] h-fit grid lg:grid-cols-2 gap-4">
// 				<ChartComponent
// 					title="Voltage v/s Time (real-time)"
// 					chartData={voltageData}
// 					dataKey="value"
// 				/>
// 				<ChartComponent
// 					title="Humidity v/s Time (real-time)"
// 					chartData={humidityData}
// 					dataKey="value"
// 				/>
// 				<ChartComponent
// 					title="Temperature v/s Time (real-time)"
// 					chartData={temperatureData}
// 					dataKey="value"
// 				/>
// 			</div>
// 			<div className="w-[90%] space-y-2">
// 				<h1 className="font-bold text-lg">Maintenance Logs Table</h1>
// 				<MaintenanceTable />
// 			</div>
// 		</div>
// 	);
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import ChartComponent from "@/components/ChartComponent";
import MaintenanceTable from "@/components/MaintenanceTable";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance"; // Ensure axiosInstance is imported correctly

const Dashboard = () => {
	const navigate = useNavigate();

	const [humidityData, setHumidityData] = useState([]);
	const [temperatureData, setTemperatureData] = useState([]);
	const [voltageData, setVoltageData] = useState([]);
	const [turnOnGen, setTurnOnGen] = useState(false);

	// Function to generate random data
	const generateRandomData = (min, max) => {
		return Math.random() * (max - min) + min;
	};

	const sendToPredict = async (data) => {
		try {
			const response = await axiosInstance.post("/predict", data);
			console.log("Prediction response:", response.data.prediction);
			setTurnOnGen(response.data.prediction[0]);
		} catch (error) {
			console.error("Error sending data to /predict:", error);
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			const timestamp = new Date();

			const newHumidity = {
				time: timestamp.toLocaleTimeString(),
				value: parseFloat(generateRandomData(49.5, 51).toFixed(2)),
			};
			const newTemperature = {
				time: timestamp.toLocaleTimeString(),
				value: parseFloat(generateRandomData(33, 35).toFixed(2)),
			};
			const newVoltage = {
				time: timestamp.toLocaleTimeString(),
				value: parseFloat(generateRandomData(219, 222).toFixed(2)),
			};

			// Update state for charts
			setHumidityData((prev) => [...prev.slice(-19), newHumidity]);
			setTemperatureData((prev) => [...prev.slice(-19), newTemperature]);
			setVoltageData((prev) => [...prev.slice(-19), newVoltage]);

			// Prepare data for prediction
			const dataToSend = {
				Vrms: newVoltage.value,
				Humidity: newHumidity.value,
				Temperature: newTemperature.value,
				Vmax: newVoltage.value * 1.414, // Example derived value
			};

			// Send data to the backend
			sendToPredict(dataToSend);
		}, 5000);

		return () => clearInterval(interval); // Cleanup on unmount
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("auth-token");
		navigate("/login");
	};

	return (
		<div className="flex flex-col items-center gap-5 pb-10 relative">
			{turnOnGen === 1 ? (
				<div className="w-full bg-orange-300 text-2xl font-semibold py-6 text-center sticky top-0 z-[10000]">
					Voltage dropped below threshold!!! Turning on Generator.
				</div>
			) : null}
			<div className="w-full flex justify-end items-center p-4">
				<button
					onClick={handleLogout}
					className="bg-black/80 hover:bg-black/75 text-white py-1.5 px-4 rounded"
				>
					Log out
				</button>
			</div>
			<h1 className="text-center font-bold text-3xl pb-5">Generator Maintenance Dashboard</h1>
			<div className="w-[90%] h-fit grid lg:grid-cols-2 gap-4">
				<ChartComponent
					title="Voltage v/s Time (real-time)"
					chartData={voltageData}
					dataKey="value"
					maxValue={300}
					minValue={0}
				/>
				<ChartComponent
					title="Humidity v/s Time (real-time)"
					chartData={humidityData}
					dataKey="value"
					maxValue={100}
					minValue={0}
				/>
				<ChartComponent
					title="Temperature v/s Time (real-time)"
					chartData={temperatureData}
					dataKey="value"
					maxValue={70}
					minValue={0}
				/>
			</div>
			<div className="w-[90%] space-y-2">
				<h1 className="font-bold text-lg">Maintenance Logs Table</h1>
				<MaintenanceTable />
			</div>
		</div>
	);
};

export default Dashboard;
