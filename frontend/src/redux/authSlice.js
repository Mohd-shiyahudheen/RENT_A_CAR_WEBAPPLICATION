import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import authServices from './authServices'


//Get datas from localStorage//

const user = JSON.parse(localStorage.getItem("userInfo"))

const initialState ={
    user: user ? user:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

//Register User//
export const register = createAsyncThunk ('auth/register',async(user,thunkAPI)=>{
try {
    localStorage.setItem("userInfo", JSON.stringify(user));
    return user
    
} catch (error) {
    const message = (error.respose && error.respose.data && error.respose.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
}
})



//Add car//
export const addCar = createAsyncThunk('auth/addCar', async (car, thunkAPI) => {
    try {
        localStorage.setItem("carInfo", JSON.stringify(car));
        return car

    } catch (error) {
        const message = (error.respose && error.respose.data && error.respose.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})


//Display users

export const display = createAsyncThunk('auth/viewUser', async (users, thunkAPI) => {
    try {
        localStorage.setItem("Users", JSON.stringify(users));
        return users

    } catch (error) {
        const message = (error.respose && error.respose.data && error.respose.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})


//store Blog datas
export const booking = createAsyncThunk('auth/booking', async (data, thunkAPI) => {
    try {
        localStorage.setItem("BookingData", JSON.stringify(data));
        return data

    } catch (error) {
        const message = (error.respose && error.respose.data && error.respose.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})




export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },

    },
    extraReducers:(builder)=>{
        builder
        .addCase(register.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
    },
    extraReducers: (builder) => {
        builder
            .addCase(booking.pending, (state) => {
                state.isLoading = true
            })
            .addCase(booking.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(booking.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    },

    extraReducers: (builder) => {
        builder
            .addCase(display.pending, (state) => {
                state.isLoading = true
            })
            .addCase(display.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(display.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    },
})

export const {reset} = authSlice.actions;

export default authSlice.reducer

