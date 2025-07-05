import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async(userData, {rejectWithValue}) => {
        try{
            const response = await axios.post("http://localhost:9000/user/api/register", userData)
            return response.data
        } catch(err) {
            const msg = err.response?.data?.message || err.message ||  "Registration Failed: Unknown Error"
            return rejectWithValue({ message: msg })
        }
    }
)

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async(loginData, {rejectWithValue}) => {
        try{
            const response = await axios.post("http://localhost:9000/user/api/login", loginData)
            return response.data
        } catch(err) {
            const msg = err.response?.data?.message || err.message ||  "Login Failed: Unknown Error"
            return rejectWithValue({ message: msg })
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        error: null,
        message: null
    },
    reducers: {
        logout(state){
            state.user = null
            state.error = null
            state.message = null
        },
        clearMessages(state) {
            state.message = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder

        // Register
        .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        })
        .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        })

        // Login
        .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        });
    }
})

export const {logout, clearMessages} = userSlice.actions
export default userSlice.reducer