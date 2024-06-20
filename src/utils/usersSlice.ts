import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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
    totalPages: number;
    currentUser: User | null;
    likes: Record<number, boolean>;
    avatars: Record<number, string>;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
    totalPages: 1,
    currentUser: null,
    likes: {},
    avatars: {},
};

// Восстановление лайков и аватарок из localStorage
const loadStateFromStorage = () => {
    const likes = localStorage.getItem('likedUsers');
    const avatars = localStorage.getItem('userAvatars');
    return {
        likes: likes ? JSON.parse(likes) : {},
        avatars: avatars ? JSON.parse(avatars) : {},
    };
};

// Сохранение лайков и аватарок в localStorage
const saveStateToStorage = (likes: Record<number, boolean>, avatars: Record<number, string>) => {
    localStorage.setItem('likedUsers', JSON.stringify(likes));
    localStorage.setItem('userAvatars', JSON.stringify(avatars));
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

            const { likes, avatars } = loadStateFromStorage();

            const users = response.data.data.map((user: User) => ({
                ...user,
                liked: !!likes[user.id],
                avatar: avatars[user.id] || user.avatar,
            }));

            return {
                users,
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
            state.totalPages = 1;
            state.error = null;
            const { likes, avatars } = loadStateFromStorage();
            state.likes = likes;
            state.avatars = avatars;
        },
        setCurrentUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
        },
        toggleLike: (state, action: PayloadAction<number>) => {
            const userId = action.payload;
            state.likes[userId] = !state.likes[userId];
            saveStateToStorage(state.likes, state.avatars);
        },
        updateAvatar: (state, action: PayloadAction<{ userId: number; newAvatar: string }>) => {
            const { userId, newAvatar } = action.payload;
            state.avatars[userId] = newAvatar;
            const user = state.users.find(user => user.id === userId);
            if (user) {
                user.avatar = newAvatar;
            }
            saveStateToStorage(state.likes, state.avatars);
        },
        resetAvatar: (state, action: PayloadAction<number>) => {
            const userId = action.payload;
            const user = state.users.find(user => user.id === userId);
            if (user) {
                user.avatar = `https://reqres.in/img/faces/${userId}-image.jpg`; // Исх значение
                delete state.avatars[userId]; // Уд из localStorage
                saveStateToStorage(state.likes, state.avatars); // Сохр изменений
            }
        }
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

export const { resetUsers, setCurrentUser, toggleLike, updateAvatar, resetAvatar } = usersSlice.actions;

export default usersSlice.reducer;
