import {
    TDiscipline,
    TDisciplineCreate,
    TDisciplineUpdate
} from "../types/discipline.type.ts";
import { useEffect, useState } from "react";
import useSuccess from "./useSuccess.tsx";
import useError from "./useError.tsx";
import Api from "../utils/Api.tsx";

function useDiscipline() {
    const [discipline, setDiscipline] = useState<TDiscipline[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showSuccess } = useSuccess();
    const { handleError } = useError();

    useEffect(() => {
        getDiscipline();
    }, []);

    const getDiscipline = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const res = await Api.get("disciplines");
            setDiscipline(res);
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const createDiscipline = async (
        newDiscipline: TDisciplineCreate
    ): Promise<void> => {
        setIsLoading(true);
        try {
            const res = await Api.post("disciplines", newDiscipline);
            showSuccess("Discipline created");
            setDiscipline((prevDiscipline) => [...prevDiscipline, res]);
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateDiscipline = async (
        updatedDiscipline: TDisciplineUpdate,
        id: number
    ): Promise<void> => {
        setIsLoading(true);
        try {
            const res = await Api.put("disciplines", id, updatedDiscipline);
            showSuccess("Discipline updated");
            setDiscipline((prevDiscipline) => {
                const index = prevDiscipline.findIndex((d) => d.id === id);
                const newDisciplines = [...prevDiscipline];
                newDisciplines[index] = res;
                return newDisciplines;
            });
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        discipline,
        isLoading,
        createDiscipline,
        updateDiscipline
    };
}

export default useDiscipline;