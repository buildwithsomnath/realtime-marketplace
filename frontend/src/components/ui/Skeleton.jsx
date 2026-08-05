const Skeleton = ({
    className = "",
}) => {
    return (
        <div
            className={`animate-pulse rounded-xl bg-gray-200 ${className}`}
        />
    );
};

export default Skeleton;