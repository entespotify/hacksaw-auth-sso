import { Box, Breadcrumbs, Button, IconButton, Link, Menu, Modal, Stack, TextField, Tooltip, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef, MouseEvent } from "react";
import { QueryActionCreatorResult, QueryDefinition } from "@reduxjs/toolkit/query";

import { setPath } from "../../services/fileSlice";
import { RootState, store } from "../../services/store";
import { join } from "../../services/utils";
import { BreadcrumbType, DirectoryCreationRequestType, TransferActions, TransferRequestType } from "../../types/file";
import { useCreateDIrectoryMutation, useUploadFilesMutation } from "../../services/api/files.api";
import { useCopyMutation, useMoveMutation, useDeleteMutation } from "../../services/api/files.api";
import { setTransferPath, setTransferItem, setTransferAction } from '../../services/fileSlice';

export interface FilesToolBarProps {
    refetch: () => QueryActionCreatorResult<QueryDefinition<any, any, any, any>>
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function FilesToolBarV2(props: FilesToolBarProps) {

    const { refetch } = props;

    const dispatch = useDispatch();

    const currentPath = useSelector((state: RootState) => state.files.path);
    const currentItem = useSelector((state: RootState) => state.files.item);
    const transferAction = useSelector((state: RootState) => state.files.transferAction);
    const transferPath = useSelector((state: RootState) => state.files.transferPath);
    const transferItem = useSelector((state: RootState) => state.files.transferItem);

    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbType[]>([]);
    const [disableDeleteButton, setDisableDeleteButton] = useState(false);
    const [disableTransferButton, setDisableTransferButton] = useState(true);
    const [disablePasteButton, setDisablePasteButton] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [files, setFiles] = useState<FileList>();
    const [openDirectoryModal, setOpenDirectoryModal] = useState(false);
    const [dirname, setDirname] = useState("");
    const [doCopy, isLoadingCopy] = useCopyMutation();
    const [doMove, isLoadingMove] = useMoveMutation();
    const [doDelete] = useDeleteMutation();
    const [uploadOneFile, isLoading] = useUploadFilesMutation();
    const [createDirectory, isCreateDirectoryLoading] = useCreateDIrectoryMutation();

    const fileInput = useRef<HTMLInputElement>(null);

    const openAddMenu = Boolean(anchorEl);

    //breadcrumb
    const handlePathClick = (path: string) => {
        if (path !== currentPath) {
            dispatch(setPath({ path: path }));
            refetch();
        }
    }

    useEffect(() => {
        if (currentPath) {
            let breadcrumbItems: BreadcrumbType[] = [];
            let pathRoot: string = '';
            if (currentPath !== '/') {
                let pathParts = currentPath.split('/');
                pathParts.map(pathPart => {
                    pathRoot = join(pathRoot, pathPart);
                    breadcrumbItems.push({
                        name: pathPart === '' ? "root" : pathPart,
                        path: pathRoot
                    });
                });
            } else {
                breadcrumbItems.push({
                    name: 'root',
                    path: currentPath
                })
            }
            setBreadcrumbs(breadcrumbItems);
        }
    }, [currentPath]);

    //upload file or folder
    const handleAddButtonClick = (event: MouseEvent<HTMLAnchorElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleAddMenuClose = () => {
        setAnchorEl(null);
    };

    const handleClickUploadFiles = () => {
        fileInput.current?.removeAttribute("directory")
        fileInput.current?.removeAttribute("webkitdirectory")
        fileInput.current?.click();
        handleAddMenuClose();
    }

    const handleClickUploadDirectory = () => {
        fileInput.current?.setAttribute("directory", "")
        fileInput.current?.setAttribute("webkitdirectory", "")
        fileInput.current?.click();
        handleAddMenuClose();
    }

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        let files1 = event.target.files;
        if (files1) {
            setFiles(files1);
        }
    }

    const uploadFile = (file: File, path: string) => {
        let formData = new FormData();
        formData.append("file", file);
        let currentPath = store.getState().files.path;
        let dirPath = currentPath;
        if (path && path !== '') {
            dirPath += ('/' + path);
        }
        uploadOneFile({ body: formData, path: dirPath });
    }

    useEffect(() => {
        if (files) {
            for (let i = 0; i <= files.length; i++) {
                let file = files.item(i);
                if (file) {
                    let webkitRelativePath = file.webkitRelativePath;
                    let filename = file.name;
                    let dirPath = webkitRelativePath.substring(0, webkitRelativePath.lastIndexOf(filename));
                    uploadFile(file, dirPath);
                }
            }
        }
    }, [files]);

    //create directory

    const handleDirectoryModalOpen = () => setOpenDirectoryModal(true);

    const handleDirectoryModalClose = () => setOpenDirectoryModal(false);

    const handleDirectoryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let tempDirName = event.target.value;
        setDirname(tempDirName);
    }

