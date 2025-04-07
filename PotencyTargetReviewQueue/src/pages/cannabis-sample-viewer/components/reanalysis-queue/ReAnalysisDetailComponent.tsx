import * as React from "react";
import {useEffect, useMemo, useState} from "react";
import {IReplicateRequest, IReplicateRequestDetail} from "../../../../../types/repetition-request.types.ts";
import ReAnalysisReplicateResultsGrid from "./ReAnalysisReplicateResultsGrid.tsx";
import ReAnalysisReplicateResultHistory from "./ReAnalysisReplicateResultHistory.tsx";
import agent from "../../../../api/agent.ts";

interface IProps {
    replicateRequest: IReplicateRequest;
    analytes?: string[];
}
const ReAnalysisDetailComponent: React.FC<IProps> = ({replicateRequest, analytes}) => {
    const stableAnalytes = useMemo(() => analytes || ["TOTTHC"], [analytes]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [requestDetails, setRequestDetails] = useState<IReplicateRequestDetail[] | null>([]);

    useEffect(() => {
        const fetchReAnalysisDetailData = async () => {
            setLoading(true);
            setError(null);
            try {
                const apiUrl = '/api/v1/replicate-request-details';
                const payload = {
                    samplePanelId: replicateRequest.samplePanelId,
                    analytes: stableAnalytes
                };

                const response = await agent.post<IReplicateRequestDetail[]>(apiUrl, payload);
                console.log(payload);
                console.log(response);
                setRequestDetails(response);
            } catch (e) {
                setError(e as Error);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchReAnalysisDetailData();
    }, [replicateRequest.samplePanelId, stableAnalytes]);


    return (
        <div className={"p-[14px] h-[100%]"}>
            <div className={"flex gap-3"}>
                <div className={"flex-1 min-w-[38%] max-w-[60%] flex-grow"}>
                    <ReAnalysisReplicateResultHistory replicateRequest={replicateRequest} />
                </div>
                <div className={"flex-1 min-w-[60%] max-w-[60%] flex-grow"}>
                    <ReAnalysisReplicateResultsGrid requestDetails={requestDetails ? requestDetails : []}
                                                    loadingGrid={loading} />
                </div>
            </div>
        </div>
    )
}

export default ReAnalysisDetailComponent;