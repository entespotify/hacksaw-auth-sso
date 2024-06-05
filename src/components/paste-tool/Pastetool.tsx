import { Button } from "@mui/material";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { FC, useEffect, useState } from "react";

import { store } from "../../services/store";
import { useCopyMutation, useMoveMutation } from "../../services/apis";
import { TransferActions, TransferRequestType } from "../../types/file";
import { join } from "../../services/utils";

const PasteTool: FC = () => {

    const [disableButton, setDisableButton] = useState(true);

    const [doCopy, isLoadingCopy] = useCopyMutation();
    const [doMove, isLoadingMove] = useMoveMutation();

    const handleDelete = () => {
        let currentPath = store.getState().files.path;
        let transferAction = store.getState().files.transferAction;
        let transferPath = store.getState().files.transferPath;
        let transferItem = store.getState().files.transferItem;
        let transferParams: TransferRequestType = {
            src: join(transferPath, transferItem),
            dest: join(currentPath, transferItem)
        }
        if(transferAction === TransferActions.COPY) {
            doCopy(transferParams);
        } else if (transferAction === TransferActions.MOVE) {
            doMove(transferParams);
        }
        setDisableButton(true);
    }

    useEffect(() => {
        if(store.getState().files.transferAction === TransferActions.COPY 
        || store.getState().files.transferAction === TransferActions.MOVE) {
            setDisableButton(false);
        }
	}, [store.getState().files.transferAction]);

    return (
        <>
            <Button variant="outlined" size="small" startIcon={<ContentPasteIcon />} onClick={handleDelete} disabled={disableButton}>
                Paste
            </Button>
        </>
    );
};

export default PasteTool;
