import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../../API/Auth/AuthThunk";
import CommentReducer from "../../API/Comments/CommentThunk";
import VideoReducer from "../..//API/Video/VideoThunk";
import WatchLaterReducer from "../../API/WatchLater/WatchLaterThunk";
import SubscribeReducer from "../../API/Subscribe/SubsctibeThunk";

const Store = configureStore({
    reducer: {
        auth: AuthReducer,
        comments: CommentReducer,
        videos: VideoReducer,
        watchLater: WatchLaterReducer,
        subscribe: SubscribeReducer,
    }
});

export default Store;