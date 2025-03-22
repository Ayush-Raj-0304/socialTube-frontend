import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ChannelHeader, ChannelNavigate } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { userChannelProfile } from "../../store/Slices/userSlice.js";
import { Outlet, useParams } from "react-router-dom";

function Channel() {
    const dispatch = useDispatch();
    const { username } = useParams();

    const channel = useSelector((state) => state.user?.profileData);
    
    useEffect(() => {
        dispatch(userChannelProfile(username));
    }, [dispatch, username]);

    window.scrollTo(0, 0);

    return (
        <>
            {channel && (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 1 }}
                >
                    <ChannelHeader
                        username={username}
                        coverImage={channel?.coverImage.url}
                        avatar={channel?.avatar.url}
                        subscribedCount={channel?.channelsSubscribedToCount}
                        fullName={channel?.fullName}
                        subscribersCount={channel?.subcribersCount}
                        isSubscribed={channel?.isSubscribed}
                        channelId={channel?._id}
                    />
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <ChannelNavigate username={username} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="overflow-y-scroll h-[32rem] sm:h-96 mb-20 sm:mb-0"
            >
                <Outlet />
            </motion.div>
        </>
    );
}

export default Channel;
