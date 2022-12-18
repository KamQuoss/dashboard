import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { usersData } from '../../usersData';

const url = 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data';

const initialState = {
    users: [],
    isLoading: false,
    nextUserId: usersData.length + 1
}

export const getUsersData = createAsyncThunk('users/getUsersData', () => {
    return fetch(url)
        .then(res => res.json())
        .catch(err => console.log(err))
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        removeUser: (state, action) => {
            const userId = action.payload;
            state.users = state.users.filter(user => user.id !== userId)
            state.nextUserId -= 1;
        },
        addNewUser: (state, { payload }) => {
            state.users.push(payload);
            state.nextUserId += 1;
        },
        updateUser: (state, { payload }) => {
            const { id, ...changes } = payload
            const index = state.users.findIndex(user => user.id === id)
            state.users[index] = { ...state.users[index], ...changes }
        }
    },
    extraReducers: {
        [getUsersData.pending]: (state) => {
            state.isLoading = true
        },
        [getUsersData.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.users = action.payload
        },
        [getUsersData.rejected]: (state) => {
            state.isLoading = false;
        },
    }
})

export const { clearList, removeUser, addNewUser, updateUser } = usersSlice.actions

export default usersSlice.reducer