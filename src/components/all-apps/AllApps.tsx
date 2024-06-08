import Box from '@mui/material/Box';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import { FC, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import { useDispatch } from "react-redux";

import WebToolBar from "../web-toolbar/WebToolBar";
import { FileType } from "../../types/file";
import { setPath, setItem } from "../../services/fileSlice";
import { store } from "../../services/store";
import { join } from "../../services/utils";
import { useAppsQuery } from "../../services/api/apps.api";

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


const AllApps: FC = () => {

	const [files, setFiles] = useState<FileType[]>([]);

	const allApps = useAppsQuery("/");

	const dispatch = useDispatch();

	const handleRowClick = (params: GridRowParams) => {
		dispatch(setItem({ item: params.row.name }));
	}

	const handleRowDoubleClick = (params: GridRowParams) => {
		let pathname = params.row.name;
		let type = params.row.type;
		if (type === "folder") {
			let currentPath = store.getState().files.path;
			dispatch(setPath({ path: join(currentPath, pathname) }));
			allApps.refetch();
		}
	}

	useEffect(() => {
		if (allApps.data) {
			setFiles(allApps.data.files);
		}
	}, [allApps]);

	return (
		<>
			<Box sx={{ width: '100%', height: '93.3vh' }}>
				<DataGrid
					rows={files}
					columns={columns}
					hideFooter
					slots={{ toolbar: WebToolBar }}
					sx={{ cursor: 'pointer' }}
					onRowClick={handleRowClick}
					onRowDoubleClick={handleRowDoubleClick}
				/>
			</Box>
		</>
	);
};

export default AllApps;
