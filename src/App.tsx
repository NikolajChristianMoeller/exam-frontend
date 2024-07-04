import { stdTheme } from "./theme/theme.tsx";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import NavBar from "./components/NavBar.tsx";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home.tsx";
import FallBack from "./containers/FallBack.tsx";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import Discipline from "./containers/Discipline.tsx";
import Result from "./containers/Result.tsx";
import Participant from "./containers/Participant.tsx";

/**
 * App component.
 */
function App() {
    useEffect(() => {
        console.log(
            "%cWelcome to the console xD \n\n%cAll rights reserved Viktor A. Rattleff.",
            "color: yellow; font-size: 15px",
            "color: yellow; font-size: 10px"
        );
    }, []);
    return (
        <>
            <SnackbarProvider maxSnack={3}>
                <ThemeProvider theme={stdTheme}>
                    <CssBaseline />
                    <NavBar />
                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                        />
                        <Route
                            path="/discipline"
                            element={<Discipline />}
                        />
                        <Route
                            path="/results"
                            element={<Result />}
                        />
                        <Route
                            path="/participants"
                            element={<Participant />}
                        />
                        <Route
                            path="/*"
                            element={<FallBack />}
                        />
                    </Routes>
                </ThemeProvider>
            </SnackbarProvider>
        </>
    );
}

export default App;