import { useQuery } from "@tanstack/react-query";
import {useCannabisSampleFilterStore} from "../../../stores/useCannabisSampleFilterStore.ts";
import { DateValue } from "@heroui/react";
import {formatDate} from "../PotencyTargetReviewQueue.util.ts";
import agent from "../../../api/agent.ts";
import {IReplicateRequest} from "../../../../types/repetition-request.types.ts";

export const useFetchReAnalysisSamples = () => {
    const startDate = useCannabisSampleFilterStore.getState().startDate;
    const endDate = useCannabisSampleFilterStore.getState().endDate;

    return useQuery({
        queryFn: () => fetchReAnalysisSamples(startDate, endDate),
        queryKey: ["potency-reanalysis-samples"],
        enabled: false,
        staleTime: 1000 * 60 * 5,
        retry: 1
    })
}

const fetchReAnalysisSamples = async (startDate: DateValue | null, endDate: DateValue | null) => {
    if (!startDate || !endDate) return [];

    const apiUrl = '/api/v1/replicate-requests';
    const payload = {
        "receivedStartDate": formatDate(startDate),
        "receivedEndDate": formatDate(endDate),
    };

    return await agent.post<IReplicateRequest[]>(apiUrl, payload);
}