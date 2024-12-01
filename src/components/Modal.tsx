import { createPortal } from "react-dom";

export default function Modal({ onClose, children }) {
  // Ensure modal renders outside of the current DOM hierarchy
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
    document.getElementById("modal-root") // Assumes you have a div with id 'modal-root' in your HTML
  );
}
