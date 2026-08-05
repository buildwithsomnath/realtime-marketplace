import Button from "./Button";

const EmptyState = ({
    title,
    description,
    buttonText,
    onClick,
}) => {
    return (
        <div className="flex flex-col items-center rounded-2xl bg-white p-10 shadow">

            <h2 className="text-2xl font-bold">
                {title}
            </h2>

            <p className="mt-2 text-gray-500">
                {description}
            </p>

            {buttonText && (
                <Button
                    className="mt-6"
                    onClick={onClick}
                >
                    {buttonText}
                </Button>
            )}

        </div>
    );
};

export default EmptyState;