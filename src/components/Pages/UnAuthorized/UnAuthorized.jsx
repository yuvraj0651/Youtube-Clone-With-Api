import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Unauthorized = () => {
    return (
        <div className="h-screen bg-[#0f0f0f] flex flex-col items-center justify-center text-white text-center px-4">

            {/* Animated Lock */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-6xl mb-6"
            >
                🔒
            </motion.div>

            {/* Title */}
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold mb-3"
            >
                Access Denied
            </motion.h1>

            {/* Subtitle */}
            <p className="text-gray-400 max-w-md mb-6">
                You don’t have permission to view this page. Please login or go back to homepage.
            </p>

            {/* Buttons */}
            <div className="flex gap-4">

                <Link to="/auth">
                    <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition">
                        Login
                    </button>
                </Link>

                <Link to="/home">
                    <button className="px-6 py-2 border border-gray-500 hover:border-white rounded-lg transition">
                        Go Home
                    </button>
                </Link>

            </div>

            {/* Glow Effect */}
            <div className="absolute w-[300px] h-[300px] bg-red-500 opacity-20 blur-3xl rounded-full top-20 animate-pulse"></div>

        </div>
    );
};

export default Unauthorized;