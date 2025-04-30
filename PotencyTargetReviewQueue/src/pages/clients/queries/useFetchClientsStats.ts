import {useQuery} from "@tanstack/react-query";
import agent from "../../../api/agent.ts";
import {IClientStats} from "../../../../types/clients.type.ts";

export const useFetchClientsStats = () => {
    return useQuery({
        queryKey: ["clients-stats"],
        queryFn: fetchQueryStats
    })
}

const fetchQueryStats = async () => {
    return await agent.get<IClientStats>("/api/v1/get-clients-stats");
}