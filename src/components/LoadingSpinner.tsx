import CircularProgress from "@mui/material/CircularProgress";

/**
 * LoadingSpinner component.
 */
function LoadingSpinner() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100%",
                position: "fixed",
                top: 0,
                left: 0,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                zIndex: 9999,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.8)"
            }}
        >
            <CircularProgress color="primary" />
        </div>
    );
}

export default LoadingSpinner;