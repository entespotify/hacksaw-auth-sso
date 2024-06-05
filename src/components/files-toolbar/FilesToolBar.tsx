import { Stack, Breadcrumbs, Link } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { FC, useEffect, useState } from "react";

import DirectoryCreationTool from "../directory-creation-tool/DirectoryCreationTool";
import FileDeletionTool from "../file-deletion-tool/FileDeletionTool";
import { setPath } from "../../services/fileSlice";
import { useDispatch } from "react-redux";
import { store } from "../../services/store";
import { BreadcrumbType, TransferActions } from "../../types/file";
import { useFilesQuery } from "../../services/apis";
import UploadTool from "../upload-tool/UploadTool";
import FileTransferTool from "../file-transfer-tool/FileTransferTool";
import PasteTool from "../paste-tool/Pastetool";
import { join } from "../../services/utils";


const FilesToolBar: FC = () => {

    const dispatch = useDispatch();

    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbType[]>([]);

    const allFiles = useFilesQuery("");

    const pathState = store.getState().files.path;

    const handleHomeClick = (path: string) => {
        if (path !== pathState) {
            dispatch(setPath({ path: path }));
            allFiles.refetch();
        }
    }

    useEffect(() => {
        if (pathState) {
            let breadcrumbItems: BreadcrumbType[] = [];
            let pathRoot: string = '';
            if (pathState !== '/') {
                let pathParts = pathState.split('/');
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
                    path: pathState
                })
            }
            setBreadcrumbs(breadcrumbItems);
        }
    }, [pathState]);

    return (
        <GridToolbarContainer sx={{ flexDirection: 'column', alignItems: 'start' }}>
            <Stack direction="row" spacing={2} padding={1}>
                <UploadTool />
                <DirectoryCreationTool />
                <FileTransferTool label="Copy" action={TransferActions.COPY} icon={<FileCopyIcon/>}/>
                <FileTransferTool label="Move" action={TransferActions.MOVE} icon={<DriveFileMoveIcon/>}/>
                <PasteTool/>
                <FileDeletionTool />
            </Stack>
            <Breadcrumbs aria-label="breadcrumb">
                {
                    breadcrumbs.map(breadcrumb => {
                        return <Link
                            key={breadcrumbs.indexOf(breadcrumb)}
                            color="inherit"
                            underline="hover"
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handleHomeClick(breadcrumb.path)}>
                            {breadcrumb.name}
                        </Link>
                    })
                }
            </Breadcrumbs>
        </GridToolbarContainer>
    );
};

export default FilesToolBar;
