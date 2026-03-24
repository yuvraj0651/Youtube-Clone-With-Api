import VideoPlayer from "../VideoPlayer/VideoPlayer";
import VideoInfo from "../VideoInfo/VideoInfo";
import Comments from "../Comments/Comments";
import SuggestedVideos from "../SuggestedVideos/SuggestedVideos";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentVideo, fetchSuggestedVideos } from "../../API/Video/VideoThunk";

const VideoDetail = () => {

    const { id } = useParams();
    console.log(id);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrentVideo(id));
    }, [id]);

    const { currentVideo, fetchCurrentLoading } = useSelector((state) => state.videos);
    console.log("CurrentVideo", currentVideo);

    useEffect(() => {
        if (currentVideo) {
            dispatch(fetchSuggestedVideos({
                category: currentVideo.category,
                currentId: currentVideo.id,
            }))
        }
    }, [currentVideo]);

    if (fetchCurrentLoading) {
        return (
            <p className="text-center col-span-full tracking-wide capitalize text-[0.9rem] h-screen flex items-center justify-center w-full">Loading videos...</p>
        )
    }

    return (
        <div className="bg-[#0f0f0f] text-white min-h-screen pt-14 px-4">

            <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">

                {/* LEFT SIDE */}
                <div className="flex-1">
                    <VideoPlayer currentVideo={currentVideo} />
                    <VideoInfo currentVideo={currentVideo} />
                    <Comments currentVideo={currentVideo} />
                </div>

                {/* RIGHT SIDE */}
                <div className="w-full lg:w-[380px]">
                    <SuggestedVideos />
                </div>

            </div>
        </div>
    );
};

export default VideoDetail;