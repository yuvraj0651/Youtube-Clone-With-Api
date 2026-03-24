import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVideos } from "../../API/Video/VideoThunk";
import { Link } from "react-router";
import LazyImage from "../../UI/LazyImage/LazyImage";

const VideoGrid = ({ searchTerm }) => {
    const [page, setPage] = useState(1);

    const loadMore = () => {
        setPage((prev) => prev + 1);
    };

    const dispatch = useDispatch();
    const sectionRef = useRef(null);
    const isFetchingRef = useRef(false);

    useEffect(() => {
        isFetchingRef.current = true;

        dispatch(fetchAllVideos(page)).finally(() => {
            isFetchingRef.current = false;
        });
    }, [page, dispatch]);

    const { videosData, fetchAllLoading, error, hasMore } = useSelector((state) => state.videos);
    console.log(videosData, fetchAllLoading, error);

    const filteredVideosData = useMemo(() => {
        if (!searchTerm.trim()) return videosData;

        return videosData?.filter((item) => {
            return item.title.toLowerCase().includes(searchTerm.toLowerCase());
        })
    }, [searchTerm, videosData]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];

            if (entry.isIntersecting && hasMore && !fetchAllLoading && !isFetchingRef.current) {
                loadMore();
            }
        }, {
            rootMargin: "100px"
        });

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current)
        };
    }, [hasMore, fetchAllLoading]);

    if (fetchAllLoading && page === 1) {
        return (
            <p className="text-center col-span-full tracking-wide capitalize text-[0.9rem] h-screen flex items-center justify-center w-full">Loading videos...</p>
        )
    };

    if (error) {
        return (
            <p className="text-center col-span-full tracking-wide capitalize text-[0.9rem] h-screen flex items-center justify-center w-full">something went wrong</p>
        )
    }

    return (
        <div
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 pb-20"
        >
            {filteredVideosData?.map((video) => (
                <VideoCard key={video.id} video={video} />
            ))}

            {
                hasMore && (
                    <div
                        ref={sectionRef}
                        className="col-span-full text-center py-5 text-gray-400"
                    >
                        Loading more...
                    </div>
                )
            }
        </div>
    );
};

const VideoCard = ({ video }) => {
    return (
        <div className="cursor-pointer hover:scale-[1.03] transition-all duration-200">

            {/* Thumbnail */}
            <div className="relative">
                <Link to={`/video-detail/${video.id}`}>
                    <LazyImage
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full aspect-video object-cover rounded-xl"
                    />
                </Link>

                {/* Duration (Fake for UI) */}
                <span className="absolute bottom-2 right-2 bg-black/80 text-xs px-1 rounded">
                    12:30
                </span>
            </div>

            {/* Info */}
            <div className="flex gap-3 mt-3">

                {/* Channel Avatar */}
                <div className="w-10 h-10 bg-gray-700 rounded-full flex-shrink-0" />

                {/* Text */}
                <div className="flex flex-col">
                    <Link to={`/video-detail/${video.id}`}>
                        <h3 className="text-white text-sm font-semibold line-clamp-2">
                            {video.title}
                        </h3>
                    </Link>

                    <p className="text-gray-400 text-xs mt-1">
                        {video.channel}
                    </p>

                    <p className="text-gray-400 text-xs">
                        {video.views} • 2 days ago
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VideoGrid;