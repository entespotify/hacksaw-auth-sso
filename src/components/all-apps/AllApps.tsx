import Checkbox from '@mui/material/Checkbox';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Box } from '@mui/material';


import { FileType } from "../../types/file";
import { setItem, setPath } from "../../services/fileSlice";
import { store } from "../../services/store";
import { formatBytes, formatDate, join } from "../../services/utils";
import { useAppsQuery } from "../../services/api/apps.api";
import { NAV_PORTION_OF_VH } from "../../services/constants";
import FilesToolBarV2 from "../files-toolbar/FilesToolBarV2";


const viewSpaceHeight: number = 100 - NAV_PORTION_OF_VH;

const AllApps: FC = () => {

	const [files, setFiles] = useState<FileType[]>([]);

	const allApps = useAppsQuery("");

	const dispatch = useDispatch();

	const handleRowDoubleClick = (file: FileType) => {
		let pathname = file.name;
		let type = file.type;
		if (type === "folder") {
			let currentPath = store.getState().files.path;
			dispatch(setPath({ path: join(currentPath, pathname) }));
			allApps.refetch();
		}
	}

	const handleCheck = (file: FileType, event: ChangeEvent<HTMLInputElement>,) => {
		if (event.target.checked) {
			dispatch(setItem({ item: file.name }));
			event.target.parentElement?.parentElement?.parentElement?.style
				.setProperty('background-color', 'rgba(0, 0, 0, 0.04)');
		} else {
			event.target.parentElement?.parentElement?.parentElement?.style
				.removeProperty('background-color');
		}
	}

	useEffect(() => {
		if (allApps.data) {
			setFiles(allApps.data.files);
		}
	}, [allApps]);

	return (
		<Box sx={{ maxHeight: `${viewSpaceHeight}vh` }}>
			<FilesToolBarV2 />
			<TableContainer sx={{ maxHeight: `${viewSpaceHeight - 13}vh`, margin: '0 10px', border: '1px solid rgba(224, 224, 224, 1)', maxWidth: '98%', borderRadius: '5px' }}>
				<Table aria-label="simple table" stickyHeader size="small">
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox"></TableCell>
							<TableCell><strong>Name</strong></TableCell>
							<TableCell><strong>Size</strong></TableCell>
							<TableCell><strong>Created</strong></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{files.map(app => (
							<TableRow key={app.name} hover onDoubleClick={() => handleRowDoubleClick(app)}>
								<TableCell>
									<Checkbox size='small' onChange={(event) => handleCheck(app, event)} />
								</TableCell>
								<TableCell sx={{ cursor: 'pointer' }}>
									<div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px' }}>
										{app.type === "folder" ? <FolderIcon /> : <InsertDriveFileIcon />} {app.name}
									</div>
								</TableCell>
								<TableCell>{formatBytes(app.size)}</TableCell>
								<TableCell>{formatDate(app.createdAt)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default AllApps;
