import { useSnackbar } from "notistack";

function useError() {
    const { enqueueSnackbar } = useSnackbar();

    const handleError = (e: unknown) => {
        console.error(e);
        let message = "An error occurred";
        if (e instanceof Error) {
            message += `:\n${e.message}`;
        }
        enqueueSnackbar(message, {
            variant: "error",
            preventDuplicate: true,
            persist: false
        });
        throw e;
    };

    return { handleError };
}

export default useError;
