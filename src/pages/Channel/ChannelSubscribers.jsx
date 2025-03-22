import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getUserChannelSubscribers } from "../../store/Slices/subscriptionSlice";
import { Avatar, Button } from "../../components";
import { Link } from "react-router-dom";

function ChannelSubscribers() {
    const dispatch = useDispatch();
    const channelId = useSelector((state) => state.user.profileData?._id);
    const subscribers = useSelector(
        (state) => state.subscription.channelSubscribers
    );

    useEffect(() => {
        if (channelId) {
            dispatch(getUserChannelSubscribers(channelId));
        }
    }, [dispatch, channelId]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {subscribers?.map((subscriber) => (
                <motion.div
                    key={subscriber?.subscriber?._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link
                        className="flex bg-black bg-opacity-50 backdrop-blur-lg px-3 py-2 justify-between items-center text-white"
                    >
                        <div className="flex gap-3 items-center">
                            <Avatar
                                src={subscriber?.subscriber?.avatar.url}
                                channelName={subscriber?.subscriber?.username}
                            />
                            <div>
                                <h5 className="text-sm">
                                    {subscriber?.subscriber?.username}
                                </h5>
                                <span className="text-xs text-slate-400">
                                    {subscriber?.subscriber?.subscribersCount} Subscribers
                                </span>
                            </div>
                        </div>
                        <motion.div whileTap={{ scale: 0.9 }}>
                            <Button className="bg-purple-500 text-black text-xs py-1 px-2">
                                {subscriber?.subscriber?.subscribedToSubscriber
                                    ? "Subscribed"
                                    : "Subscribe"}
                            </Button>
                        </motion.div>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
}

export default ChannelSubscribers;
