import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const registerVaccine = createAsyncThunk(
    "vaccine/registerVaccine",
    async(vaccineData, {rejectWithValue}) => {
        try{
            const response = await axios.post("http://localhost:9000/vaccine/api/registerVaccine", vaccineData)
            return response.data
        } catch(err) {
            const msg = err.response?.data?.message || err.message ||  "Vaccine Registration Failed: Unknown Error"
            return rejectWithValue({ message: msg })
        }
    }
)

export const getVaccines = createAsyncThunk(
    "vaccine/getVaccines",
    async(_, thunkAPI) => {
        try{
            const response = await axios.get("http://localhost:9000/vaccine/api/getVaccines")
            return response.data
        } catch(err) {
            const msg = err.response?.data?.message || err.message ||  "Vaccine fetch failed: Unknown Error"
            return thunkAPI.rejectWithValue({ message: msg })
        }
    }
)

const vaccineSlice = createSlice({
    name: "vaccines",
    initialState: {
        vaccines: null,
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
        .addCase(registerVaccine.pending, (state) => {
            state.registerLoading = true
            state.registerError = null
            state.registerMessage = null
        })
        .addCase(registerVaccine.fulfilled, (state, action) => {
            state.registerLoading = false;
            state.registerMessage = action.payload.message;
        })
        .addCase(registerVaccine.rejected, (state, action) => {
            state.registerLoading = false;
            state.registerError = action.payload.message;
        })

        // Get Vaccines
        .addCase(getVaccines.pending, (state) => {
            state.getLoading = true;
            state.getError = null;
            state.vaccines = null;
        })
        .addCase(getVaccines.fulfilled, (state, action) => {
            state.getLoading = false;
            state.vaccines = action.payload;
        })
        .addCase(getVaccines.rejected, (state, action) => {
            state.getLoading = false;
            state.getError = action.payload.message;
        });
    }
})

export default vaccineSlice.reducer