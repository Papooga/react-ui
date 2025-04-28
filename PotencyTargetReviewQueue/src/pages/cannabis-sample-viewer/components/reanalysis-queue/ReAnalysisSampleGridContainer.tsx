import {useEffect} from "react";
import ReAnalysisSampleGrid from "./ReAnalysisSampleGrid.tsx";
import {useCannabisSampleFilterStore} from "../../../../stores/useCannabisSampleFilterStore.ts";
import {useFetchReAnalysisSamples} from "../../queries/useFetchReAnalysisSamples.ts";

const ReAnalysisSampleGridContainer = () => {
    const searchTrigger = useCannabisSampleFilterStore((state) => state.searchTrigger);

    const { data: replicateRequests, isPending: loading, refetch } = useFetchReAnalysisSamples();

    useEffect(() => {
        refetch();
    }, [searchTrigger])

    return (
        <>
            <ReAnalysisSampleGrid replicateRequests={replicateRequests ?? []} loading={loading} />
        </>
    )
}

export default ReAnalysisSampleGridContainer;