import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Button, Logo, SearchForSmallScreen } from "../index.js";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
    IoCloseCircleOutline,
    BiLike,
    CiSearch,
    HiOutlineVideoCamera,
    SlMenu,
} from "../icons.js";
import { useSelector, useDispatch } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { userLogout } from "../../store/Slices/authSlice.js";

function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);
    const username = useSelector((state) => state.auth?.userData?.username);
    const profileImg = useSelector((state) => state.auth.userData?.avatar.url);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        await dispatch(userLogout());
        navigate("/");
    };

    const sidePanelItems = [
        { icon: <BiLike size={25} />, title: "Liked Videos", url: "/liked-videos" },
        { icon: <HiOutlineVideoCamera size={25} />, title: "My Content", url: `/channel/${username}` },
    ];

    return (
        <>
            <motion.nav 
                className="w-full bg-black bg-opacity-50 backdrop-blur-lg flex justify-between items-center p-4 sm:gap-5 gap-2 border-b border-gray-700 sticky top-0 z-50 shadow-md"
                initial={{ y: -50, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <div className="flex items-center justify-center gap-2 cursor-pointer">
                    <Logo />
                </div>

                <div className="w-full sm:w-1/3 hidden sm:block">
                    <Search />
                </div>

                <div className="text-white w-full inline-flex justify-end sm:hidden pr-4">
                    <motion.div
                        whileTap={{ scale: 0.9 }} 
                        transition={{ duration: 0.2 }}
                        onClick={() => setOpenSearch((prev) => !prev)}
                    >
                        <CiSearch size={30} fontWeight="bold" className="text-gray-300 hover:text-white" />
                    </motion.div>
                    {openSearch && (
                        <SearchForSmallScreen open={openSearch} setOpenSearch={setOpenSearch} />
                    )}
                </div>

                {authStatus ? (
                    <motion.div className="rounded-full sm:block hidden">
                        <img 
                            src={profileImg} 
                            alt="profileImg" 
                            className="rounded-full w-10 h-10 object-cover border border-gray-600" 
                        />
                    </motion.div>
                ) : (
                    <div className="space-x-2 sm:block hidden">
                        <Link to="/login">
                            <Button className="bg-gray-800 border border-gray-600 hover:bg-gray-700 text-white sm:px-4 sm:py-2 p-2">
                                Login
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button className="border border-gray-600 hover:bg-gray-700 text-white sm:px-4 sm:py-2 ">
                                Sign up
                            </Button>
                        </Link>
                    </div>
                )}

                <div className="sm:hidden block">
                    <motion.div 
                        className="text-gray-300 hover:text-white"
                        whileTap={{ scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setToggleMenu((prev) => !prev)}
                    >
                        <SlMenu size={24} />
                    </motion.div>
                </div>

                <AnimatePresence>
                    {toggleMenu && (
                        <motion.div
                            className="fixed right-0 top-0 text-white flex flex-col border-l h-screen w-[70%] bg-black bg-opacity-80 backdrop-blur-lg sm:hidden rounded-lg outline-none"
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <div className="w-full border-b border-gray-700 h-20 flex items-center mb-2 justify-between px-3">
                                <div className="flex items-center gap-2">
                                    <Logo />
                                </div>
                                <motion.div
                                    whileTap={{ scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={() => setToggleMenu((prev) => !prev)}
                                >
                                    <IoCloseCircleOutline size={35} className="text-gray-300 hover:text-white" />
                                </motion.div>
                            </div>

                            <div className="flex flex-col justify-between h-full py-5 px-3">
                                <div className="flex flex-col gap-5">
                                    {sidePanelItems.map((item) => (
                                        <NavLink 
                                            to={item.url} 
                                            key={item.title} 
                                            onClick={() => setToggleMenu((prev) => !prev)}
                                            className={({ isActive }) => isActive ? "bg-gray-700" : ""}
                                        >
                                            <motion.div 
                                                className="flex items-center border border-gray-600 gap-5 px-3 py-1 hover:bg-gray-700"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div>{item.icon}</div>
                                                <span className="text-lg">{item.title}</span>
                                            </motion.div>
                                        </NavLink>
                                    ))}
                                </div>

                                {!authStatus ? (
                                    <div className="flex flex-col space-y-5 mb-3">
                                        <Link to="/login">
                                            <Button className="w-full bg-gray-800 border border-gray-600 hover:bg-white hover:text-black py-1 px-3">
                                                Login
                                            </Button>
                                        </Link>
                                        <Link to="/signup">
                                            <Button className="w-full border border-gray-600 hover:bg-white hover:text-black py-1 px-3">
                                                Sign up
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <motion.div 
                                        className="flex gap-2 justify-start items-start cursor-pointer py-1 px-2 border border-gray-600 hover:bg-gray-700"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                        onClick={() => logout()}
                                    >
                                        <IoMdLogOut size={25} />
                                        <span className="text-base">Logout</span>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
}

export default Navbar;