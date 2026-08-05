const Modal = ({
    open,
    title,
    children,
    onClose,
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-lg rounded-2xl bg-white p-6">

                <div className="mb-4 flex items-center justify-between">

                    <h2 className="text-xl font-bold">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                {children}

            </div>

        </div>
    );
};

export default Modal;