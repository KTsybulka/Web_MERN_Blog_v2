import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'


const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
}


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  // async ({ username, password }) => {
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
          // console.log(error)
          if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
          } else {
            return rejectWithValue({ message: error.message });
          }
      }
  },
)

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/login", {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      // Handle error response and reject with appropriate value
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async ({ username, password }) => {
//       try {
//           const { data } = await axios.post('/auth/login', {
//               username,
//               password,
//           })
//           if (data.token) {
//               window.localStorage.setItem('token', data.token)
//           }
//           return data
//       } catch (error) {
//           console.log(error)
//       }
//   },
// )


export const getMe = createAsyncThunk('auth/getMe', async () => {
// export const getMe = createAsyncThunk('auth/loginUser', async () => {  
  try {
      const { data } = await axios.get('/auth/myprofile')
      return data
  } catch (error) {
      console.log(error)
  }
})
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      logout: (state) => {
          state.user = null
          state.token = null
          state.isLoading = false
          state.status = null
      },
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
          state.isLoading = true
          state.status = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
          state.isLoading = false
          state.status = action.payload.message
          state.user = action.payload.user
          state.token = action.payload.token
      })
      .addCase(registerUser.rejected, (state, action) => {
          // state.status = action.error.message  //old
          state.status = action.payload?.message || 'Failed to register';
          state.isLoading = false
      })
      // Login user
      .addCase(loginUser.pending, (state) => {
          state.isLoading = true
          state.status = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
          state.isLoading = false
          state.status = action.payload.message
          state.user = action.payload.user
          state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
          // state.status = action.error.message
          state.status = action.payload?.message || 'Failed to login';
          state.isLoading = false
      })
      // Check auth
      .addCase(getMe.pending, (state) => {
          state.isLoading = true
          state.status = null
      })
      .addCase(getMe.fulfilled, (state, action) => {
          state.isLoading = false
          state.status = null
          state.user = action.payload?.user
          state.token = action.payload?.token
      })
      .addCase(getMe.rejected, (state, action) => {
          // state.status = action.error.message //old
          state.status = action.payload?.message || 'Failed to fetch user';
          state.isLoading = false
      })
  },
})

export const checkIsAuth = (state) => Boolean(state.auth.token)

export const { logout } = authSlice.actions
export default authSlice.reducer

