import ChartComponent from '@/components/ChartComponent';
import MaintenanceTable from '@/components/MaintenanceTable';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
	const navigate = useNavigate();
	const formatTime = (hour) => {
		return hour < 10 ? `0${hour}:00` : `${hour}:00`;
	};

	const handleLogout = () => {
		localStorage.removeItem("auth-token");
		navigate("/login");
	};

	const chartData1 = [
		{ time: "10:00:00", Vrms: 287 },
		{ time: "10:00:05", Vrms: 295 },
		{ time: "10:00:10", Vrms: 315 },
		{ time: "10:00:15", Vrms: 301 },
		{ time: "10:00:20", Vrms: 310 },
		{ time: "10:00:25", Vrms: 330 },
		{ time: "10:00:30", Vrms: 304 },
		{ time: "10:00:35", Vrms: 288 },
		{ time: "10:00:40", Vrms: 301 },
		{ time: "10:00:45", Vrms: 312 },
		{ time: "10:00:50", Vrms: 318 },
		{ time: "10:00:55", Vrms: 311 },
		{ time: "10:01:00", Vrms: 300 },
		{ time: "10:00:05", Vrms: 299 },
		{ time: "10:00:15", Vrms: 315 },
		{ time: "10:00:20", Vrms: 312 },
		{ time: "10:00:25", Vrms: 300 },
		{ time: "10:00:30", Vrms: 280 },
		{ time: "10:00:35", Vrms: 305 },
		{ time: "10:00:40", Vrms: 295 },
	];
	const chartData2 = [
		{ time: formatTime(12), Vrms: 202.93 },
		{ time: formatTime(1), Vrms: 208.59 },
		{ time: formatTime(2), Vrms: 222.73 },
		{ time: formatTime(3), Vrms: 212.84 },
		{ time: formatTime(4), Vrms: 219.2 },
		{ time: formatTime(5), Vrms: 233.35 },
		{ time: formatTime(6), Vrms: 214.96 },
	];
	const chartData3 = [
		{ time: formatTime(12), Temperature: 35 },
		{ time: formatTime(1), Temperature: 34 },
		{ time: formatTime(2), Temperature: 35.8 },
		{ time: formatTime(3), Temperature: 37.4 },
		{ time: formatTime(4), Temperature: 36.5 },
		{ time: formatTime(5), Temperature: 35.1 },
		{ time: formatTime(6), Temperature: 34.5 },
	];
	const chartData4 = [
		{ time: formatTime(12), Humidity: 70 },
		{ time: formatTime(1), Humidity: 77 },
		{ time: formatTime(2), Humidity: 78 },
		{ time: formatTime(3), Humidity: 55 },
		{ time: formatTime(4), Humidity: 65 },
		{ time: formatTime(5), Humidity: 51 },
		{ time: formatTime(6), Humidity: 59 },
	]

	return (
		<div className="flex flex-col items-center gap-5 pb-10 relative">
			{/* <div className='fixed top-0 w-full bg-[#ff9c32] z-[100] text-center text-3xl py-4 font-semibold text-white'>
				Turning on the Generator
			</div> */}
			<div className='w-full flex justify-end items-center p-4'>
				<button onClick={handleLogout} className='top-4 right-4 bg-black/80 hover:bg-black/75 transition-colors duration-200 ease-in-out text-white py-1.5 px-4 rounded'>
					Log out
				</button>
			</div>
			<h1 className="text-center font-bold text-3xl pb-5">
				Generator Maintenance Dashboard
			</h1>
			{/* <h1 className="font-bold text-lg text-left w-full px-[5%] py-2">Generator Status</h1> */}
			<div className="w-[90%] h-fit grid lg:grid-cols-2 gap-4">
				<div className="w-full max-h-[500px]">
					<ChartComponent
						title={"Vrms v/s Time (real-time data)"}
						chartData={chartData1}
						dataKey="Vrms"
					/>
				</div>
				<div className="w-full h-[500px]">
					<ChartComponent
						title={"Vrms v/s Time (hourly data)"}
						chartData={chartData2}
						dataKey="Vrms"
					/>
				</div>
				<div className="w-full h-[500px]">
					<ChartComponent
						title={"Temperature v/s Time (hourly data)"}
						chartData={chartData3}
						dataKey="Temperature"
					/>
				</div>
				<div className="w-full h-[500px]">
					<ChartComponent
						title={"Humidity v/s Time (hourly data)"}
						chartData={chartData4}
						dataKey="Humidity"
					/>
				</div>
			</div>
			<div className="w-[90%] space-y-2">
				<h1 className="font-bold text-lg">Maintenance Logs Table</h1>
				<MaintenanceTable />
			</div>
		</div>
	)
}

export default Dashboard