import {useQuery} from "@tanstack/react-query";
import agent from "../../../api/agent.ts";
import {IApiKeyResponse} from "../../../../types/clients.type.ts";

export const useFetchNewApiKey = () => {
    return useQuery({
        queryKey: ["client", "apiKey"],
        queryFn: fetchApiKey,
        enabled: false,
        staleTime: 0,
    })
}

const fetchApiKey = async () => {
    return await agent.get<IApiKeyResponse>("/api/v1/get-api-key");
}