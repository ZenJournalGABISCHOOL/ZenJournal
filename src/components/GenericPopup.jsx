


const GenericPopup = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div 
                className="bg-white p-6 rounded-lg shadow-lg max-h-screen overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                >
                {children}
                </div>
        </div>
    );
}
export default GenericPopup;