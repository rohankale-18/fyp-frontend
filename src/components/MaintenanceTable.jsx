import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { createEntry, getGeneratorData } from "@/api/generatorData";

export function MaintenanceTable() {
	const [maintenanceData, setMaintenanceData] = useState([]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		generator_id: "",
		maintenance_detail: "",
		status: "Pending",
		name_of_person: "",
	});

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const fetchData = async () => {
		const data = await getGeneratorData();
		// console.log(data);
		setMaintenanceData(data);
	}
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		await createEntry(formData);
		// Reset form data
		setFormData({
			generator_id: "",
			maintenance_detail: "",
			status: "Pending",
			name_of_person: "",
		});
		fetchData();

		// Close modal
		handleCloseModal();
	};

	useEffect(() => {
		fetchData();
	}, [])

	const formatDate = (isoDateString) => {
		const date = new Date(isoDateString); // Convert the ISO string to a Date object
		return date.toLocaleDateString('en-GB'); // Format as 'dd/mm/yyyy'
	};

	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">S. No.</TableHead>
						<TableHead>Generator ID</TableHead>
						<TableHead>Maintenance Detail</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Name of Person</TableHead>
						<TableHead>Date</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{maintenanceData.map((data, index) => (
						<TableRow key={data.id}>
							<TableCell className="font-medium">{index + 1}</TableCell>
							<TableCell>{data.generator_id}</TableCell>
							<TableCell>{data.maintenance_detail}</TableCell>
							<TableCell>{data.status}</TableCell>
							<TableCell>{data.name_of_person}</TableCell>
							<TableCell>{formatDate(data.created_at)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* Button to open modal */}
			<button
				onClick={handleOpenModal}
				className="mt-4 bg-blue-500/90 hover:bg-blue-500/85 transition-colors duration-200 ease-in-out text-white py-2 px-4 rounded"
			>
				Add New Entry
			</button>

			{/* Modal for adding new entry */}
			{isModalOpen && (
				<Modal onClose={handleCloseModal}>
					<form onSubmit={handleFormSubmit} className="space-y-4 p-4">
						<div>
							<label
								htmlFor="generator_id"
								className="block text-sm font-medium"
							>
								Generator ID
							</label>
							<input
								type="text"
								id="generator_id"
								name="generator_id"
								value={formData.generator_id}
								onChange={handleInputChange}
								className="border border-gray-300 rounded px-2 py-1 mt-1 block w-full"
								required
							/>
						</div>

						<div>
							<label
								htmlFor="maintenance_detail"
								className="block text-sm font-medium"
							>
								Maintenance Detail
							</label>
							<input
								type="text"
								id="maintenance_detail"
								name="maintenance_detail"
								value={formData.maintenance_detail}
								onChange={handleInputChange}
								className="border border-gray-300 rounded px-2 py-1 mt-1 block w-full"
								required
							/>
						</div>

						<div>
							<label htmlFor="status" className="block text-sm font-medium">
								Status
							</label>
							<select
								id="status"
								name="status"
								value={formData.status}
								onChange={handleInputChange}
								className="border border-gray-300 rounded px-2 py-1 mt-1 block w-full"
								required
							>
								<option value="Pending">Pending</option>
								<option value="In Progress">In Progress</option>
								<option value="Completed">Completed</option>
								<option value="Scheduled">Scheduled</option>
							</select>
						</div>

						<div>
							<label htmlFor="name_of_person" className="block text-sm font-medium">
								Name of Person
							</label>
							<input
								type="text"
								id="name_of_person"
								name="name_of_person"
								value={formData.name_of_person}
								onChange={handleInputChange}
								className="border border-gray-300 rounded px-2 py-1 mt-1 block w-full"
								required
							/>
						</div>

						<button
							type="submit"
							className="bg-green-500 text-white py-2 px-4 rounded mt-4"
						>
							Submit
						</button>
					</form>
				</Modal>
			)}
		</>
	);
}

export default MaintenanceTable;
