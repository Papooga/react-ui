import {useQuery} from "@tanstack/react-query";
import agent from "../../../api/agent.ts";
import {IStatus} from "../../../../types/repetition-request.types.ts";

export function useFetchStatusesQuery() {
    return useQuery({
        queryKey: ["statuses"],
        queryFn: fetchStatuses,
        staleTime: Infinity,
    })
}

const fetchStatuses = async (): Promise<IStatus[]> => {
    return await agent.get<IStatus[]>('/api/v1/replicate-statuses');
}