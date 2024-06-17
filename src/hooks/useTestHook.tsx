import { useEffect, useState } from "react";
import Api from "../helpers/Api";

type Tdata = {
    id: number,
    name: string
}[];

export default function useTestHook() {
    const [data, setData] = useState<Tdata>([]);
    const [isLoading, setIsLoading] = useState<null | boolean>(null);

    const getData = async () => {
        try {
            setIsLoading(true);
            const { data: res } = await Api.get("skabelon");
            setData(res);
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, [data]);

    return {
        data,
        isLoading
    }
}