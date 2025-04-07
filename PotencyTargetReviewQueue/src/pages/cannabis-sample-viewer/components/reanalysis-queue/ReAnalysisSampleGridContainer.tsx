import {useEffect, useState} from "react";
import {IReplicateRequest} from "../../../../../types/repetition-request.types.ts";
import ReAnalysisSampleGrid from "./ReAnalysisSampleGrid.tsx";
import {useCannabisSampleFilterStore} from "../../../../stores/useCannabisSampleFilterStore.ts";
import {formatDate} from "../../CannabisSample.util.ts";
import agent from "../../../../api/agent.ts";

const ReAnalysisSampleGridContainer = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [replicateRequests, setReplicateRequests] = useState<IReplicateRequest[]>([]);
    const startDate = useCannabisSampleFilterStore((state) => state.startDate);
    const endDate = useCannabisSampleFilterStore((state) => state.endDate);
    const searchTrigger = useCannabisSampleFilterStore((state) => state.searchTrigger);
    
    const fetchReplicateRequests = async () => {
        if (startDate === null || endDate === null) return [];
        setLoading(true);
        setError(null);
        try {
            const apiUrl = '/api/v1/replicate-requests';
            const payload = {
                "receivedStartDate": formatDate(startDate),
                "receivedEndDate": formatDate(endDate),
            };

            const response = await agent.post<IReplicateRequest[]>(apiUrl, payload);
            setReplicateRequests(response);
        } catch (e) {
            setError(e as Error);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            await fetchReplicateRequests();
        };

        fetchData();
    }, [searchTrigger]);

    return (
        <>
            {loading && (
                <div>loading...</div>
            )}
            {!loading && replicateRequests && replicateRequests.length > 0 && (
                <ReAnalysisSampleGrid replicateRequests={replicateRequests} />
            )}
        </>
    )
}

export default ReAnalysisSampleGridContainer;