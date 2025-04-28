import * as React from "react";
import SampleHistoricalAnalyteCard from "./SampleHistoricalAnalyteCard.tsx";
import {IAnalyte} from "../../../../../types/cannabis-sample.types.ts";
import {HistoricalSelectDataType} from "../../PotencyTargetReviewQueue.util.ts";
import AnalyteRepetitionGrid from "./AnalyteRepetitionGrid.tsx";
import AnalyteHistoricalChart from "./AnalyteHistoricalChart.tsx";

interface HistoricalDataProps {
    samplePanelId: number;
    analyte: IAnalyte;
    historicalTimeFrame: HistoricalSelectDataType;
    itemBrand: string;
}

const SampleHistoricalData: React.FC<HistoricalDataProps> = ({analyte, historicalTimeFrame, itemBrand, samplePanelId}) => {

    return (
        <div className="flex gap-4">
            <div className={"flex-1"}>
                <div className={"flex flex-col gap-4"}>
                    { analyte && (
                        <SampleHistoricalAnalyteCard analyte={analyte}
                                                     historicalTimeFrame={historicalTimeFrame}
                                                     itemBrand={itemBrand}/>
                    )}

                    <AnalyteRepetitionGrid samplePanelId={samplePanelId} />
                </div>
            </div>

            <div className={"flex-1"}>
                <AnalyteHistoricalChart analyte={analyte}
                                        historicalTimeFrame={historicalTimeFrame} />
            </div>
      </div>
    );
}

export default SampleHistoricalData;