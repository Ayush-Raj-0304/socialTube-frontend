import React from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Header/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Header/Sidebar";

function Layout() {
    return (
        <>
            {/* Navbar with slide-down effect */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Navbar />
            </motion.div>

            <div className="sm:flex flex-none">
                {/* Sidebar with slide-in effect from the left */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Sidebar />
                </motion.div>

                {/* Main content area with fade-in effect */}
                <motion.div
                    className="sm:flex-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Outlet />
                </motion.div>
            </div>
        </>
    );
}

export default Layout;
