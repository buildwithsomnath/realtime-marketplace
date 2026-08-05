const colors = {
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
};

const Badge = ({
    children,
    color = "info",
}) => {
    return (
        <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${colors[color]}`}
        >
            {children}
        </span>
    );
};

export default Badge;