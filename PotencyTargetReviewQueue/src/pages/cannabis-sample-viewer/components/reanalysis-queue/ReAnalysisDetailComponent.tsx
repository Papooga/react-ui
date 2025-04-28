import * as React from "react";
import {useMemo} from "react";
import {IReplicateRequest} from "../../../../../types/repetition-request.types.ts";
import ReAnalysisReplicateResultsGrid from "./ReAnalysisReplicateResultsGrid.tsx";
import ReAnalysisReplicateResultHistory from "./ReAnalysisReplicateResultHistory.tsx";
import {useFetchReAnalysisDetailsData} from "../../queries/useFetchReAnalysisDetailsData.ts";

interface IProps {
    replicateRequest: IReplicateRequest;
    analytes?: string[];
}
const ReAnalysisDetailComponent: React.FC<IProps> = ({replicateRequest, analytes}) => {
    const stableAnalytes = useMemo(() => analytes || ["TOTTHC"], [analytes]);
    const { data: requestDetails, isPending: loading } = useFetchReAnalysisDetailsData(stableAnalytes, replicateRequest.samplePanelId);

    console.log(requestDetails);

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