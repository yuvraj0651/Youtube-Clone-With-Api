import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    subscribersData: [],
    fetchLoading: false,
    toggleLoading: false,
    error: null,
};

// Fetch All Subscribers
export const fetchAllSubs = createAsyncThunk(
    "subscribe/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/subscriptions`);
            if (!response.ok) {
                throw new Error("something went wrong fetching all subscribers");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const toggleSubscribe = createAsyncThunk(
    "subscribe/toggleSubs",
    async ({ userId, channelId }, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/subscriptions");

            if (!response.ok) {
                throw new Error("error fetching subscriptions");
            }

            const data = await response.json();

            const existingSub = data.find(
                (item) =>
                    item.userId === userId &&
                    item.channelId === channelId
            );

            if (existingSub) {
                await fetch(
                    `http://localhost:5000/subscriptions/${existingSub.id}`,
                    { method: "DELETE" }
                );

                return { type: "REMOVE", id: existingSub.id };
            }

            const newSub = { userId, channelId };

            const res = await fetch(
                `http://localhost:5000/subscriptions`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newSub),
                }
            );

            const created = await res.json();

            return { type: "ADD", data: created };

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const SubscribeSlice = createSlice({
    name: "subscribe",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // FETCH
            .addCase(fetchAllSubs.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllSubs.fulfilled, (state, action) => {
                state.fetchLoading = false;
                state.subscribersData = action.payload;
            })
            .addCase(fetchAllSubs.rejected, (state, action) => {
                state.fetchLoading = false;
                state.error = action.payload;
            })

            .addCase(toggleSubscribe.pending, (state) => {
                state.toggleLoading = true;
            })
            .addCase(toggleSubscribe.fulfilled, (state, action) => {
                state.toggleLoading = false;

                if (action.payload.type === "REMOVE") {
                    state.subscribersData = state.subscribersData.filter(
                        (item) => item.id !== action.payload.id
                    );
                }

                if (action.payload.type === "ADD") {
                    state.subscribersData.push(action.payload.data);
                }
            })
            .addCase(toggleSubscribe.rejected, (state, action) => {
                state.toggleLoading = false;
                state.error = action.payload;
            });
    }
});

export default SubscribeSlice.reducer;