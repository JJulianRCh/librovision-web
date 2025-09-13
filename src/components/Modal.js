export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div>
                <button
                onClick={onClose}
                className="btn btn-rojo absolute top-2 right-2 text-white-200"
                >
                    X
                </button>
                {children}
            </div>
        </div>
    );
}