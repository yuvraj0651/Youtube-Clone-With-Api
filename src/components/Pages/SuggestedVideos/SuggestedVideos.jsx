import { useSelector } from "react-redux";

const SuggestedVideos = () => {

    const { suggestedVideos } = useSelector((state) => state.videos);

    return (
        <div className="flex flex-col gap-4">

            {suggestedVideos?.map((video) => (
                <div key={video.id} className="flex gap-3 cursor-pointer">

                    <img
                        src={video.thumbnail}
                        className="w-40 h-24 object-cover rounded-lg"
                    />

                    <div>
                        <h3 className="text-sm font-semibold line-clamp-2">
                            {video.title}
                        </h3>
                        <p className="text-xs text-gray-400">{video.channel}</p>
                        <p className="text-xs text-gray-400">{video.views}</p>
                    </div>

                </div>
            ))}

        </div>
    );
};

export default SuggestedVideos;