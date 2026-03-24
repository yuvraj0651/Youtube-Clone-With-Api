import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    videosData: [],
    currentVideo: null,
    suggestedVideos: [],
    suggestedLoading: false,
    hasMore: true,
    fetchAllLoading: false,
    fetchCurrentLoading: false,
    toggleLoading: {},
    error: null,
};

// Fetch All Videos
export const fetchAllVideos = createAsyncThunk(
    "video/fetchAll",
    async (page = 1, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/videos?_limit=9&_page=${page}`);
            if (!response.ok) {
                throw new Error("something went wrong fetching all videos");
            };
            const data = await response.json();
            return { data, page };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Fetch Current Video
export const fetchCurrentVideo = createAsyncThunk(
    "video/fetchCurrent",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/videos/${id}`);
            if (!response.ok) {
                throw new Error("something went wrong fetching current video");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Video Like Toggle
export const toggleVideoLike = createAsyncThunk(
    "video/toggleLike",
    async ({ userId, videoId }, { rejectWithValue }) => {
        try {
            const videoResponse = await fetch(`http://localhost:5000/videos/${videoId}`);
            if (!videoResponse.ok) {
                throw new Error("Video not found");
            };
            const videoData = await videoResponse.json();

            const likesArray = videoData?.likes || [];
            let updatedToggle;

            if (likesArray.includes(userId)) {
                updatedToggle = likesArray.filter((id) => id !== userId);
            } else {
                updatedToggle = [...likesArray, userId];
            };

            const response = await fetch(`http://localhost:5000/videos/${videoId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ likes: updatedToggle }),
            });
            if (!response.ok) {
                throw new Error("something went wrong while toggling like");
            };
            const data = await response.json();
            return data;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchSuggestedVideos = createAsyncThunk(
    "video/fetchSuggested",
    async ({ category, currentId }, { rejectWithValue }) => {
        try {
            const res = await fetch(
                `http://localhost:5000/videos?category=${category}`
            );

            const data = await res.json();

            const filtered = data.filter((video) => video.id !== currentId);

            return filtered;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const VideoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllVideos.pending, (state) => {
                state.fetchAllLoading = true;
                state.error = null;
            })
            .addCase(fetchAllVideos.fulfilled, (state, action) => {
                state.fetchAllLoading = false;

                if (action.payload.page === 1) {
                    state.videosData = action.payload.data;
                } else {
                    const newVideos = action.payload.data;

                    const existingIds = new Set(state.videosData.map(v => v.id));

                    const filteredVideos = newVideos.filter(
                        v => !existingIds.has(v.id)
                    );

                    state.videosData = [
                        ...state.videosData,
                        ...filteredVideos
                    ];
                }

                state.hasMore = action.payload.data.length === 9;
                state.error = null;
            })
            .addCase(fetchAllVideos.rejected, (state, action) => {
                state.fetchAllLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchSuggestedVideos.pending, (state) => {
                state.suggestedLoading = true;
            })
            .addCase(fetchSuggestedVideos.fulfilled, (state, action) => {
                state.suggestedLoading = false;
                state.suggestedVideos = action.payload;
            })
            .addCase(fetchSuggestedVideos.rejected, (state) => {
                state.suggestedLoading = false;
            })
            .addCase(fetchCurrentVideo.pending, (state) => {
                state.fetchCurrentLoading = true;
                state.error = null;
            })
            .addCase(fetchCurrentVideo.fulfilled, (state, action) => {
                state.fetchCurrentLoading = false;
                state.currentVideo = action.payload;
                state.error = null;
            })
            .addCase(fetchCurrentVideo.rejected, (state, action) => {
                state.fetchCurrentLoading = false;
                state.error = action.payload;
            })
            .addCase(toggleVideoLike.pending, (state) => {
                const videoId = action?.meta?.arg?.videoId;
                state.toggleLoading[videoId] = true;
                state.error = null;
            })
            .addCase(toggleVideoLike.fulfilled, (state, action) => {
                const updatedVideo = action.payload;
                
                state.toggleLoading[updatedVideo?.id] = false;

                state.videosData = state.videosData.map((video) =>
                    video.id === updatedVideo.id ? updatedVideo : video
                );

                if (state.currentVideo?.id === updatedVideo.id) {
                    state.currentVideo = updatedVideo;
                }

                state.error = null;
            })
            .addCase(toggleVideoLike.rejected, (state, action) => {
                const videoId = action?.meta?.arg?.videoId;
                state.toggleLoading[videoId] = false;
                state.error = action.payload;
            })
    }
});

export default VideoSlice.reducer;