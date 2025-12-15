import { settingsThunk } from "@/redux/thunks/settingsThunk";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISettings {
    isLoadingSettings: boolean;
    data: {
        id: string,
        settings: {
            banner: {
                text: string
            },
            company: {
                town: string,
                email: string[],
                phone: string,
                address: string
            },
            delivery: {
                cost: number,
                freeDeliveryLimit: number
            }
        },
        createdAt: string,
        updatedAt: string
    }
}

const initialState: ISettings = {
    isLoadingSettings: false,
    data: {
        id: '',
        settings: {
            banner: {
                text: ''
            },
            company: {
                town: '',
                email: [],
                phone: '',
                address: ''
            },
            delivery: {
                cost: 10,
                freeDeliveryLimit: 100
            }
        },
        createdAt: '',
        updatedAt: ''
    },
};

const settingsSlice = createSlice({
    name: 'settingsSlice',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(settingsThunk.pending, (state, actions) => {
        }),
            builder.addCase(settingsThunk.fulfilled, (state, actions: PayloadAction<ISettings['data'] | undefined>) => {
                if (actions.payload) {
                    state.data = actions.payload;
                }
            }),
            builder.addCase(settingsThunk.rejected, (state, actions) => {
            })
    },
})

// export const {} = settingsSlice.actions;

export default settingsSlice.reducer;