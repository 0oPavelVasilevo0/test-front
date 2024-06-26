import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://reqres.in/api/login', { email, password });
            return response.data.token;
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                return rejectWithValue(err.response.data.error || 'Login failed');
            }
            return rejectWithValue('Login failed');
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://reqres.in/api/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue('Failed to fetch current user');
        }
    }
);


export const register = createAsyncThunk(
    'auth/register',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://reqres.in/api/register', { email, password });
            return response.data.token;
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                return rejectWithValue(err.response.data.error || 'Registration failed');
            }
            return rejectWithValue('Registration failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('likedUsers');//ls like
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                localStorage.setItem('token', action.payload);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                localStorage.setItem('token', action.payload);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, 
    // setCurrentUser 
} = authSlice.actions;

export default authSlice.reducer;