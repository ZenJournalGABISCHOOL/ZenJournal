import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../BASEURL';

// Configure axios for CORS
axios.defaults.withCredentials = false; // Try without credentials first
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const initialState = {
  user: null,
  name: null,
  isSignedIn: false,
  isAdmin: false,
  isAuthor: false,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
    "auth/login",
    async(credentials, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, credentials, {
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            return response.data;
        } catch(error) {
            console.log("Login error:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
export const checkForRegistration = createAsyncThunk(
    "auth/register",
    async(_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASE_URL}/auth/register`, {
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            return response.data;
        } catch(error) {
            console.log(error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
export const registration = createAsyncThunk(
    "auth/register",
    async(credentials, {rejectWithValue}) => {
        try {
            console.log("Attempting registration with:", credentials);
            console.log("Using BASE_URL:", BASE_URL);
            
            const response = await axios.post(`${BASE_URL}/auth/register`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                timeout: 15000, // 15 second timeout
            });
            
            console.log("Registration successful:", response.data);
            return response.data;
            
        } catch(error) {
            console.log("Registration error details:", {
                message: error.message,
                code: error.code,
                response: error.response?.data,
                status: error.response?.status,
                url: error.config?.url
            });
            
            if (error.code === 'ERR_NETWORK') {
                return rejectWithValue('Network connection failed. Please check your internet connection and try again.');
            }
            
            if (error.response?.status === 400) {
                return rejectWithValue(error.response.data?.message || 'Invalid registration data');
            }
            
            if (error.response?.status === 409) {
                return rejectWithValue('Email already exists. Please use a different email.');
            }
            
            return rejectWithValue(error.response?.data?.message || error.message || 'Registration failed');
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
        // Login
        builder
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.name = action.payload.name;
            console.log("Login successful:", action.payload);
            state.isSignedIn = true;
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            console.error("Login failed:", action.payload);
        })
        // Registration
        builder
        .addCase(registration.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registration.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            console.log("Registration successful:", action.payload);
            state.isSignedIn = true;
        })
        .addCase(registration.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            console.error("Registration failed:", action.payload);
        });
    }
})
export const {  } = authSlice.actions;
export default authSlice.reducer;
