import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const scheduleAppointment = createAsyncThunk(
    "appointment/scheduleAppointment",
    async(appointmentData, {rejectWithValue}) => {
        try{
            const response = await axios.post("http://localhost:9000/appointment/api/scheduleAppointment", appointmentData)
            return response.data
        } catch(err) {
            const msg = err.response?.data?.message || err.message ||  "Appointment Scheduling Failed: Unknown Error"
            return rejectWithValue({ message: msg })
        }
    }
)

export const getAppointments = createAsyncThunk(
    "appointent/getAppointments",
    async(_, thunkAPI) => {
        try{
            const response = await axios.get("http://localhost:9000/appointment/api/getAppointments")
            return response.data
        } catch(err) {
            const msg = err.response?.data?.message || err.message ||  "Appointment fetch failed: Unknown Error"
            return thunkAPI.rejectWithValue({ message: msg })
        }
    }
)

const appointmentSlice = createSlice({
    name: "appointments",
    initialState: {
        appointments: null,
        scheduleLoading: false,
        scheduleError: null,
        scheduleMessage: null,
        getLoading: false,
        getError: null,
        getMessage: null
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder

        // Schedule Appointment
        .addCase(scheduleAppointment.pending, (state) => {
            state.scheduleLoading = true
            state.scheduleError = null
            state.scheduleMessage = null
        })
        .addCase(scheduleAppointment.fulfilled, (state, action) => {
            state.scheduleLoading = false;
            state.scheduleMessage = action.payload.message;
        })
        .addCase(scheduleAppointment.rejected, (state, action) => {
            state.scheduleLoading = false;
            state.scheduleError = action.payload.message;
        })

        // Get Appointments
        .addCase(getAppointments.pending, (state) => {
            state.getLoading = true;
            state.getError = null;
            state.hospitals = null;
        })
        .addCase(getAppointments.fulfilled, (state, action) => {
            state.getLoading = false;
            state.appointments = action.payload;
        })
        .addCase(getAppointments.rejected, (state, action) => {
            state.getLoading = false;
            state.getError = action.payload.message;
        });
    }
})

export default appointmentSlice.reducer