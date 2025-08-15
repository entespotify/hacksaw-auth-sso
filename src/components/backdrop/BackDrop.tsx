import { ReactNode } from "react";
import { Box } from "@mui/material";

export interface BackDropProps {
    children: ReactNode
}

function Backdrop({ children }: BackDropProps) {
    return (
        <Box
            sx={{
                width: "100vw",
                minHeight: "100vh",
                background: "linear-gradient(135deg, #181c24 60%, #232936 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {children}
        </Box>
    );
}

export default Backdrop;
