import * as React from "react";
import {Card} from "@heroui/react";
import {IAnalyte} from "../../../../../types/cannabis-sample.types.ts";
import { AgCharts } from "ag-charts-react";
import {HistoricalSelectDataType} from "../../CannabisSample.util.ts";
import {useAnalyteChartOptions} from "../../hooks/useAnalyteChartOptions.ts";

interface AnalyteHistoricalChartProps {
    analyte: IAnalyte;
    historicalTimeFrame: HistoricalSelectDataType;
}

const AnalyteHistoricalChart: React.FC<AnalyteHistoricalChartProps> = ({analyte, historicalTimeFrame}) => {
    const options = useAnalyteChartOptions(analyte, historicalTimeFrame);

    return (
        <Card className="h-[100%] px-[14px] py-[18px] bg-[#f4f4f5] shadow-none">
            <AgCharts className={"h-[100%] rounded-b-2xl overflow-hidden"} options={options} />
        </Card>
    );
}

export default AnalyteHistoricalChart;