import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { FC, useEffect, useState } from "react";

import { store } from "../../services/store";
import { useDeleteMutation } from "../../services/apis";

const FileDeletionTool: FC = () => {

    const [disableButton, setDisableButton] = useState(true);

    const [doDelete, isLoading] = useDeleteMutation();

    const handleDelete = () => {
        let currentPath = store.getState().files.path;
        let filename = store.getState().files.item;
        doDelete({path: currentPath + '/' + filename});
        setDisableButton(true);
    }

    useEffect(() => {
        if(store.getState().files.item && store.getState().files.item != "") {
            setDisableButton(false);
        }
	}, [store.getState().files.item]);

    return (
        <>
            <Button variant="outlined" size="small" startIcon={<DeleteIcon />} onClick={handleDelete} disabled={disableButton}>
                Delete
            </Button>
        </>
    );
};

export default FileDeletionTool;
