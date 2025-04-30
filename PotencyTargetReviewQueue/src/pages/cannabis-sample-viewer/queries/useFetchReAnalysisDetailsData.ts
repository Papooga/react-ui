import {useQuery} from "@tanstack/react-query";
import agent from "../../../api/agent.ts";
import {IReplicateRequestDetail} from "../../../../types/repetition-request.types.ts";

export const useFetchReAnalysisDetailsData = (stableAnalytes: string[], samplePanelId: number) => {
    return useQuery({
        queryFn: () => fetchReAnalysisDetailsData(stableAnalytes, samplePanelId),
        queryKey: ["potency-reanalysis-samples", "details", samplePanelId]
    })
}

const fetchReAnalysisDetailsData = async (stableAnalytes: string[], samplePanelId: number) => {
    const apiUrl = '/api/v1/replicate-request-details';
    const payload = {
        samplePanelId: samplePanelId,
        analytes: stableAnalytes
    };
    return await agent.post<IReplicateRequestDetail[]>(apiUrl, payload);
}