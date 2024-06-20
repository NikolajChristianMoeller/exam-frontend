import { useEffect, useState } from "react";
import Api from "../helpers/Api";
import type {Tdata} from "../types/test.type.ts";

export default function useTestHook() {
    const [data, setData] = useState<Tdata[]>([]);
    const [isLoading, setIsLoading] = useState<null | boolean>(null);

    const getData = async () => {
        try {
            setIsLoading(true);
            const res  = await Api.get("participants");
            setData(res);
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            setIsLoading(false);
        }
    }

    const createTestData = async (data: Tdata): Promise<void> => {
        try {
            setIsLoading(true)
            const res = await Api.post("participants", data);
            setData((prev) => [...prev, res]);
        } catch (e) {
            console.error(e);
            throw  e;
        } finally {
            setIsLoading(false)
        }
    }

    const updateTestData = async (data: Tdata): Promise<void> => {
        setIsLoading(true);
        try {
            const res = await Api.put('participants', data.id, data);
            setData((prev) => prev.map((item) => (item.id === res.id ? res : item)));
        } catch (error) {
            console.error(error)
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const deleteData = async (id: number): Promise<void> => {
        try {
            setIsLoading(true)
            await Api.delete("participants", id);
            setData((prev) => prev.filter((item) => item.id !== id));
        } catch (e) {
            console.error(e);
            throw  e;
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return {
        data,
        isLoading,
        createTestData,
        deleteData,
        updateTestData
    }
}