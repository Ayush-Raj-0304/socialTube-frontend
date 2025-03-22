import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getUserTweets } from "../../store/Slices/tweetSlice";
import { TweetAndComment, TweetsList } from "../../components";

function ChannelTweets() {
    const dispatch = useDispatch();
    const authId = useSelector((state) => state.auth?.userData?._id);
    const userId = useSelector((state) => state.user?.profileData?._id);
    const tweets = useSelector((state) => state.tweet?.tweets);

    useEffect(() => {
        if (userId) dispatch(getUserTweets(userId));
    }, [dispatch, userId]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
        >
            {/* Tweet Input Section (Only for Authorized Users) */}
            {authId === userId && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <TweetAndComment tweet={true} />
                </motion.div>
            )}

            {/* Tweets List */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
                }}
            >
                {tweets?.map((tweet) => (
                    <motion.div
                        key={tweet?._id}
                        variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <TweetsList
                            avatar={tweet?.ownerDetails?.avatar.url}
                            content={tweet?.content}
                            createdAt={tweet?.createdAt}
                            likesCount={tweet?.likesCount}
                            tweetId={tweet?._id}
                            username={tweet?.ownerDetails?.username}
                            isLiked={tweet?.isLiked}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}

export default ChannelTweets;
