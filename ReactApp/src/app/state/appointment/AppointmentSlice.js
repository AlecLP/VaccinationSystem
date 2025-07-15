import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { logout } from "../user/UserSlice";

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
    "appointment/getAppointments",
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

export const getAppointmentsByPatient = createAsyncThunk(
    "appointment/getAppointmentsByPatient",
    async(patient, {rejectWithValue}) => {
        try{
            const response = await axios.get("http://localhost:9000/appointment/api/getAppointmentsByPatient", {
                params: { patient }
            })
            return response.data
        } catch(err) {
            const msg = err.response?.data?.message || err.message ||  "Appointment fetch Failed: Unknown Error"
            return rejectWithValue({ message: msg })
        }
    }
)

export const makeAppointmentPayment = createAsyncThunk(
    "appointment/makeAppointmentPayment",
    async({appointmentId}, {rejectWithValue}) => {
        try{
            const response = await axios.put("http://localhost:9000/appointment/api/makePayment", {appointmentId})
            return response.data
        } catch(err) {
            const msg = err.response?.data?.message || err.message ||  "Appointment Payment Failed: Unknown Error"
            return rejectWithValue({ message: msg })
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
        getMessage: null,
        paymentLoading: false,
        paymentMessage: null,
        paymentError: null
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
            state.appointments = null;
        })
        .addCase(getAppointments.fulfilled, (state, action) => {
            state.getLoading = false;
            state.appointments = action.payload;
        })
        .addCase(getAppointments.rejected, (state, action) => {
            state.getLoading = false;
            state.getError = action.payload.message;
        })

         // Get Appointments By Patient
         .addCase(getAppointmentsByPatient.pending, (state) => {
            state.getLoading = true;
            state.getError = null;
            state.appointments = null;
        })
        .addCase(getAppointmentsByPatient.fulfilled, (state, action) => {
            state.getLoading = false;
            state.appointments = action.payload;
        })
        .addCase(getAppointmentsByPatient.rejected, (state, action) => {
            state.getLoading = false;
            state.getError = action.payload.message;
        })

         // Make Appointment Payment
         .addCase(makeAppointmentPayment.pending, (state) => {
            state.paymentLoading = true;
            state.paymentError = null;
            state.paymentMessage = null;
        })
        .addCase(makeAppointmentPayment.fulfilled, (state, action) => {
            state.paymentLoading = false;
            state.paymentMessage = action.payload.message;
        })
        .addCase(makeAppointmentPayment.rejected, (state, action) => {
            state.paymentLoading = false;
            state.paymentError = action.payload.message;
        })

        //Logout
        .addCase(logout, (state) => {
            state.appointments = null;
            state.getLoading = false;
            state.getError = null;
            state.getMessage = null;
            state.scheduleLoading = false;
            state.scheduleError = null;
            state.scheduleMessage = null;
            state.paymentLoading = false;
            state.paymentError = null;
            state.paymentMessage = null;
        });
    }
})

export default appointmentSlice.reducer