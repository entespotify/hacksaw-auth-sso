import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { FC, useState } from "react";

import { useCreateDIrectoryMutation } from "../../services/api/files.api";
import { DirectoryCreationRequestType } from "../../types/file";
import { store } from "../../services/store";

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

const DirectoryCreationTool: FC = () => {

    const [open, setOpen] = useState(false);
    const [dirname, setDirname] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [createDirectory, isLoading] = useCreateDIrectoryMutation();
    const handleDirectoryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let tempDirName = event.target.value;
        setDirname(tempDirName);
    }

    const handleCreateDirectory = () => {
        if(dirname) {
            let reqDirName: DirectoryCreationRequestType = {
                dirname: dirname,
                path: store.getState().files.path
            };
            createDirectory(reqDirName);
        }
        setOpen(false);
    }

    return (
        <>
            <Button variant="outlined" size="small" startIcon={<CreateNewFolderIcon />} onClick={handleOpen}>
                Add directory
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
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
        </>
    );
};

export default DirectoryCreationTool;
