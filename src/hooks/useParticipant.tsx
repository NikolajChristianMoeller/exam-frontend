import { useEffect, useState } from "react";
import type {
    TParticipant,
    TParticipantCreateAndUpdate
} from "../types/participant.type.ts";
import useSuccess from "./useSuccess.tsx";
import useError from "./useError.tsx";
import Api from "../utils/Api.tsx";

function useParticipant() {
    const [participants, setParticipants] = useState<TParticipant[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { showSuccess } = useSuccess();
    const { handleError } = useError();

    useEffect(() => {
        getParticipants();
    }, []);

    const getParticipants = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const res = await Api.get("participants");
            setParticipants(res);
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const createParticipant = async (
        newParticipant: TParticipantCreateAndUpdate
    ): Promise<void> => {
        setIsLoading(true);
        try {
            const res = await Api.post("participants", newParticipant);
            showSuccess("Participant created");
            setParticipants((prevParticipants) => [...prevParticipants, res]);
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteParticipant = async (id: number): Promise<void> => {
        setIsLoading(true);
        try {
            await Api.delete("participants", id);
            showSuccess("Participant deleted");
            setParticipants((prevParticipants) =>
                prevParticipants.filter((p) => p.id !== id)
            );
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateParticipant = async (
        updatedParticipant: TParticipantCreateAndUpdate,
        id: number
    ): Promise<void> => {
        setIsLoading(true);
        try {
            const res = await Api.put("participants", id, updatedParticipant);
            showSuccess("Participant updated");
            setParticipants((prevParticipants) => {
                const index = prevParticipants.findIndex((p) => p.id === id);
                const newParticipants = [...prevParticipants];
                newParticipants[index] = res;
                return newParticipants;
            });
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        participants,
        isLoading,
        createParticipant,
        deleteParticipant,
        updateParticipant
    };
}

export default useParticipant;