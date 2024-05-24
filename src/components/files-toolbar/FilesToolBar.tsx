import { Stack, Button } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { FC } from "react";

import FileUploadTool from "../file-upload-tool/FileUploadTool";
import DirectoryCreationTool from "../directory-creation-tool/DirectoryCreationTool";
import FileDeletionTool from "../file-deletion-tool/FileDeletionTool";

const FilesToolBar: FC = () => {

    return (
        <GridToolbarContainer>
            <Stack direction="row" spacing={2} padding={1}>
                <FileUploadTool/>
                <DirectoryCreationTool/>
                <Button variant="outlined" size="small" startIcon={<FileCopyIcon />}>
                    Copy
                </Button>
                <Button variant="outlined" size="small" startIcon={<DriveFileMoveIcon />}>
                    Move
                </Button>
                <Button variant="outlined" size="small" startIcon={<ContentPasteIcon />}>
                    Paste
                </Button>
                <FileDeletionTool/>
            </Stack>
        </GridToolbarContainer>
    );
};

export default FilesToolBar;
