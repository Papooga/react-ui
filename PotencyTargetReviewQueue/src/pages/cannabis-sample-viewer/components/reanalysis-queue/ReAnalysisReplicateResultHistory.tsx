import * as React from "react";
import {Card} from "@heroui/react";
import {IReplicateRequest} from "../../../../../types/repetition-request.types.ts";

interface IProps {
    replicateRequest: IReplicateRequest;
}
const ReAnalysisReplicateResultHistory: React.FC<IProps> = ({replicateRequest}) => {
    return (
        <>
            <Card className="min-h-[250px] px-[14px] py-[18px] bg-[#f4f4f5] shadow-none">
                <div className="mb-5">
                    <p className={"text-[16px] font-semibold"}>Analysis History</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Card className="w-sm-[220px] p-[14px] shadow-none ">
                        <p className={"text-[12px]"}>Requested by</p>
                        <p className={"text-[15px] font-semibold"}>{replicateRequest.requestedBy}</p>
                    </Card>
                    <Card className="w-sm-[220px] p-[14px] shadow-none ">
                        <p className={"text-[12px]"}>Requested on</p>
                        <p className={"text-[15px] font-semibold"}>{replicateRequest.requestedDateTime}</p>
                    </Card>
                    <Card className="w-sm-[220px] p-[14px] shadow-none ">
                        <p className={"text-[12px]"}>Re-analysis reps</p>
                        <p className={"text-[15px] font-semibold"}>{replicateRequest.reanalysisReps}</p>
                    </Card>
                    <Card className="w-sm-[220px] p-[14px] shadow-none ">
                        <p className={"text-[12px]"}>Reason for Reanalysis</p>
                        <p className={"text-[15px] font-semibold"}>{replicateRequest.notes}</p>
                    </Card>
                    <Card className="w-sm-[220px] p-[14px] shadow-none ">
                        <p className={"text-[12px]"}>Item brand</p>
                        <p className={"text-[15px] font-semibold"}>{replicateRequest.itemBrand}</p>
                    </Card>
                    <Card className="w-sm-[220px] p-[14px] shadow-none ">
                        <p className={"text-[12px]"}>Client</p>
                        <p className={"text-[15px] font-semibold"}>{replicateRequest.clientName}</p>
                    </Card>
                </div>
            </Card>
        </>
    )
}
export default ReAnalysisReplicateResultHistory;