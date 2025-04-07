import {useQuery} from "@tanstack/react-query";
import {IAnalyte, ICannabisSampleViewer} from "../../../../types/cannabis-sample.types.ts";
import agent from "../../../api/agent.ts";

export const useFetchSampleHistoricalDataQuery = (sample: ICannabisSampleViewer, historicalTimeFrameKey: string) => {
    return useQuery({
        queryKey: ["potency-samples",  "historical-data", sample.sampleId],
        queryFn: () => fetchSampleHistoricalData(sample, historicalTimeFrameKey),
    })
}

const fetchSampleHistoricalData = async  (sample: ICannabisSampleViewer, historicalTimeFrameKey: string) => {
    const apiUrl = '/api/v1/cannabinoids-historical-data';
    const payload = {
        "samplePanelId": sample.samplePanelId,
        "historicalDays": historicalTimeFrameKey,
    };
    return await agent.post<IAnalyte[]>(apiUrl, payload);
}