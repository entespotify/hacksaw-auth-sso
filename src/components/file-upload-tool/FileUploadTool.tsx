import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { FC, useEffect, useRef, useState } from "react";

import { useUploadFilesMutation } from "../../services/apis";

const FileUploadTool: FC = () => {

    const fileInput = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<FileList>();

    const [uploadOneFile, isLoading] = useUploadFilesMutation();

    const handleClick = () => {
        fileInput.current?.click();
    }

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        let files1 = event.target.files;
        if(files1) {
            setFiles(files1);
        }
    }

    const uploadFile = (file: File) => {
        let formData = new FormData();
        formData.append("file", file);
       const uploaded = uploadOneFile(formData);
    }

    useEffect(() => {
		if (files) {
			console.log("File selected:", files);
            uploadFile(files[0]);
		}
	}, [files]);

    return (
        <>
            <input type="file" name="file" ref={fileInput} onChange={handleUpload} hidden />
            <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={handleClick}>
                Add file
            </Button>
        </>
    );
};

export default FileUploadTool;
