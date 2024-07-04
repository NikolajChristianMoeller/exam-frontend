import { stdTheme } from "../theme/theme.tsx";
import {
    Container,
    IconButton,
    Link,
    Tooltip,
    Typography,
    Paper,
    Box
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";

/**
 * Home component.
 */
function Home() {
    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    padding: 2,
                    margin: 2,
                    borderRadius: 2
                }}
            >
                <h1>Welcome to the Athletic Meet</h1>
                <Typography
                    variant="h6"
                    component="div"
                >
                    We organize annual athletic meets that bring together
                    athletes from all over the region. Our events include
                    disciplines such as running, jumping, and throwing. We
                    believe in promoting sportsmanship and healthy competition.
                </Typography>
                <Typography
                    variant="body1"
                    component="div"
                >
                    Our athletic meet is a great opportunity for athletes to
                    showcase their skills and compete with others. We have a
                    variety of events, from track and field to swimming and
                    gymnastics. Whether you're an experienced athlete or a
                    beginner, there's something for everyone at our meet.
                </Typography>
                <Typography
                    variant="body1"
                    component="div"
                >
                    We also provide training and coaching for athletes who want
                    to improve their performance. Our coaches are experienced
                    and dedicated to helping athletes reach their full
                    potential.
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        padding: 2
                    }}
                >
                    <SportsKabaddiIcon style={{ fontSize: 60 }} />
                </Box>
            </Paper>

            <footer
                style={{
                    backgroundColor: stdTheme.palette.primary.main,
                    position: "fixed",
                    bottom: 0,
                    width: "100%"
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        variant="body2"
                        align="center"
                        style={{ fontSize: "1rem" }}
                    >
                        &#169; All rights reserved Viktor A. Rattleff
                        <Tooltip title="Github">
                            <IconButton
                                component={Link}
                                href="https://github.com/VARattleff"
                                target="_blank"
                                color="inherit"
                            >
                                <GitHubIcon />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                </Container>
            </footer>
        </>
    );
}

export default Home;