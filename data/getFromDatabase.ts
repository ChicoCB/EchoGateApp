import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

const getFromDatabase = (endpoint: string) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const options: AxiosRequestConfig<any> = {
        method: "get",
        url: `http://192.168.0.173:3000/${endpoint}`,
    };

    const getData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            setData(response.data.data)
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return { data, isLoading, error };
};

export default getFromDatabase;