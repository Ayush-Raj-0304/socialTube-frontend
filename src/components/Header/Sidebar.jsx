import React from "react";
import { motion } from "framer-motion";
import {
    BiHistory,
    BiLike,
    CiSettings,
    HiOutlineVideoCamera,
    IoFolderOutline,
    RiHome6Line,
    TbUserCheck,
} from "../icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { userLogout } from "../../store/Slices/authSlice";

function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector((state) => state.auth?.userData?.username);

    const sidebarTopItems = [
        { icon: <RiHome6Line size={25} />, title: "Home", url: "/" },
        { icon: <BiLike size={25} />, title: "Liked Videos", url: "/liked-videos" },
        { icon: <BiHistory size={25} />, title: "History", url: "/history" },
        { icon: <HiOutlineVideoCamera size={25} />, title: "My Content", url: `/channel/${username}` },
        { icon: <IoFolderOutline size={25} />, title: "Collections", url: "/collections" },
        { icon: <TbUserCheck size={25} />, title: "Subscriptions", url: "/subscriptions" },
    ];

    const logout = async () => {
        await dispatch(userLogout());
        navigate("/");
    };

    return (
        <>
            {/* Sidebar for larger screens */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 50, damping: 10 }}
                className="sm:block hidden h-screen "
            >
                <div className="text-white bg-black bg-opacity-50 backdrop-blur-lg lg:w-56 md:w-44 w-16 sm:p-3 p-2 border-slate-600 border-r h-screen flex flex-col justify-between overflow-hidden">
                    <div className="flex flex-col gap-4 mt-5">
                        {sidebarTopItems.map((item, index) => (
                            <NavLink to={item.url} key={item.title} className="relative">
                                {({ isActive }) => (
                                    <motion.div
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.05, duration: 0.3 }}
                                        whileHover={{ scale: 1.1 }}
                                        className={`flex items-center gap-2 justify-center sm:justify-start cursor-pointer py-2 px-3 border border-slate-600 rounded-full transition-all ${
                                            isActive ? "bg-purple-500 scale-110 shadow-lg" : "hover:bg-purple-500"
                                        }`}
                                    >
                                        {item.icon}
                                        <span className="text-base hidden md:block">{item.title}</span>
                                    </motion.div>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Logout and Settings */}
                    <div className="space-y-4 mb-10">
                        {username && (
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                onClick={logout}
                                className="flex items-center gap-2 justify-center sm:justify-start hover:bg-purple-500 cursor-pointer py-2 px-3 border border-slate-600 rounded-full"
                            >
                                <IoMdLogOut size={25} />
                                <span className="text-base hidden md:block">Logout</span>
                            </motion.div>
                        )}
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="flex items-center gap-2 justify-center sm:justify-start hover:bg-purple-500 cursor-pointer py-2 px-3 border border-slate-600 rounded-full"
                        >
                            <CiSettings size={25} />
                            <span className="text-base hidden md:block">Settings</span>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Bottom navigation for mobile */}
            <div className="border-t-2 text-white h-16 sm:hidden z-20 p-1 w-full flex justify-around fixed bottom-0 bg-[#0E0F0F]">
                {sidebarTopItems.slice(0, 4).map((item) => (
                    <NavLink to={item.url} key={item.title}>
                        {({ isActive }) => (
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className={`flex flex-col items-center gap-1 cursor-pointer p-1 transition-all ${
                                    isActive ? "text-purple-500 scale-110" : ""
                                }`}
                            >
                                {item.icon}
                                <span className="text-sm">{item.title}</span>
                            </motion.div>
                        )}
                    </NavLink>
                ))}
            </div>
        </>
    );
}

export default Sidebar;
