import { Stack, Button, Breadcrumbs, Link } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { FC, useEffect, useState } from "react";

import DirectoryCreationTool from "../directory-creation-tool/DirectoryCreationTool";
import FileDeletionTool from "../file-deletion-tool/FileDeletionTool";
import { setPath } from "../../services/fileSlice";
import { useDispatch } from "react-redux";
import { store } from "../../services/store";
import { BreadcrumbType } from "../../types/file";
import { useFilesQuery } from "../../services/apis";
import UploadTool from "../upload-tool/UploadTool";


const FilesToolBar: FC = () => {

    const dispatch = useDispatch();

    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbType[]>([]);

    const allFiles = useFilesQuery("");

    const pathState = store.getState().files.path;

    const handleHomeClick = (path: string) => {
        if (path !== pathState) {
            dispatch(setPath({ path: path }));
            allFiles.refetch();
        } else {
            console.log("Same path:", path);
        }
    }

    useEffect(() => {
        if (pathState) {
            console.log("Path changed:", pathState);
            let breadcrumbItems: BreadcrumbType[] = [];
            let pathRoot: string = '';
            let pathParts = pathState.split('/');
            pathParts.map(pathPart => {
                pathRoot = pathRoot.endsWith('/') ? pathRoot + pathPart : pathRoot + '/' + pathPart;
                breadcrumbItems.push({
                    name: pathPart === '' ? "root" : pathPart,
                    path: pathRoot
                });
                console.log("name:", pathPart === '' ? "root" : pathPart, "path:", pathRoot);
            });
            setBreadcrumbs(breadcrumbItems);
        }
    }, [pathState]);

    return (
        <GridToolbarContainer sx={{ flexDirection: 'column', alignItems: 'start' }}>
            <Stack direction="row" spacing={2} padding={1}>
                <UploadTool/>
                <DirectoryCreationTool />
                <Button variant="outlined" size="small" startIcon={<FileCopyIcon />}>
                    Copy
                </Button>
                <Button variant="outlined" size="small" startIcon={<DriveFileMoveIcon />}>
                    Move
                </Button>
                <Button variant="outlined" size="small" startIcon={<ContentPasteIcon />}>
                    Paste
                </Button>
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
