import { IconButton, Tooltip } from "@mui/material";
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
    const [disableButton, setDisableButton] = useState(false);

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
            <Tooltip title={label}>
                <IconButton color="primary" size="small" onClick={() => handleActionClick(action)} disabled={disableButton}>
                    {icon}
                </IconButton>
            </Tooltip>
        </>
    );
};

export default FileTransferTool;
