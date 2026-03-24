const VideoPlayer = ({ currentVideo }) => {
    return (
        <div className="w-full">
            <video
                controls
                className="w-full rounded-xl aspect-video bg-black"
                src={currentVideo?.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"}
            />
        </div>
    );
};

export default VideoPlayer;