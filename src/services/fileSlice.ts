import { createSlice } from '@reduxjs/toolkit'
import { TransferActions } from '../types/file';

interface FileState {
	path: string,
	item: string,
	transferPath: string,
	transferItem: string,
	transferAction: TransferActions
}

const initialState: FileState = {
	path: '/',
	item: '',
	transferPath: '',
	transferItem: '',
	transferAction: TransferActions.NONE
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
		setTransferItem: (state, action) => {
			const transferItemPayload = action.payload
			state.transferItem = transferItemPayload.transferItem
		},
		setTransferAction: (state, action) => {
			const transferActionPayload = action.payload
			state.transferAction = transferActionPayload.transferAction
		}
	},
});

export const { setPath, setItem, setTransferPath, setTransferItem, setTransferAction } = fileSlice.actions;

export default fileSlice.reducer;