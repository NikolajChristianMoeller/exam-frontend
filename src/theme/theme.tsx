import { createTheme } from "@mui/material/styles";

/**
 * Standard(std) theme.
 */
export const stdTheme = createTheme({
    palette: {
        primary: {
            main: "#ff6161"
        },
        secondary: {
            main: "#FFD700"
        },
        background: {
            default: "#FFF7E1",
            paper: "#FFF3E0"
        },
        text: {
            primary: "#5D4037",
            secondary: "#8D6E63"
        },
        divider: "#D7CCC8",
        error: {
            main: "#D32F2F"
        },
        warning: {
            main: "#FFA726"
        },
        success: {
            main: "#66BB6A"
        },
        info: {
            main: "#29B6F6"
        }
    },
    shape: {
        borderRadius: 8
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h6: {
            fontWeight: 700
        },
        body1: {
            fontSize: "1rem"
        },
        body2: {
            fontSize: "0.875rem"
        }
    }
});