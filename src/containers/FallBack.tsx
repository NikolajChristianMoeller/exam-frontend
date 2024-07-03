import { Link } from "react-router-dom";
import { Button, Typography, Box, Grid, Paper } from "@mui/material";

/**
 * FallBack component.
 */
function FallBack() {
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
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ height: "85vh" }}
                >
                    <Grid item>
                        <Typography
                            variant="h1"
                            color="primary"
                            gutterBottom
                            sx={{
                                fontWeight: "bold",
                                fontSize: "6rem"
                            }}
                        >
                            404
                        </Typography>
                        <Typography
                            variant="h5"
                            color="textPrimary"
                            gutterBottom
                        >
                            Page not found
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box mt={2}>
                            <Button
                                component={Link}
                                to="/"
                                variant="outlined"
                                color="primary"
                            >
                                Go to Home
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default FallBack;