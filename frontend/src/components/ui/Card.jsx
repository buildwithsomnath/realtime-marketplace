import { motion } from "framer-motion";

const Card = ({
    children,
    className = "",
}) => {
    return (
        <motion.div
            whileHover={{
                y: -4,
            }}
            className={`rounded-2xl bg-white p-6 shadow transition ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default Card;