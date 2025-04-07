import * as React from "react";
import {Card} from "@heroui/react";
import {IAnalyte} from "../../../../../types/cannabis-sample.types.ts";
import {HistoricalSelectDataType} from "../../CannabisSample.util.ts";

interface AnalyteCardProps {
    analyte: IAnalyte;
    historicalTimeFrame: HistoricalSelectDataType;
    itemBrand: string
}

const SampleHistoricalAnalyteCard: React.FC<AnalyteCardProps> = ({analyte, historicalTimeFrame, itemBrand}) => {
    return (
        <Card className="min-h-[250px] px-[14px] py-[18px] bg-[#f4f4f5] shadow-none">
            <div className="mb-5">
                <p className={"text-[12px]"}>Historical Data for</p>
                <p className={"text-[16px] font-semibold"}>{itemBrand}</p>
            </div>

            <div className="flex flex-wrap gap-3">
                <Card className="w-sm-[220px] p-[14px] shadow-none ">
                    <p className={"text-[12px]"}>Sample Count for {historicalTimeFrame.label}</p>
                    <p className={"text-[15px] font-semibold"}>{analyte.historicalCount}</p>
                </Card>
                <Card className="w-[220px] p-[14px] shadow-none ">
                    <p className={"text-[12px]"}>Highest THC</p>
                    <p className={"text-[15px] font-semibold"}>{analyte.highestValue}%</p>
                </Card>
                <Card className="w-[220px] p-[14px] shadow-none ">
                    <p className={"text-[12px]"}>Lowest THC</p>
                    <p className={"text-[15px] font-semibold"}>{analyte.lowestValue}%</p>
                </Card>
                <Card className="w-[220px] p-[14px] shadow-none ">
                    <p className={"text-[12px]"}>Average THC</p>
                    <p className={"text-[15px] font-semibold"}>{analyte.lowestValue}%</p>
                </Card>
                <Card className="w-[220px] p-[14px] shadow-none ">
                    <p className={"text-[12px]"}>Standard Deviation</p>
                    <p className={"text-[15px] font-semibold"}>{analyte.stdDev}%</p>
                </Card>
            </div>
        </Card>
    )
}

export default SampleHistoricalAnalyteCard;