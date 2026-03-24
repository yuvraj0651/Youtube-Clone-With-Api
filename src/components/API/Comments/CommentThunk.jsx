import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    commentsData: [],
    currentComment: null,
    currentCommentByVideo: [],
    fetchLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    fetchCurrentLoading: false,
    error: null,
};

// Fetch All Comments
export const fetchAllComments = createAsyncThunk(
    "comment/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/comments");
            if (!response.ok) {
                throw new Error("something went wrong while fetching all comments");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Add New Comment
export const addComment = createAsyncThunk(
    "comment/addComment",
    async (newComment, { rejectWithValue }) => {
        const commentWithData = {
            ...newComment,
            userName: "Yuvraj",
            userAvatar: "https://i.pravatar.cc/40",
            createdAt: new Date().toISOString(),
        };
        try {
            const response = await fetch("http://localhost:5000/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(commentWithData),
            });
            if (!response.ok) {
                throw new Error("something went wrong while adding a new comment");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Delete Comment
export const deleteComment = createAsyncThunk(
    "comment/deleteComment",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/comments/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while deleting a comment");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Update Comment
export const updateComment = createAsyncThunk(
    "comment/updateComment",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/comments/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating a comment");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Fetch Current Comment
export const fetchCurrentComment = createAsyncThunk(
    "comments/fetchCurrent",
    async (commentId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/comments/${commentId}`);
            if (!response.ok) {
                throw new Error("something went wrong while current user comment");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Fetch Comment by video
export const fetchCommentsByVideo = createAsyncThunk(
    "comments/fetchByVideo",
    async (videoId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/comments?videoId=${videoId}`);
            if (!response.ok) {
                throw new Error("Error fetching comments");
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const CommentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllComments.pending, (state) => {
                state.fetchLoading = true;
                state.error = null;
            })
            .addCase(fetchAllComments.fulfilled, (state, action) => {
                state.fetchLoading = false;
                state.commentsData = action.payload;
                state.error = null;
            })
            .addCase(fetchAllComments.rejected, (state, action) => {
                state.fetchLoading = false;
                state.error = action.payload;
            })
            .addCase(addComment.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.addLoading = false;
                state.commentsData.unshift(action.payload);
                state.error = null;
            })
            .addCase(addComment.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteComment.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.commentsData = state.commentsData.filter((item) => item.id !== action.payload)
                state.error = null;
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            })
            .addCase(updateComment.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.commentsData = state.commentsData.map((item) => item.id === action.payload.id ? action.payload : item)
                state.error = null;
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchCurrentComment.pending, (state) => {
                state.fetchCurrentLoading = true;
                state.error = null;
            })
            .addCase(fetchCurrentComment.fulfilled, (state, action) => {
                state.fetchCurrentLoading = false;
                state.currentComment = action.payload;
                state.error = null;
            })
            .addCase(fetchCurrentComment.rejected, (state, action) => {
                state.fetchCurrentLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchCommentsByVideo.pending, (state) => {
                state.fetchCurrentLoading = true;
                state.error = null;
            })
            .addCase(fetchCommentsByVideo.fulfilled, (state, action) => {
                state.fetchCurrentLoading = false;
                state.currentCommentByVideo = action.payload;
                state.error = null;
            })
            .addCase(fetchCommentsByVideo.rejected, (state, action) => {
                state.fetchCurrentLoading = false;
                state.error = action.payload;
            })
    },
});

export default CommentSlice.reducer;