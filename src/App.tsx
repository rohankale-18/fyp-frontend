import ChartComponent from "./components/ChartComponent";
import MaintenanceTable from "./components/MaintenanceTable";
function App() {
  const formatTime = (hour) => {
    return hour < 10 ? `0${hour}:00` : `${hour}:00`;
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

  return (
    <div className="flex flex-col items-center gap-5 pb-10">
      <h1 className="text-center font-bold text-3xl p-5">
        Generator Maintenance Dashboard
      </h1>
      <div className="w-[90%] space-y-2">
        <h1 className="font-bold text-lg">Generator Status</h1>
        <div className="w-full h-[500px] flex flex-col">
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
      </div>
      <div className="w-[80%] space-y-2">
        <h1 className="font-bold text-lg">Maintenance Logs Table</h1>
        <MaintenanceTable />
      </div>
    </div>
  );
}

export default App;
