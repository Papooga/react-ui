import {useEffect, useState} from "react";
import {AgChartOptions} from "ag-charts-community";
import {IAnalyte} from "../../../../types/cannabis-sample.types.ts";
import {HistoricalSelectDataType} from "../PotencyTargetReviewQueue.util.ts";

export const useAnalyteChartOptions = (analyte: IAnalyte, historicalTimeFrame: HistoricalSelectDataType) => {
    const [options, setOptions] = useState<AgChartOptions>({});

    useEffect(() => {
        if (!analyte.historicalData || analyte.historicalData.length === 0) return;

        const processedData = analyte.historicalData.map((item) => ({
            ...item,
            createdOn: new Date(item.createdOn),
        }));

        const total = processedData.reduce((sum, item) => sum + item.analysisResult, 0);
        const average = total / processedData.length;

        const averageLineData = [
            { createdOn: processedData[0].createdOn, analysisResult: average },
            { createdOn: processedData[processedData.length - 1].createdOn, analysisResult: average }
        ];

        setOptions({
            title: { text: `Historical data of Analyte: ${analyte.analyteName}` },
            subtitle: { text: `Data for ${historicalTimeFrame.label}` },
            series: [
                {
                    type: "scatter",
                    title: "Historical point",
                    data: processedData,
                    xKey: "createdOn",
                    xName: "Datetime",
                    yKey: "analysisResult",
                    yName: "Total THC (%)",
                },
                {
                    type: "line",
                    title: "Average",
                    data: averageLineData,
                    xKey: "createdOn",
                    yKey: "analysisResult",
                    stroke: "#27AE60",
                    strokeWidth: 2,
                    lineDash: [6, 6],
                }
            ],
            axes: [
                {
                    type: "time",
                    position: "bottom",
                    title: { text: "Datetime" },
                    label: {
                        formatter: ({ value }) =>
                            new Date(value).toLocaleDateString("en-GB"),
                    },
                },
                {
                    type: "number",
                    position: "left",
                    title: { text: "Total THC (%)" },
                },
            ]
        });

    }, [analyte, historicalTimeFrame]);

    return options;
}