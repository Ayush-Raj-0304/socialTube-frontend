import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NoVideosFound, VideoList } from "../../components/index";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../../store/Slices/videoSlice";

function ChannelVideos() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user?.profileData?._id);
    const videos = useSelector((state) => state.video?.videos?.docs);
    const [searchParams, setSearchParams] = useState();
    const [activeButton, setActiveButton] = useState("button1");

    useEffect(() => {
        const sortBy = searchParams?.sortBy;
        const sortType = searchParams?.sortType;
        dispatch(getAllVideos({ userId, sortBy, sortType }));

        return () => dispatch(makeVideosNull());
    }, [dispatch, userId, searchParams]);

    if (videos?.length === 0) {
        return <NoVideosFound />;
    }

    const handleSort = (sortBy, sortType = "asc") => {
        setSearchParams({ sortBy, sortType });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full p-2 text-white"
        >
            {/* Sorting Buttons */}
            <motion.div className="flex gap-4 mb-4">
                {[
                    { label: "Latest", value: "button1", sortBy: "createdAt", sortType: "desc" },
                    { label: "Popular", value: "button2", sortBy: "views", sortType: "desc" },
                    { label: "Oldest", value: "button3", sortBy: "createdAt", sortType: "asc" },
                ].map(({ label, value, sortBy, sortType }) => (
                    <motion.button
                        key={value}
                        onClick={() => {
                            setActiveButton(value);
                            handleSort(sortBy, sortType);
                        }}
                        whileTap={{ scale: 0.9 }}
                        className={`group py-1 px-5 rounded-full transition ${
                            activeButton === value ? "bg-purple-500" : "bg-[#222222]"
                        }`}
                    >
                        {label}
                    </motion.button>
                ))}
            </motion.div>

            {/* Video Listing */}
            <motion.div
                className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
                }}
            >
                {videos?.map((video) => (
                    <motion.div
                        key={video._id}
                        variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <VideoList
                            avatar={video.avatar?.url}
                            duration={video.duration}
                            title={video.title}
                            thumbnail={video.thumbnail?.url}
                            createdAt={video.createdAt}
                            views={video.views}
                            videoId={video._id}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}

export default ChannelVideos;
