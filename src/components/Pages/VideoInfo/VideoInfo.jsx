import { ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSubscribe } from "../../API/Subscribe/SubsctibeThunk";
import { toggleVideoLike } from "../../API/Video/VideoThunk";

const VideoInfo = ({ currentVideo }) => {

    const dispatch = useDispatch();

    const { subscribersData, toggleLoading } = useSelector((state) => state.subscribe);
    const { authData, isAuthenticated } = useSelector((state) => state.auth);
    const { toggleLoading: toggleLoad } = useSelector((state) => state.videos);

    const isSubscribed = subscribersData?.some((item) => item.userId === authData?.id && item.channelId === currentVideo?.channelId);
    const isLiked = authData?.id && currentVideo?.likes?.includes(authData?.id);

    console.log(isSubscribed);

    const handleSubscribe = () => {
        dispatch(toggleSubscribe({
            userId: authData?.id,
            channelId: currentVideo?.channelId,
        }));
    };

    const subscribersCount = subscribersData?.filter((item) => item.channelId === currentVideo?.channelId);

    return (
        <div className="mt-4">

            {/* TITLE */}
            <h1 className="text-lg font-semibold">
                {currentVideo?.title || "N/A"}
            </h1>

            {/* CHANNEL + ACTIONS */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-3 gap-3">

                {/* LEFT */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-700 rounded-full" />

                    <div>
                        <p className="text-sm font-medium">{currentVideo?.channelName}</p>
                        <p className="text-xs text-gray-400">{subscribersCount.length || 0} subscribers</p>
                    </div>

                    <button
                        onClick={handleSubscribe}
                        disabled={toggleLoading[currentVideo?.channelId]}
                        className={`px-4 py-1 rounded-full text-sm font-semibold transition 
                            ${isSubscribed
                                ? "bg-gray-700 text-white"
                                : "bg-white text-black"
                            }`}>
                        {
                            toggleLoading[currentVideo?.channelId]
                                ? "Loading..."
                                : isSubscribed
                                    ? "Subscribed"
                                    : "Subscribe"
                        }
                    </button>
                </div>

                {/* RIGHT */}
                <div className="flex gap-3 flex-wrap">
                    <button
                        disabled={toggleLoad[currentVideo?.id] || false}
                        onClick={() => dispatch(toggleVideoLike({
                            userId: authData?.id,
                            videoId: currentVideo?.id
                        }))}
                        className={`px-3 py-1 rounded-full flex items-center gap-1 ${isLiked ? "bg-blue-600" : "bg-gray-800"
                            }`}>
                        <ThumbsUp size={16} /> {toggleLoad[currentVideo?.id] ? "..." : currentVideo?.likes.length}
                    </button>
                    <button className="bg-gray-800 px-3 py-1 rounded-full flex items-center gap-1">
                        <ThumbsDown size={16} /> {currentVideo?.dislikes.length || 0}
                    </button>
                    <button className="bg-gray-800 px-3 py-1 rounded-full flex items-center gap-1">
                        <Share2 size={16} /> Share
                    </button>
                </div>

            </div>

            {/* DESCRIPTION */}
            <div className="bg-gray-900 p-3 rounded-lg mt-3 text-sm text-gray-300">
                {currentVideo?.views} views • 2 years ago <br />
                {currentVideo?.description}
            </div>

        </div>
    );
};

export default VideoInfo;