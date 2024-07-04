import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Tooltip,
    Box,
    useTheme
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

import { useNavigate } from "react-router-dom";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import GroupIcon from "@mui/icons-material/Group";

/**
 * Navbar component.
 */
export default function Navbar() {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: theme.palette.background.default,
                boxShadow: "none",
                borderBottom: `1px solid ${theme.palette.divider}`
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        color: theme.palette.text.primary,
                        fontWeight: "bold",
                        cursor: "pointer",
                        "&:hover": {
                            color: theme.palette.primary.main
                        }
                    }}
                    onClick={() => navigate("/")}
                >
                    <Box
                        component="span"
                        sx={{ color: theme.palette.primary.main }}
                    >
                        A
                    </Box>
                    thletics
                    <Box
                        component="span"
                        sx={{ color: theme.palette.primary.main }}
                    >
                        M
                    </Box>
                    eet
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Tooltip title="Home">
                        <IconButton
                            component={Link}
                            to="/"
                            sx={{ color: theme.palette.text.primary }}
                        >
                            <HomeIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Disciplines">
                        <IconButton
                            component={Link}
                            to="/discipline"
                            sx={{ color: theme.palette.text.primary }}
                        >
                            <SportsHandballIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Results">
                        <IconButton
                            component={Link}
                            to="/results"
                            sx={{ color: theme.palette.text.primary }}
                        >
                            <SportsScoreIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Participants">
                        <IconButton
                            component={Link}
                            to="/participants"
                            sx={{ color: theme.palette.text.primary }}
                        >
                            <GroupIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
}