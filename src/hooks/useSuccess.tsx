import { useSnackbar } from "notistack";

/**
 * Custom hook to show success messages using notistack
 */
function useSuccess() {
    const { enqueueSnackbar } = useSnackbar();

    /**
     * Show a success message
     * @param message - The success message to display
     */
    const showSuccess = (message: string) => {
        enqueueSnackbar(message, {
            variant: "success",
            preventDuplicate: true,
            persist: false
        });
    };

    return { showSuccess };
}

export default useSuccess;