// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from 'axios';

// // export interface User {
// //     id: number;
// //     email: string;
// //     first_name: string;
// //     last_name: string;
// //     avatar: string;
// // }

// // interface UsersState {
// //     users: User[];
// //     loading: boolean;
// //     error: string | null;
// // }

// // const initialState: UsersState = {
// //     users: [],
// //     loading: false,
// //     error: null,
// // };

// // export const fetchUsers = createAsyncThunk('users/fetchUsers', async (token: string) => {
// //     const response = await axios.get('https://reqres.in/api/users', {
// //         headers: {
// //             Authorization: `Bearer ${token}`,
// //         },
// //     });
// //     return response.data.data;
// // });

// // const usersSlice = createSlice({
// //     name: 'users',
// //     initialState,
// //     reducers: {},
// //     extraReducers: (builder) => {
// //         builder
// //             .addCase(fetchUsers.pending, (state) => {
// //                 state.loading = true;
// //                 state.error = null;
// //             })
// //             .addCase(fetchUsers.fulfilled, (state, action) => {
// //                 state.loading = false;
// //                 state.users = action.payload;
// //             })
// //             .addCase(fetchUsers.rejected, (state) => {
// //                 state.loading = false;
// //                 state.error = 'Failed to fetch users';
// //             });
// //     },
// // });

// // export default usersSlice.reducer;
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export interface User {
//     id: number;
//     email: string;
//     first_name: string;
//     last_name: string;
//     avatar: string;
// }

// interface UsersState {
//     users: User[];
//     loading: boolean;
//     error: string | null;
//     page: number;
//     totalPages: number;
// }

// const initialState: UsersState = {
//     users: [],
//     loading: false,
//     error: null,
//     page: 1,
//     totalPages: 1,
// };

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page: number, { rejectWithValue }) => {
//     try {
//         const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
//         return {
//             users: response.data.data,
//             totalPages: response.data.total_pages,
//         };
//     } catch (error) {
//         return rejectWithValue('Failed to fetch users');
//     }
// });

// const usersSlice = createSlice({
//     name: 'users',
//     initialState,
//     reducers: {
//         resetUsers: (state) => {
//             state.users = [];
//             state.page = 1;
//             state.totalPages = 1;
//             state.error = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchUsers.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchUsers.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.users = [...state.users, ...action.payload.users];
//                 state.totalPages = action.payload.totalPages;
//             })
//             .addCase(fetchUsers.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             });
//     },
// });

// export const { resetUsers } = usersSlice.actions;

// export default usersSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
    currentUser: User | null;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
    currentUser: null,
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ({ page, token }: { page: number; token: string }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://reqres.in/api/users?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return {
                users: response.data.data,
                totalPages: response.data.total_pages,
            };
        } catch (error) {
            return rejectWithValue('Failed to fetch users');
        }
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetUsers: (state) => {
            state.users = [];
            state.page = 1;
            state.totalPages = 1;
            state.error = null;
        },
        setCurrentUser: (state, action) => { // добавлено
            state.currentUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = [...state.users, ...action.payload.users];
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetUsers, setCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
