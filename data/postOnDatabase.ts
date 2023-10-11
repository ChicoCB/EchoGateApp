import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

const SERVER_ROUTE = "http://10.181.28.13:3000";

const postOnDatabase = (endpoint: string, dataToPost: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const options: AxiosRequestConfig<any> = {
        method: "post",
        url: `${SERVER_ROUTE}/${endpoint}`,
        data: dataToPost,
    };

    const postData = async () => {
        setIsLoading(true);

        try {
            await axios.request(options);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        postData();
    }, []);

    return { isLoading, error };
};

export default postOnDatabase;