import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
    return (
        <div className="h-screen bg-[#0f0f0f] flex flex-col items-center justify-center text-white text-center px-4 relative overflow-hidden">

            {/* Floating Emoji */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-6xl mb-4"
            >
                😵
            </motion.div>

            {/* 404 Text */}
            <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-7xl font-extrabold mb-3"
            >
                404
            </motion.h1>

            {/* Subtitle */}
            <p className="text-gray-400 max-w-md mb-6">
                Oops! The page you're looking for doesn't exist or has been moved.
            </p>

            {/* Button */}
            <Link to="/home">
                <button className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-300 transition">
                    Back to Home
                </button>
            </Link>

            {/* Background Animation */}
            <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-20 blur-3xl rounded-full animate-pulse -z-10"></div>

        </div>
    );
};

export default NotFound;