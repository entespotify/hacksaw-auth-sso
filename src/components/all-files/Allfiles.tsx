import { FC, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridCallbackDetails, GridColDef, GridRenderCellParams, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import { useDispatch } from "react-redux";

import { useFilesQuery } from "../../services/apis";
import { FileType } from "../../types/file";
import FilesToolBar from "../files-toolbar/FilesToolBar";
import { setPath, setItem } from "../../services/fileSlice";
import { store } from "../../services/store";

const filesInit: FileType[] = [];

const columns: GridColDef<(typeof filesInit)[number]>[] = [
	{
		field: 'name',
		renderHeader: () => {
			return <>
				<strong>Name</strong>
			</>
		},
		width: 300,
		renderCell: (params: GridRenderCellParams<FileType>) => {
			return <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
				{params.row.type === "folder" ? <FolderIcon /> : <InsertDriveFileIcon />}
				{params.value}
			</div>
		}
	},
	{
		field: 'size',
		renderHeader: () => {
			return <>
				<strong>Size</strong>
			</>
		},
		type: 'number',
		width: 110,
	},
	{
		field: 'createdAt',
		renderHeader: () => {
			return <>
				<strong>Created</strong>
			</>
		},
		sortable: false,
		width: 220,
	},
];


const AllFiles: FC = () => {

	const [files, setFiles] = useState<FileType[]>([]);

	const allFiles = useFilesQuery("");

	const dispatch = useDispatch();

	const handleRowClick = (params: GridRowParams, event: MuiEvent, details: GridCallbackDetails) => {
		dispatch(setItem({ item: params.row.name }));
	}

	const handleRowDoubleClick = (params: GridRowParams) => {
		let pathname = params.row.name;
		let type = params.row.type;
		if (type === "folder") {
			let currentPath = store.getState().files.path;
			dispatch(setPath({ path: currentPath.endsWith('/') ? currentPath + pathname : currentPath + '/' + pathname }));
			console.log("state path:", currentPath);
			allFiles.refetch();
		} else {
			console.log("Not a directory");
		}
	}

	useEffect(() => {
		if (allFiles.data) {
			setFiles(allFiles.data.files);
		}
	}, [allFiles]);

	return (
		<>
			<Box sx={{ width: '100%', height: '93.3vh' }}>
				<DataGrid
					rows={files}
					columns={columns}
					hideFooter
					slots={{ toolbar: FilesToolBar }}
					sx={{ cursor: 'pointer' }}
					onRowClick={handleRowClick}
					onRowDoubleClick={handleRowDoubleClick}
				/>
			</Box>
		</>
	);
};

export default AllFiles;
