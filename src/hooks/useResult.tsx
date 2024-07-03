import { useEffect, useState } from "react";
import { TCreateResult, TResult } from "../types/result.type.ts";
import useSuccess from "./useSuccess.tsx";
import useError from "./useError.tsx";
import Api from "../utils/Api.tsx";

function useResult() {
    const [result, setResult] = useState<TResult[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { showSuccess } = useSuccess();
    const { handleError } = useError();

    useEffect(() => {
        getResults();
    }, []);

    const getResults = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const res = await Api.get("results");
            setResult(res);
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const createResult = async (newResult: TCreateResult): Promise<void> => {
        setIsLoading(true);
        try {
            const res = await Api.post("results", newResult);
            setResult((prev) => (prev ? [...prev, res] : [res]));
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateResult = async (
        updatedResult: TCreateResult,
        id: number
    ): Promise<void> => {
        setIsLoading(true);
        try {
            const res = await Api.put("results", id, updatedResult);
            showSuccess("Result updated");
            setResult((prev) => {
                if (prev) {
                    const index = prev.findIndex((r) => r.id === id);
                    const newResults = [...prev];
                    newResults[index] = res;
                    return newResults;
                }
                return prev;
            });
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteResult = async (id: number): Promise<void> => {
        setIsLoading(true);
        try {
            await Api.delete("results", id);
            showSuccess("Result deleted");
            setResult((prev) => (prev ? prev.filter((r) => r.id !== id) : []));
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        result,
        isLoading,
        createResult,
        updateResult,
        deleteResult
    };
}

export default useResult;