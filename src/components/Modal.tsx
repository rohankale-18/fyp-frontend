import { createPortal } from "react-dom";

interface ModalProps {
  onClose: () => void; // Callback function to close the modal
  children: React.ReactNode; // Content to render inside the modal
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-4xl text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>

          {/* Modal Content */}
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal-root") as HTMLElement // Type assertion to HTMLElement
  );
};

export default Modal;
