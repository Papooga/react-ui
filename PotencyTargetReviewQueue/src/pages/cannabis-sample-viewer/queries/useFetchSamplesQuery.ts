import {useQuery} from "@tanstack/react-query";
import {DateValue} from "@heroui/react";
import {formatDate} from "../CannabisSample.util.ts";
import agent from "../../../api/agent.ts";
import {ICannabisSampleViewer} from "../../../../types/cannabis-sample.types.ts";
import {useCannabisSampleFilterStore} from "../../../stores/useCannabisSampleFilterStore.ts";

export const useFetchSamplesQuery = ()  => {
    const startDate = useCannabisSampleFilterStore.getState().startDate;
    const endDate = useCannabisSampleFilterStore.getState().endDate;
    return useQuery({
        queryKey: ["potency-samples"],
        queryFn: () => fetchSamples(startDate, endDate),
        enabled: false,
        staleTime: 1000 * 60 * 5,
        retry: 1
    })
}

const fetchSamples = async (startDate: DateValue | null, endDate: DateValue | null) => {
    if (!startDate || !endDate) return [];

    const apiUrl = "/api/v1/cannabinoids-potency-review-queue";
    const payload = {
        sampleId: null,
        receivedStartDate: formatDate(startDate),
        receivedEndDate: formatDate(endDate),
        historicalDays: 548,
        analytes: ["TOTCBD", "TOTTHC"],
        testCategories: [],
        clients: []
    };

    return await agent.post<ICannabisSampleViewer[]>(apiUrl, payload);
};