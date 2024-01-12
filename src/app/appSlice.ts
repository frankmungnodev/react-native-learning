import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ThemeType, darkTheme, getThemeFromValue, systemTheme } from "./theme";


interface AppState {
    theme: ThemeType
}

const initialState: AppState = {
    theme: darkTheme
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // Check theme
        builder.addCase(checkTheme.fulfilled, (state, action: PayloadAction<ThemeType>) => {
            state.theme = action.payload;
        });
        builder.addCase(checkTheme.rejected, (state) => {
            state.theme = systemTheme;
        })

        // Update theme
        builder.addCase(updateTheme.fulfilled, (state, action) => {
            state.theme = action.payload;
        });
    }
});

export const checkTheme = createAsyncThunk<ThemeType, void>(
    'check-theme',
    async (_, thunkAPI) => {
        try {
            const savedThemeValue = await AsyncStorage.getItem('theme');
            return getThemeFromValue(savedThemeValue);
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to fetch theme')
        }
    }
)

export const updateTheme = createAsyncThunk<ThemeType, ThemeType>(
    'update-theme',
    async (payload, thunkAPI) => {
        try {
            await AsyncStorage.setItem('theme', payload.value);
            return payload;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to update theme');
        }
    }
)

export const selectTheme = (state: RootState) => state.app.theme;

export const { } = appSlice.actions;
export default appSlice.reducer;