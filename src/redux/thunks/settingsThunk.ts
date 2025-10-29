import { settingsService } from "@/shared/services/settings";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISettings } from "../slices/settings/settingsSlice";

export const settingsThunk = createAsyncThunk(
    'settingsThunk', async (_, thunkAPI) => {
        try {
            const response = await settingsService.fetchSettings();

            console.log(response);

            return response as ISettings['data'];
        } catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
) 