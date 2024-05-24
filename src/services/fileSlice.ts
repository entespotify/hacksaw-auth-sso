import { createSlice } from '@reduxjs/toolkit'

interface FileState {
	path: string,
	item: string,
	transferPath: string,
	transferAction: string
}

const initialState: FileState = {
	path: '',
	item: '',
	transferPath: '',
	transferAction: ''
}

export const fileSlice = createSlice({
	name: 'files',
	initialState,
	reducers: {
		setPath: (state, action) => {
			const pathPayload = action.payload
			state.path = pathPayload.path
		},
		setItem: (state, action) => {
			const itemPayload = action.payload
			state.item = itemPayload.item
		},
		setTransferPath: (state, action) => {
			const transferPathPayload = action.payload
			state.transferPath = transferPathPayload.transferPath
		},
		setTransferAction: (state, action) => {
			const transferActionPayload = action.payload
			state.transferAction = transferActionPayload.transferAction
		}
	},
});

export const { setPath, setItem, setTransferPath, setTransferAction } = fileSlice.actions;

export default fileSlice.reducer;