import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Modal from "./Modal";
import { useState } from "react";

export function MaintenanceTable() {
  const [maintenanceData, setMaintenanceData] = useState([
    {
      id: 1,
      generatorId: "GEN001",
      maintenanceDetail: "Oil Change",
      status: "Completed",
      personName: "John Doe",
      date: "2024-09-01",
      actions: "View Details",
    },
    {
      id: 2,
      generatorId: "GEN002",
      maintenanceDetail: "Battery Replacement",
      status: "Pending",
      personName: "Jane Smith",
      date: "2024-09-05",
      actions: "View Details",
    },
    {
      id: 3,
      generatorId: "GEN003",
      maintenanceDetail: "Filter Change",
      status: "In Progress",
      personName: "Alice Brown",
      date: "2024-09-10",
      actions: "View Details",
    },
    {
      id: 4,
      generatorId: "GEN004",
      maintenanceDetail: "Coolant Refill",
      status: "Completed",
      personName: "Bob Johnson",
      date: "2024-09-12",
      actions: "View Details",
    },
    {
      id: 5,
      generatorId: "GEN005",
      maintenanceDetail: "Inspection",
      status: "Scheduled",
      personName: "Charlie Davis",
      date: "2024-09-15",
      actions: "View Details",
    },
    {
      id: 6,
      generatorId: "GEN006",
      maintenanceDetail: "Fuel System Check",
      status: "Pending",
      personName: "David Lee",
      date: "2024-09-18",
      actions: "View Details",
    },
    {
      id: 7,
      generatorId: "GEN007",
      maintenanceDetail: "Alternator Repair",
      status: "Completed",
      personName: "Emily Clark",
      date: "2024-09-20",
      actions: "View Details",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    generatorId: "",
    maintenanceDetail: "",
    status: "Pending",
    personName: "",
    date: "",
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a new entry
    const newEntry = {
      id: maintenanceData.length + 1, // Generate a new ID
      ...formData,
    };

    // Update state with new entry
    setMaintenanceData((prevData: any) => [...prevData, newEntry]);

    // Reset form data
    setFormData({
      generatorId: "",
      maintenanceDetail: "",
      status: "Pending",
      personName: "",
      date: "",
    });

    // Close modal
    handleCloseModal();
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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {maintenanceData.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{data.id}</TableCell>
              <TableCell>{data.generatorId}</TableCell>
              <TableCell>{data.maintenanceDetail}</TableCell>
              <TableCell>{data.status}</TableCell>
              <TableCell>{data.personName}</TableCell>
              <TableCell>{data.date}</TableCell>
              <TableCell>
                <button className="text-blue-500">{data.actions}</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Button to open modal */}
      <button
        onClick={handleOpenModal}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add New Entry
      </button>

      {/* Modal for adding new entry */}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <form onSubmit={handleFormSubmit} className="space-y-4 p-4">
            <div>
              <label
                htmlFor="generatorId"
                className="block text-sm font-medium"
              >
                Generator ID
              </label>
              <input
                type="text"
                id="generatorId"
                name="generatorId"
                value={formData.generatorId}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-2 py-1 mt-1 block w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="maintenanceDetail"
                className="block text-sm font-medium"
              >
                Maintenance Detail
              </label>
              <input
                type="text"
                id="maintenanceDetail"
                name="maintenanceDetail"
                value={formData.maintenanceDetail}
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
              <label htmlFor="personName" className="block text-sm font-medium">
                Name of Person
              </label>
              <input
                type="text"
                id="personName"
                name="personName"
                value={formData.personName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-2 py-1 mt-1 block w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
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
