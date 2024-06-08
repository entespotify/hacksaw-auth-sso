import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FC, useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { store } from '../../services/store';
import { useUploadFilesMutation } from '../../services/api/files.api';

const UploadTool: FC = () => {
    const fileInput = useRef<HTMLInputElement>(null);
    const [uploadOneFile, isLoading] = useUploadFilesMutation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [files, setFiles] = useState<FileList>();
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
            console.log("File selected:", files);
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
            <Button
                id="upload-button"
                aria-controls={open ? 'upload-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="contained" size="small" startIcon={<AddIcon />}
            >
                Add
            </Button>
            <Menu
                id="upload-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'upload-button',
                }}
            >
                <MenuItem onClick={handleClickUploadFiles} sx={{fontSize: '14px'}}>
                    <UploadFileIcon fontSize='small' /> FILE
                </MenuItem>
                <MenuItem onClick={handleClickUploadDirectory} sx={{fontSize: '14px'}}>
                    <DriveFolderUploadIcon fontSize='small' /> DIRECTORY
                </MenuItem>
            </Menu>
            <input type="file" name="file" ref={fileInput} onChange={handleUpload} hidden />
        </div>
    );
}

export default UploadTool;