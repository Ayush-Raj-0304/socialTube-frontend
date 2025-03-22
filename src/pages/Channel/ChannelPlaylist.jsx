import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
    createAPlaylist,
    getPlaylistsByUser,
} from "../../store/Slices/playlistSlice";
import { Button, Input } from "../../components";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "../../components/icons";
import { timeAgo } from "../../helpers/timeAgo";
import { Link } from "react-router-dom";

function ChannelPlaylist() {
    const dispatch = useDispatch();
    const playlists = useSelector((state) => state.playlist?.playlists);
    const authId = useSelector((state) => state.auth.userData?._id);
    const userId = useSelector((state) => state.user.profileData?._id);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [openCreatePlaylist, setOpenCreatePlaylist] = useState(false);

    useEffect(() => {
        if (userId) {
            dispatch(getPlaylistsByUser(userId));
        }
    }, [dispatch, userId]);

    const createPlaylist = (data) => {
        dispatch(createAPlaylist(data));
        setOpenCreatePlaylist((prev) => !prev);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full relative text-white sm:px-5 px-0"
        >
            {playlists?.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center h-[5rem] flex justify-center items-center"
                >
                    <h1>No Playlist Found</h1>
                </motion.div>
            )}

            {authId === userId && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex justify-center mt-5"
                >
                    <Button
                        className="bg-purple-500 text-sm p-2"
                        onClick={() => setOpenCreatePlaylist((prev) => !prev)}
                    >
                        Create Playlist
                    </Button>
                </motion.div>
            )}

            {openCreatePlaylist && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-transparent z-40"
                >
                    <div className="relative w-full max-w-sm border-dotted rounded-lg bg-black bg-opacity-70 backdrop-blur-xl">
                        <form
                            onSubmit={handleSubmit(createPlaylist)}
                            className="w-full space-y-5 p-4"
                        >
                            <h2 className="text-2xl font-bold">Create Playlist</h2>
                            <IoCloseCircleOutline
                                size={30}
                                className="absolute -top-2 right-4 cursor-pointer"
                                onClick={() => setOpenCreatePlaylist((prev) => !prev)}
                            />
                            <Input
                                label="Name: "
                                placeholder="Enter playlist name"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && (
                                <span className="text-red-500 text-sm">
                                    {errors.name.message}
                                </span>
                            )}

                            <Input
                                label="Description: "
                                placeholder="Enter description for your playlist"
                                {...register("description", {
                                    required: "Description is required",
                                })}
                            />
                            {errors.description && (
                                <span className="text-red-500 text-sm">
                                    {errors.description.message}
                                </span>
                            )}
                            <Button className="bg-purple-500 text-sm p-2 w-full" type="submit">
                                Create Playlist
                            </Button>
                        </form>
                    </div>
                </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 p-4 w-full">
                {playlists?.map((playlist) => (
                    <motion.div
                        key={playlist.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                        className="rounded-lg border border-slate-600 overflow-hidden bg-black bg-opacity-50 backdrop-blur-lg shadow-lg"
                    >
                        <Link
                            to={`/playlist/${playlist._id}`}
                            className="relative h-[16rem] w-full flex flex-col justify-between"
                        >
                            {/* Playlist Info Section */}
                            <div className="p-3">
                                <h1 className="text-lg font-semibold text-white">{playlist.name}</h1>
                                <p className="text-xs text-gray-400 line-clamp-2">
                                    {playlist.description}
                                </p>
                            </div>

                            {/* Footer Section */}
                            <div className="absolute bottom-0 left-0 w-full backdrop-blur-md bg-black/40 py-2 px-3 flex justify-between items-center border-t border-gray-700">
                                <div>
                                    <p className="text-xs text-gray-300">
                                        {playlist.totalViews} Views • {timeAgo(playlist.updatedAt)}
                                    </p>
                                </div>
                                <p className="text-xs text-gray-300">{playlist.totalVideos} Videos</p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

        </motion.div>
    );
}

export default ChannelPlaylist;
