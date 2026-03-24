import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsByVideo } from "../../API/Comments/CommentThunk";

const Comments = ({ currentVideo }) => {

    const dispatch = useDispatch();

    const { currentCommentByVideo, fetchCurrentLoading } = useSelector((state) => state.comments);

    useEffect(() => {
        if (currentVideo?.id) {
            dispatch(fetchCommentsByVideo(currentVideo?.id));
        }
    }, [currentVideo?.id , dispatch]);

    if (fetchCurrentLoading) {
        return (
            <p>Loading your comments</p>
        )
    }

    return (
        <div className="mt-6">

            <h2 className="text-lg font-semibold mb-4">Comments</h2>

            {/* ADD COMMENT */}
            <div className="flex gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-700 rounded-full" />
                <input
                    placeholder="Add a comment..."
                    className="flex-1 bg-transparent border-b border-gray-600 outline-none"
                />
            </div>

            {/* COMMENT LIST */}
            <div className="flex flex-col gap-4 mb-9">
                {currentCommentByVideo?.map((c) => (
                    <div key={c.id} className="flex gap-3">
                        <div className="w-10 h-10 bg-gray-700 rounded-full" />
                        <div>
                            <p className="text-sm font-medium">{c.name}</p>
                            <p className="text-sm text-gray-300">{c.text}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Comments;