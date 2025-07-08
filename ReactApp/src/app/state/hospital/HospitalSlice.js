import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const registerHospital = createAsyncThunk(
    "hospital/registerHospital",
    async(hospitalData, {rejectWithValue}) => {
        try{
            const response = await axios.post("http://localhost:9000/hospital/api/registerHospital", hospitalData)
            return response.data
        } catch(err) {
            const msg = err.response?.data?.message || err.message ||  "Hospital Registration Failed: Unknown Error"
            return rejectWithValue({ message: msg })
        }
    }
)

export const getHospitals = createAsyncThunk(
    "hospital/getHospitals",
    async(_, thunkAPI) => {
        try{
            const response = await axios.get("http://localhost:9000/hospital/api/getHospitals")
            return response.data
        } catch(err) {
            const msg = err.response?.data?.message || err.message ||  "Hospital fetch failed: Unknown Error"
            return thunkAPI.rejectWithValue({ message: msg })
        }
    }
)

const hospitalSlice = createSlice({
    name: "hospitals",
    initialState: {
        hospitals: null,
        registerLoading: false,
        registerError: null,
        registerMessage: null,
        getLoading: false,
        getError: null,
        getMessage: null
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder

        // Register Vaccine
        .addCase(registerHospital.pending, (state) => {
            state.registerLoading = true
            state.registerError = null
            state.registerMessage = null
        })
        .addCase(registerHospital.fulfilled, (state, action) => {
            state.registerLoading = false;
            state.registerMessage = action.payload.message;
        })
        .addCase(registerHospital.rejected, (state, action) => {
            state.registerLoading = false;
            state.registerError = action.payload.message;
        })

        // Get Vaccines
        .addCase(getHospitals.pending, (state) => {
            state.getLoading = true;
            state.getError = null;
            state.hospitals = null;
        })
        .addCase(getHospitals.fulfilled, (state, action) => {
            state.getLoading = false;
            state.hospitals = action.payload;
        })
        .addCase(getHospitals.rejected, (state, action) => {
            state.getLoading = false;
            state.getError = action.payload.message;
        });
    }
})

export default hospitalSlice.reducer