import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const storedAuth = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

export const initialState = {
    authData: storedAuth?.user || [],
    currentUser: storedAuth?.currentUser || null,
    isAuthenticated: storedAuth?.isAuthenticated || false,
    token: storedAuth?.token || null,
    loginLoading: false,
    registerLoading: false,
    fetchUserLoading: false,
    statusLoading: false,
    roleLoading: false,
    error: null,
};

// Login User Thunk
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userResponse = await fetch("http://localhost:5000/auth");
            if (!userResponse.ok) {
                throw new Error("something went wrong while logging in user");
            };
            const users = await userResponse.json();

            const existingUser = users.find((user) => user.email === email && user.password === password);

            if (!existingUser) {
                return rejectWithValue("Invalid Credentials");
            };

            return existingUser;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

// Register User Thunk
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (newUser, { rejectWithValue }) => {
        const newUserWithData = {
            ...newUser,
            status: "active",
            role: "user",
        }
        try {
            const userResponse = await fetch("http://localhost:5000/auth");
            if (!userResponse.ok) {
                throw new Error("something went wrong while logging in user");
            };

            const users = await userResponse.json();

            const existingUser = users.find((item) => item.email === newUser.email);

            if (existingUser) {
                return rejectWithValue("User Already Exists");
            };

            const response = await fetch("http://localhost:5000/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUserWithData),
            });
            if (!response.ok) {
                throw new Error("something went wrong while registering new user");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

// Update User Status Thunk
export const updateUserStatus = createAsyncThunk(
    "auth/updateUserStatus",
    async ({ userId, newStatus }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/auth/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating user status");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

// Update User Role Thunk
export const updateUserRole = createAsyncThunk(
    "auth/updateUserRole",
    async ({ userId, newRole }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/auth/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ role: newRole }),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating user role");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

// Fetch Current User
export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/auth/${userId}`);
            if (!response.ok) {
                throw new Error("something went wrong while fetching current user data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.authData = [];
            state.currentUser = null;
            state.isAuthenticated = false;
            state.token = null;
            state.loginLoading = false;
            state.registerLoading = false;
            state.error = null;
            state.statusLoading = false;
            state.roleLoading = false;

            localStorage.removeItem("auth");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loginLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const fakeToken = Math.random().toString(36).substring(2);

                state.loginLoading = false;
                state.authData = action.payload;
                state.currentUser = action.payload;
                state.isAuthenticated = true;
                state.token = fakeToken;
                state.error = null;

                localStorage.setItem("auth", JSON.stringify({
                    user: state.authData,
                    currentUser: action.payload,
                    isAuthenticated: true,
                    token: fakeToken
                }));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loginLoading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.registerLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                const fakeToken = Math.random().toString(36).substring(2);

                state.registerLoading = false;
                state.authData.push(action.payload);
                state.isAuthenticated = true;
                state.token = fakeToken;
                state.error = null;

                localStorage.setItem("auth", JSON.stringify({
                    user: state.authData,
                    currentUser: action.payload,
                    isAuthenticated: true,
                    token: fakeToken
                }));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.registerLoading = false;
                state.error = action.payload;
            })
            .addCase(updateUserStatus.pending, (state) => {
                state.statusLoading = true;
                state.error = null;
            })
            .addCase(updateUserStatus.fulfilled, (state, action) => {
                state.statusLoading = false;
                state.authData = state.authData.map((item) => item.id === action.payload.id ? action.payload : item);
                state.error = null;

                localStorage.setItem("auth", JSON.stringify({
                    user: state.authData,
                    currentUser: action.payload,
                    isAuthenticated: true,
                    token: state.token
                }));
            })
            .addCase(updateUserStatus.rejected, (state, action) => {
                state.statusLoading = false;
                state.error = action.payload;
            })
            .addCase(updateUserRole.pending, (state) => {
                state.roleLoading = true;
                state.error = null;
            })
            .addCase(updateUserRole.fulfilled, (state, action) => {
                state.roleLoading = false;
                state.authData = state.authData.map((item) => item.id === action.payload.id ? action.payload : item);
                state.error = null;

                localStorage.setItem("auth", JSON.stringify({
                    user: state.authData,
                    currentUser: action.payload,
                    isAuthenticated: true,
                    token: state.token,
                }));
            })
            .addCase(updateUserRole.rejected, (state, action) => {
                state.roleLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchCurrentUser.pending, (state) => {
                state.fetchUserLoading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                const fakeToken = Math.random().toString(36).substring(2);

                state.fetchUserLoading = false;
                state.currentUser = action.payload;
                state.isAuthenticated = true;
                state.token = fakeToken;
                state.error = null;

                localStorage.setItem("auth", JSON.stringify({
                    user: state.authData,
                    currentUser: action.payload,
                    isAuthenticated: true,
                    token: fakeToken
                }));
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.fetchUserLoading = false;
                state.error = action.payload;
            })
    },
});

export default AuthSlice.reducer;