import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface UserState {
	token: string,
	refresh: string
}

const initialState: UserState = {
	token: '',
	refresh: ''
}

export const authSlice = createSlice({
	name: 'api',
	initialState,
	reducers: {
		login: (state, action) => {
			const auth = action.payload
			state.token = auth.access
			state.refresh = auth.refresh
			localStorage.setItem("token", auth.access)
			localStorage.setItem("refresh", auth.refresh)
		},
		logout: (state) => {
			state.token = ''
			state.refresh = ''
			localStorage.removeItem("token")
			localStorage.removeItem("refresh")
		}
	},
});

export const { login, logout } = authSlice.actions;

export const selectCurrentToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;