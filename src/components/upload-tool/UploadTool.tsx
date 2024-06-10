import { FC, useEffect, useRef, useState, MouseEvent } from 'react';
import Menu from '@mui/material/Menu';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';

import { store } from '../../services/store';
import { useUploadFilesMutation } from '../../services/api/files.api';
import DirectoryCreationTool from '../directory-creation-tool/DirectoryCreationTool';

const UploadTool: FC = () => {
    const fileInput = useRef<HTMLInputElement>(null);
    const [uploadOneFile, isLoading] = useUploadFilesMutation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [files, setFiles] = useState<FileList>();
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickUploadFiles = () => {
        fileInput.current?.removeAttribute("directory")
        fileInput.current?.removeAttribute("webkitdirectory")
        fileInput.current?.click();
        handleClose();
    }

    const handleClickUploadDirectory = () => {
        fileInput.current?.setAttribute("directory", "")
        fileInput.current?.setAttribute("webkitdirectory", "")
        fileInput.current?.click();
        handleClose();
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

    return (
        <div>
            <Tooltip title={"Add"} >
                <IconButton
                    id="upload-button"
                    aria-controls={open ? 'upload-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
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
                open={open}
                onClose={handleClose}
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
                <DirectoryCreationTool />
            </Menu>
            <input type="file" name="file" ref={fileInput} onChange={handleUpload} hidden />
        </div>
    );
}

export default UploadTool;