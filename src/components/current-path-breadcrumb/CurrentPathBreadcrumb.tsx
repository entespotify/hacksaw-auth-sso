import { Breadcrumbs, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { QueryActionCreatorResult, QueryDefinition } from "@reduxjs/toolkit/query";

import { setPath } from "../../services/fileSlice";
import { store } from "../../services/store";
import { BreadcrumbType } from "../../types/file";
import { join } from "../../services/utils";

interface BreadcrumbProps {
    refetch: () => QueryActionCreatorResult<QueryDefinition<any, any, any, any>>
}

function CurrentPathBreadcrumb(props: BreadcrumbProps) {

    const { refetch } = props;

    const dispatch = useDispatch();

    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbType[]>([]);

    const pathState = store.getState().files.path;

    const handlePathClick = (path: string) => {
        if (path !== pathState) {
            dispatch(setPath({ path: path }));
            refetch();

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
    );
};

export default CurrentPathBreadcrumb;
