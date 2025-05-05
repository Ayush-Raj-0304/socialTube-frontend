import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Logo } from "../components";

const NotFound = () => {
    return (
        <motion.div
            className="min-h-screen flex flex-col justify-center items-center bg-black bg-opacity-60 backdrop-blur-lg text-white p-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Logo size="40" />
            <h1 className="text-5xl font-bold mt-4 mb-2">404</h1>
            <p className="text-xl text-gray-300 mb-6">
                Oops! The page you are looking for doesn&apos;t exist.
            </p>
            <Link to="/">
                <Button
                    className="px-6 py-2 text-lg font-medium hover:bg-purple-700"
                    bgColor="bg-purple-500"
                    textColor="text-black"
                >
                    Go Home
                </Button>
            </Link>
        </motion.div>
    );
};

export default NotFound;
