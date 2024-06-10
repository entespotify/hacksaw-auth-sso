import { Box } from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { FC } from "react";

import FileDeletionTool from "../file-deletion-tool/FileDeletionTool";
import { TransferActions } from "../../types/file";
import UploadTool from "../upload-tool/UploadTool";
import FileTransferTool from "../file-transfer-tool/FileTransferTool";
import PasteTool from "../paste-tool/Pastetool";
import CurrentPathBreadcrumb from "../current-path-breadcrumb/CurrentPathBreadcrumb";
import { useAppsQuery } from "../../services/api/apps.api";

const FilesToolBarV2: FC = () => {
    const allApps = useAppsQuery("");
    return (
        <Box sx={{ padding: '0 5px', margin: '10px', textAlign: 'left', display: 'flex', border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '5px' }}>
            <Box padding='2px 10px' sx={{ width: '100%', display: 'flex', alignItems: 'center', borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
                <CurrentPathBreadcrumb refetch={allApps.refetch} />
            </Box>
            <Box sx={{ display: 'flex', gap: '15px' }}>
                <UploadTool />
                <FileTransferTool label="Copy" action={TransferActions.COPY} icon={<FileCopyIcon fontSize="medium" />} />
                <FileTransferTool label="Move" action={TransferActions.MOVE} icon={<DriveFileMoveIcon fontSize="medium" />} />
                <PasteTool />
                <FileDeletionTool />
            </Box>
        </Box>
    );
};

export default FilesToolBarV2;
