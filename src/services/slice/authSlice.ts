import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface UserState {
	token: string
}

const initialState: UserState = {
	token: ''
}

export const authSlice = createSlice({
	name: 'api',
	initialState,
	reducers: {
		login: (state, action) => {
			const auth = action.payload
			state.token = auth.token
			localStorage.setItem("token", auth.token)
		},
		logout: (state) => {
			state.token = ''
			localStorage.removeItem("token")
		}
	},
});

export const { login, logout } = authSlice.actions;

export const selectCurrentToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;