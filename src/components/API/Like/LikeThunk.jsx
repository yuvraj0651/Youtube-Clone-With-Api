import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    likesData: [],
    toggleLoading: false,
    error: null,
};

// Toggle Like
export const toggleLike = createAsyncThunk(
    "likes/toggleLike",
    async ({ userId, videoId }, { rejectWithValue }) => {
        try {
            const likeResponse = await fetch(`http://localhost:5000/videos/${videoId}`);
            if (!likeResponse.ok) {
                throw new Error("something went wrong while fetching user data");
            };

            const userData = await likeResponse.json();

            if (!userData) {
                throw new Error("No User Found");
            };

            const toggleArray = userData?.likes || [];
            let updatedLike;

            if (toggleArray?.includes(userId)) {
                updatedLike = toggleArray?.filter((id) => id !== userId);
            } else {
                updatedLike = [...toggleArray, userId];
            };

            const response = await fetch(`http://localhost:5000/videos/${videoId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ likes: updatedLike }),
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

export const LikeSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(toggleLike.pending, (state) => {
                state.toggleLoading = true;
                state.error = null;
            })
            .addCase(toggleLike.fulfilled, (state, action) => {
                state.toggleLoading = false;
                state.likesData = state.likesData.map((item) => item.id === action.payload.id ? action.payload : item);
                state.error = null;
            })
            .addCase(toggleLike.rejected, (state, action) => {
                state.toggleLoading = false;
                state.error = action.payload;
            })
    }
});

export default LikeSlice.reducer;