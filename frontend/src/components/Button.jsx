import { motion } from "framer-motion";

const variants = {
    primary:
        "bg-indigo-600 hover:bg-indigo-700 text-white",

    secondary:
        "bg-gray-200 hover:bg-gray-300 text-gray-800",

    success:
        "bg-emerald-600 hover:bg-emerald-700 text-white",

    danger:
        "bg-red-600 hover:bg-red-700 text-white",

    outline:
        "border border-indigo-600 text-indigo-600 hover:bg-indigo-50",
};

const Button = ({
    children,
    variant = "primary",
    className = "",
    ...props
}) => {
    return (
        <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`rounded-xl px-5 py-2 font-medium transition ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;