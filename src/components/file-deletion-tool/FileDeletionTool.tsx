import { Button, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { FC, useEffect, useState } from "react";

import { store } from "../../services/store";
import { useDeleteMutation } from "../../services/api/files.api";

const FileDeletionTool: FC = () => {

    const [disableButton, setDisableButton] = useState(true);

    const [doDelete, isLoading] = useDeleteMutation();

    const handleDelete = () => {
        let currentPath = store.getState().files.path;
        let filename = store.getState().files.item;
        doDelete({ path: currentPath + '/' + filename });
        setDisableButton(true);
    }

    useEffect(() => {
        if (store.getState().files.item && store.getState().files.item != "") {
            setDisableButton(false);
        }
    }, [store.getState().files.item]);

    return (
        <>
            <Tooltip title={"Delete"}>
                <IconButton aria-label="Delete" color="error" size="small" onClick={handleDelete} disabled={disableButton}>
                    <DeleteIcon fontSize="medium" />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default FileDeletionTool;
