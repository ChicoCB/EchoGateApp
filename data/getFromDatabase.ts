import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { SERVER_IP } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useGetFromDatabase = (endpoint: string) => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const getData = async () => {
        setIsLoading(true);
        const token = await AsyncStorage.getItem('token');
        const options: AxiosRequestConfig<any> = {
            method: "get",
            url: `http://${SERVER_IP}/${endpoint}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        try {
            const response = await axios.request(options);
            setData(response.data)
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

export default useGetFromDatabase;