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
import { NAV_PORTION_OF_VH } from "../../services/constants";
import FilesToolBar from '../files-toolbar/FilesToolBar';
import { useFilesQuery } from '../../services/api/files.api';

const viewSpaceHeight: number = 100 - NAV_PORTION_OF_VH;

const AllApps: FC = () => {

	const [files, setFiles] = useState<FileType[]>([]);

	const allFiles = useFilesQuery("");

	const dispatch = useDispatch();

	const currentPath = useSelector((state: RootState) => state.files.path);

	const handleRowDoubleClick = (file: FileType) => {
		let pathname = file.name;
		let type = file.type;
		if (type === "folder") {
			dispatch(setPath({ path: join(currentPath, pathname) }));
			allFiles.refetch();
		}
	}

	const handleCheck = (file: FileType, event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			console.log("item checked", file.name)
			dispatch(setItem({ item: file.name }));
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
		if (allFiles.data) {
			setFiles(allFiles.data.files);
		}
	}, [allFiles]);

	return (
		<Box sx={{ maxHeight: `${viewSpaceHeight}vh` }}>
			<FilesToolBar
				refetch={allFiles.refetch}
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
						{files.map(file => (
							<TableRow key={file.name} hover onDoubleClick={() => handleRowDoubleClick(file)}>
								<TableCell>
									<Checkbox size='small' onChange={(event) => handleCheck(file, event)} />
								</TableCell>
								<TableCell sx={{ cursor: 'pointer' }}>
									<div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px' }}>
										{file.type === "folder" ? <FolderIcon /> : <InsertDriveFileIcon />} {file.name}
									</div>
								</TableCell>
								<TableCell>{file.type === "folder" ? '' : formatBytes(file.size)}</TableCell>
								<TableCell>{formatDate(file.createdAt)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default AllApps;
