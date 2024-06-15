import Checkbox from '@mui/material/Checkbox';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Box } from '@mui/material';

import { FileType } from "../../types/file";
import { setItem, setPath } from "../../services/fileSlice";
import { RootState, store } from "../../services/store";
import { formatBytes, formatDate, join } from "../../services/utils";
import { useAppsQuery } from "../../services/api/apps.api";
import { NAV_PORTION_OF_VH } from "../../services/constants";
import WebToolbar from '../web-toolbar/WebToolBar';

const viewSpaceHeight: number = 100 - NAV_PORTION_OF_VH;

const AllApps: FC = () => {

	const [apps, setApps] = useState<FileType[]>([]);

	const allApps = useAppsQuery("");

	const dispatch = useDispatch();

	const currentPath = useSelector((state: RootState) => state.files.path);

	const handleRowDoubleClick = (file: FileType) => {
		let pathname = file.name;
		let type = file.type;
		if (type === "folder") {
			dispatch(setPath({ path: join(currentPath, pathname) }));
			allApps.refetch();
		}
	}

	const handleCheck = (app: FileType, event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			console.log("item checked", app.name)
			dispatch(setItem({ item: app.name }));
			console.log("current item after setting:", store.getState().files.item)
			event.target.parentElement?.parentElement?.parentElement?.style
				.setProperty('background-color', 'rgba(0, 0, 0, 0.04)');
		} else {
			dispatch(setItem({ item: "" }));
			event.target.parentElement?.parentElement?.parentElement?.style
				.removeProperty('background-color');
		}
	}

	useEffect(() => {
		if (allApps.data) {
			setApps(allApps.data.files);
		}
	}, [allApps]);

	return (
		<Box sx={{ maxHeight: `${viewSpaceHeight}vh` }}>
			<WebToolbar
				refetch={allApps.refetch}
			/>
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
						{apps.map(app => (
							<TableRow key={app.name} hover onDoubleClick={() => handleRowDoubleClick(app)}>
								<TableCell>
									<Checkbox size='small' onChange={(event) => handleCheck(app, event)} />
								</TableCell>
								<TableCell sx={{ cursor: 'pointer' }}>
									<div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px' }}>
										{app.type === "folder" ? <FolderIcon /> : <InsertDriveFileIcon />} {app.name}
									</div>
								</TableCell>
								<TableCell>{app.type === "folder" ? '' : formatBytes(app.size)}</TableCell>
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
