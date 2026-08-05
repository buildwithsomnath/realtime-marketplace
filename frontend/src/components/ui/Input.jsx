const Input = ({
    label,
    error,
    className = "",
    ...props
}) => {
    return (
        <div className="space-y-2">

            {label && (
                <label className="font-medium">
                    {label}
                </label>
            )}

            <input
                className={`w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 ${className}`}
                {...props}
            />

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}

        </div>
    );
};

export default Input;