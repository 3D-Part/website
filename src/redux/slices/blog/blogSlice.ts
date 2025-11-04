import { blogThunk } from "@/redux/thunks/blogThunk";
import { createSlice } from "@reduxjs/toolkit";

interface IBlog {
    blogData: any[],
    isLoadingBlog: boolean,
}

const initialState: IBlog = {
    blogData: [],
    isLoadingBlog: false,
}

const blogSlice = createSlice({
    name: 'blogSlice',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(blogThunk.pending, (state) => {
            state.isLoadingBlog = true;
        }),
            builder.addCase(blogThunk.fulfilled, (state, action) => {
                state.blogData = action.payload.data;
                state.isLoadingBlog = false;
            })
        builder.addCase(blogThunk.rejected, (state) => {
            state.blogData = [];
            state.isLoadingBlog = false;
        })
    },
})

// export const {} = blogSlice.actions;

export default blogSlice.reducer;