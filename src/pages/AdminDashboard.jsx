import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Container,
    DeleteConfirmation,
    HeaderSection,
    Navbar,
    Spinner,
    StatsSection,
    VideoTable,
    EditVideo,
    UploadVideo,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getChannelStats, getChannelVideos } from "../store/Slices/dashboard";
import { deleteAVideo } from "../store/Slices/videoSlice";

function AdminDashboard() {
    const username = useSelector((state) => state.auth.userData?.username);
    const dashboard = useSelector((state) => state.dashboard.channelStats);
    const videos = useSelector((state) => state.dashboard.channelVideos);
    const uploaded = useSelector((state) => state.video.uploaded);
    const publishToggled = useSelector((state) => state.video.publishToggled);
    const deleting = useSelector((state) => state.video.loading);

    const dispatch = useDispatch();
    const [videoDetails, setVideoDetails] = useState(null);
    const [popUp, setPopUp] = useState({
        uploadVideo: false,
        editVideo: false,
        deleteVideo: false,
    });

    const handleDeleteVideo = async () => {
        dispatch(deleteAVideo(videoDetails?._id));
        setPopUp((prev) => ({
            ...prev,
            deleteVideo: !prev.deleteVideo,
        }));
    };

    useEffect(() => {
        dispatch(getChannelStats());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getChannelVideos());
    }, [dispatch, uploaded, publishToggled, deleting]);

    window.scrollTo(0, 0);

    return (
        <>
            <Navbar />
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full relative h-screen text-white space-y-5 z-10 py-4 px-1"
                >
                    {/* Upload Video Popup */}
                    {popUp.uploadVideo && (
                        <motion.div
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <UploadVideo setUploadVideoPopup={setPopUp} />
                        </motion.div>
                    )}

                    {/* Edit Video Popup */}
                    {popUp.editVideo && (
                        <motion.div
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full flex justify-center top-24 fixed z-20"
                        >
                            <EditVideo
                                setEditVideoPopup={setPopUp}
                                title={videoDetails?.title}
                                description={videoDetails?.description}
                                videoId={videoDetails?._id}
                            />
                        </motion.div>
                    )}

                    {/* Delete Video Popup */}
                    {popUp.deleteVideo && (
                        <motion.div
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full fixed top-52 flex justify-center z-20"
                        >
                            <DeleteConfirmation
                                video={true}
                                onCancel={() =>
                                    setPopUp((prev) => ({
                                        ...prev,
                                        deleteVideo: !prev.deleteVideo,
                                    }))
                                }
                                onDelete={handleDeleteVideo}
                            />
                        </motion.div>
                    )}

                    {/* Deleting Spinner */}
                    {deleting && (
                        <motion.div
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full fixed top-20 flex justify-center z-20"
                        >
                            <div className="w-52 border border-slate-600 bg-black flex gap-2 p-3">
                                <Spinner />
                                <span className="text-md font-bold">
                                    Deleting video...
                                </span>
                            </div>
                        </motion.div>
                    )}

                    {/* Dashboard Header */}
                    <HeaderSection username={username} setPopUp={setPopUp} />

                    {/* Channel Stats Section */}
                    <StatsSection dashboard={dashboard} />

                    {/* Table for Managing Channel Videos */}
                    <VideoTable
                        videos={videos}
                        setPopUp={setPopUp}
                        setVideoDetails={setVideoDetails}
                    />
                </motion.div>
            </Container>
        </>
    );
}

export default AdminDashboard;
