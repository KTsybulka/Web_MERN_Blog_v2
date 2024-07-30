import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
    // status: 'idle', // Initialize with 'idle'
}

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/auth/signup', {
                username,
                password,
            })
            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }
            return data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'An error occurred');
            // console.log(error)
        }
    },
)


// export const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: { },
//     extraReducers: {
//         // Register user
//         [registerUser.pending]: (state) => {
//             state.isLoading = true
//             state.status = null
//         },
//         [registerUser.fulfilled]: (state, action) => {
//             state.isLoading = false
//             state.status = action.payload.message
//             state.user = action.payload.user
//             state.token = action.payload.token
//         },
//         [registerUser.rejected]: (state, action) => {
//             state.status = action.payload.message
//             state.isLoading = false
//         },
//     },
// })
//according to updates
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Register user pending
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
          state.status = null; // Clear status or set to 'loading'
        })
        // Register user fulfilled
        .addCase(registerUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.status = action.payload.message || 'Registration successful'; // Use message from payload
          state.user = action.payload.user;
          state.token = action.payload.token;
        })
        // Register user rejected
        .addCase(registerUser.rejected, (state, action) => {
          state.isLoading = false;
          state.status = action.payload || 'An error occurred'; // Use message from payload
        });
    },
  });

    export default authSlice.reducer;