import { createAsyncThunk } from "@reduxjs/toolkit";
import { blogService } from "@/shared/services/blog";

export const blogThunk = createAsyncThunk(
    'blogThunk', async (_, thunkAPI) => {
        try {
            const response = await blogService.fetchBlog();


            return response as any;
        } catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
) 