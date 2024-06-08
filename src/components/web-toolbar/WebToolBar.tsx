import { Stack, Breadcrumbs, Link } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import DirectoryCreationTool from "../directory-creation-tool/DirectoryCreationTool";
import FileDeletionTool from "../file-deletion-tool/FileDeletionTool";
import UploadTool from "../upload-tool/UploadTool";
import { setPath } from "../../services/fileSlice";
import { store } from "../../services/store";
import { BreadcrumbType } from "../../types/file";
import { useFilesQuery } from "../../services/api/files.api"
import { join } from "../../services/utils";


const WebToolBar: FC = () => {

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

export default WebToolBar;
