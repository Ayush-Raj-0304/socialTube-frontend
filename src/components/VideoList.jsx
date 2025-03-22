import React from "react";
import { motion } from "framer-motion";
import { formatDuration, timeAgo } from "../helpers/timeAgo";
import { useNavigate } from "react-router-dom";

function VideoList({
    thumbnail,
    duration,
    title,
    views = 0,
    avatar,
    channelName,
    createdAt,
    videoId,
}) {
    const navigate = useNavigate();

    const handleAvatarClick = (e) => {
        e.stopPropagation();
        navigate(`/channel/${channelName}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{
                scale: 1.05,
                borderRadius: ["10px", "15px", "10px"], // Morph effect
                transition: { duration: 0.3, ease: "easeInOut" },
            }}
            className="w-full sm:p-2 cursor-pointer "
            onClick={() => navigate(`/watch/${videoId}`)}
        >
            <div className="relative sm:h-60 h-48 rounded overflow-hidden">
                <img
                    src={thumbnail}
                    className="object-cover w-full h-full"
                />
                <span className="absolute bottom-2 right-2 rounded-md text-sm bg-black py-1 px-2">
                    {formatDuration(duration)}
                </span>
            </div>
            <div className="flex items-center py-2 px-2 gap-2">
                {avatar && (
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        onClick={handleAvatarClick}
                        className="rounded-full overflow-hidden border border-slate-700"
                    >
                        <img
                            src={avatar}
                            className="w-10 h-10 object-cover"
                        />
                    </motion.div>
                )}
                <div>
                    <h2 className="font-medium">{title}</h2>
                    <div className="text-xs space-x-1 text-slate-400">
                        <span>{views} Views</span> .
                        <span>{timeAgo(createdAt)}</span>
                    </div>
                    {channelName && (
                        <h2 className="text-xs space-x-1 text-slate-200">
                            {channelName}
                        </h2>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default VideoList;
