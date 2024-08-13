import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    posts: [],
    popularPosts: [],
    loading: false,
}

export const createPost = createAsyncThunk(
    'post/createPost',
    async (params) => {
        try {
            const { data } = await axios.post('/posts', params)
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const getAllPosts = createAsyncThunk('post/getAllPosts', async () => {
    try {
        const { data } = await axios.get('/posts')
        return data
    } catch (error) {
        console.log(error)
    }
})

//funcion remove post
export const removePost = createAsyncThunk('post/removePost', async (id) => {
    try {
        //remove post by id
        // const { data } = await axios.delete(`/posts/${id}`, id) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const { data } = await axios.delete(`/posts/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updatePost = createAsyncThunk(
    'post/updatePost',
    async (updatedPost) => {
        try {
            const { data } = await axios.put(
                `/posts/${updatedPost.id}`,
                updatedPost,
            )
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Post creating
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.push(action.payload);
            })
            .addCase(createPost.rejected, (state) => {
                state.loading = false;
            })
            // Getting all posts
            .addCase(getAllPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.loading = false;
                // state.posts.push(action.payload);
                state.posts = action.payload.posts
                state.popularPosts = action.payload.popularPosts
            })
            .addCase(getAllPosts.rejected, (state) => {
                state.loading = false;
            })

            // Remove the post
            .addCase(removePost.pending, (state) => {
                state.loading = true;//change loading
            })
            .addCase(removePost.fulfilled, (state, action) => {
                state.loading = false; // desplay falls wheb delete
                state.posts = state.posts.filter( // find in existied post in which
                    // We have an array of posts, and we want to remove a specific post based on its unique ID (_id). 
                    // We achieve this by using the filter() method, which creates a new array excluding the post with the specified ID.
                    // and we asign new array to our state
                    (post) => post._id !== action.payload._id,
                )
            })
            .addCase(removePost.rejected, (state) => {
                state.loading = false;
            })
            // Update post
            .addCase(updatePost.pending, (state) => {
                state.loading = true;//change loading
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.loading = false
                const index = state.posts.findIndex(
                    (post) => post._id === action.payload._id,
                )
                state.posts[index] = action.payload
            })
            .addCase(updatePost.rejected, (state) => {
                state.loading = false
            });
    }
})

export default postSlice.reducer