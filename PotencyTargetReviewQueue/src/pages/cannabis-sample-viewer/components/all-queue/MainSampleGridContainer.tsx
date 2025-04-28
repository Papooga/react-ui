import MainSampleGrid from "./MainSampleGrid.tsx";
import {useCannabisSampleFilterStore} from "../../../../stores/useCannabisSampleFilterStore.ts";
import {useFetchSamplesQuery} from "../../queries/useFetchSamplesQuery.ts";
import {useEffect} from "react";

const MainSampleGridContainer = () => {
    const searchTrigger = useCannabisSampleFilterStore((state) => state.searchTrigger);
    const { data: samples, isPending: loading, refetch } = useFetchSamplesQuery();

    useEffect(() => {
        refetch();
    }, [searchTrigger]);

    return (
        <>
            <MainSampleGrid samples={samples ?? []} isLoadingSamples={loading} />
        </>
    )
}

export default MainSampleGridContainer;