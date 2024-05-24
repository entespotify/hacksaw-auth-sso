import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { FC, useEffect, useState } from "react";

import { store } from "../../services/store";
import { useDeleteMutation } from "../../services/apis";

const FileDeletionTool: FC = () => {

    const [disableButton, setDisableButton] = useState(true);

    const [doDelete, isLoading] = useDeleteMutation();

    const handleDelete = () => {
        doDelete({path: store.getState().files.item});
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