    const handleCreateDirectory = () => {
        if (dirname) {
            let reqDirName: DirectoryCreationRequestType = {
                dirname: dirname,
                path: store.getState().files.path
            };
            createDirectory(reqDirName);
        }
        setOpenDirectoryModal(false);
    }

    //paste
    const handlePaste = () => {
        console.log("params:", transferPath, transferItem, currentPath);
        let transferParams: TransferRequestType = {
            src: join(transferPath, transferItem),
            dest: join(currentPath, transferItem)
        }
        if (transferAction === TransferActions.COPY) {
            doCopy(transferParams);
        } else if (transferAction === TransferActions.MOVE) {
            doMove(transferParams);
        }
    }

    useEffect(() => {
        if (transferItem && transferItem !== '' && transferPath !== currentPath) {
            setDisablePasteButton(false)
        } else {
            setDisablePasteButton(true)
        }
    }, [transferPath, transferItem, currentPath]);

    //delete
    const handleDelete = () => {
        doDelete({ path: currentPath + '/' + currentItem });
    }

    useEffect(() => {
        if (currentItem && currentItem !== '' && currentPath) {
            setDisableDeleteButton(false)
        } else {
            setDisableDeleteButton(true)
        }
    }, [currentPath, currentItem]);

    //copy or move
    const handleTransferActionClick = (action: TransferActions) => {
        dispatch(setTransferPath({ transferPath: currentPath }));
        dispatch(setTransferItem({ transferItem: currentItem }));
        dispatch(setTransferAction({ transferAction: action }));
    }

    useEffect(() => {
        if (currentItem && currentItem !== '') {
            setDisableTransferButton(false)
        } else {
            setDisableTransferButton(true)
        }
    }, [currentItem]);

    return (
        <Box sx={{ padding: '0 5px', margin: '10px', textAlign: 'left', display: 'flex', border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '5px' }}>
            <Box padding='2px 10px' sx={{ width: '100%', display: 'flex', alignItems: 'center', borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    {
                        breadcrumbs.map(breadcrumb => {
                            return <Link
                                key={breadcrumbs.indexOf(breadcrumb)}
                                color="inherit"
                                underline="hover"
                                sx={{ cursor: 'pointer' }}
                                onClick={() => handlePathClick(breadcrumb.path)}>
                                {breadcrumb.name}
                            </Link>
                        })
                    }
                </Breadcrumbs>
            </Box>
            <Box sx={{ display: 'flex', gap: '15px' }}>
                <div>
                    <Tooltip title={"Add"} >
                        <IconButton
                            id="upload-button"
                            aria-controls={openAddMenu ? 'upload-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openAddMenu ? 'true' : undefined}
                            onClick={handleAddButtonClick}
                            size='large'
                            color='primary'
                            href=''
                        >
                            <AddIcon fontSize='large' />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="upload-menu"
                        anchorEl={anchorEl}
                        open={openAddMenu}
                        onClose={handleAddMenuClose}
                        MenuListProps={{
                            'aria-labelledby': 'upload-button',
                        }}
                    >
                        <Tooltip title={"Upload File"}>
                            <IconButton onClick={handleClickUploadFiles} size='large'>
                                <UploadFileIcon fontSize='medium' color='success' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"Upload Directory"}>
                            <IconButton onClick={handleClickUploadDirectory} size='large'>
                                <DriveFolderUploadIcon fontSize='medium' color='info' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"Create Directory"}>
                            <IconButton onClick={handleDirectoryModalOpen}>
                                <CreateNewFolderIcon fontSize="medium" color="info" />
                            </IconButton>
                        </Tooltip>
                        <Modal
                            open={openDirectoryModal}
                            onClose={handleDirectoryModalClose}
                            aria-labelledby="modal-modal-title"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Add directory
                                </Typography>
                                <Stack spacing={1}>
                                    <TextField id="modal-directory-name" label="Directory name" variant="standard" size="small" onChange={handleDirectoryNameChange} />
                                    <Button variant="outlined" size="small" onClick={handleCreateDirectory}>
                                        Create directory
                                    </Button>
                                </Stack>
                            </Box>
                        </Modal>
                    </Menu>
                    <input type="file" name="file" ref={fileInput} onChange={handleUpload} hidden />
                </div>
                <Tooltip title="Copy">
                    <IconButton color="primary" size="small" onClick={() => handleTransferActionClick(TransferActions.COPY)} disabled={disableTransferButton}>
                        <FileCopyIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Move">
                    <IconButton color="primary" size="small" onClick={() => handleTransferActionClick(TransferActions.MOVE)} disabled={disableTransferButton}>
                        <DriveFileMoveIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Paste"}>
                    <IconButton color="primary" size="large" onClick={handlePaste} disabled={disablePasteButton}>
                        {<ContentPasteIcon fontSize="medium" />}
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Delete"}>
                    <IconButton aria-label="Delete" color="error" size="small" onClick={handleDelete} disabled={disableDeleteButton}>
                        <DeleteIcon fontSize="medium" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default FilesToolBarV2;
