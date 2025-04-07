import {useQuery} from "@tanstack/react-query";
import agent from "../../../api/agent.ts";
import {
    IPaginatedResponseICannabisSampleViewer,
    IPotencyReplicateResponse
} from "../../../../types/cannabis-sample.types.ts";

async function fetchAnalyteRepetitions(samplePanelId: number) {
    const apiUrl = '/api/v1/potency-and-replicate-data';
    const payload = {
        "samplePanelId": samplePanelId,
        "pageNumber": 1,
        "pageSize": 0
    };

    const response = await agent.post<IPaginatedResponseICannabisSampleViewer<IPotencyReplicateResponse>>(apiUrl, payload);
    return response.samples.length > 0 ? response.samples[0].analytes : []
}

export const useFetchAnalyteRepetitions = (samplePanelId: number) => {
    return useQuery({
        queryKey: ["potency-samples", "historical-data", "analyte-repetitions", samplePanelId],
        queryFn: () => fetchAnalyteRepetitions(samplePanelId)
    })
}