import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    watchLaterData: [],
    fetchAllLoading: false,
    toggleLoading: false,
    error: null,
};

export const fetchAllWatchLater = createAsyncThunk(
    "watchLater/fetchAll",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `http://localhost:5000/watchLater?userId=${userId}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch watch later videos");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const toggleWatchLater = createAsyncThunk(
    "watchLater/toggle",
    async ({ userId, video }, { rejectWithValue }) => {
        try {
            // 🔍 check already exists
            const checkRes = await fetch(
                `http://localhost:5000/watchLater?userId=${userId}&videoId=${video.id}`
            );

            const existing = await checkRes.json();

            // ❌ REMOVE
            if (existing.length > 0) {
                const deleteRes = await fetch(
                    `http://localhost:5000/watchLater/${existing[0].id}`,
                    {
                        method: "DELETE",
                    }
                );

                if (!deleteRes.ok) {
                    throw new Error("Failed to remove from watch later");
                }

                return { type: "remove", id: existing[0].id };
            }

            const newItem = {
                userId,
                videoId: video.id,
                video,
                createdAt: new Date().toISOString(),
            };

            const addRes = await fetch(
                `http://localhost:5000/watchLater`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newItem),
                }
            );

            if (!addRes.ok) {
                throw new Error("Failed to add to watch later");
            }

            const data = await addRes.json();

            return { type: "add", data };

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const WatchLaterSlice = createSlice({
    name: "watchLater",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllWatchLater.pending, (state) => {
                state.fetchAllLoading = true;
                state.error = null;
            })
            .addCase(fetchAllWatchLater.fulfilled, (state, action) => {
                state.fetchAllLoading = false;
                state.watchLaterData = action.payload;
            })
            .addCase(fetchAllWatchLater.rejected, (state, action) => {
                state.fetchAllLoading = false;
                state.error = action.payload;
            })

            .addCase(toggleWatchLater.pending, (state) => {
                state.toggleLoading = true;
                state.error = null;
            })
            .addCase(toggleWatchLater.fulfilled, (state, action) => {
                state.toggleLoading = false;

                if (action.payload.type === "add") {
                    state.watchLaterData.unshift(action.payload.data);
                } else {
                    state.watchLaterData = state.watchLaterData.filter(
                        (item) => item.id !== action.payload.id
                    );
                }
            })
            .addCase(toggleWatchLater.rejected, (state, action) => {
                state.toggleLoading = false;
                state.error = action.payload;
            });
    },
});

export default WatchLaterSlice.reducer;