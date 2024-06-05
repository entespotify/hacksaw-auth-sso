import { Button } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { store } from "../../services/store";
import { setTransferAction, setTransferItem, setTransferPath } from "../../services/fileSlice";
import { TransferActions } from "../../types/file";

interface FileTransferToolType {
    label: string,
    action: TransferActions,
    icon?: ReactElement
}

const FileTransferTool = (props: FileTransferToolType) => {

    const { label, action, icon } = props;
    const dispatch = useDispatch();
    const [disableButton, setDisableButton] = useState(true);

    const handleActionClick = (action: TransferActions) => {
        let currentPath = store.getState().files.path;
        let item = store.getState().files.item;
        dispatch(setTransferPath({ transferPath: currentPath }));
        dispatch(setTransferItem({ transferItem: item }));
        dispatch(setTransferAction({ transferAction: action }));
        setDisableButton(true);
    }

    useEffect(() => {
        if (store.getState().files.item && store.getState().files.item != "") {
            setDisableButton(false);
        }
    }, [store.getState().files.item]);

    return (
        <>
            <Button variant="outlined" size="small" startIcon={icon} onClick={() => handleActionClick(action)} disabled={disableButton}>
                {label}
            </Button>
        </>
    );
};

export default FileTransferTool;
