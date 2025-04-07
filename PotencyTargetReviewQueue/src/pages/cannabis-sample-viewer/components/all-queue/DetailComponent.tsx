import {IAnalyte, ICannabisSampleViewer} from "../../../../../types/cannabis-sample.types.ts";
import SampleHistoricalData from "./SampleHistoricalData.tsx";
import {Select, SelectItem} from "@heroui/react";
import * as React from "react";
import {useState} from "react";
import {
    defaultHistoricalSelectedValue,
    defaultHistoricalSelectValues,
    HistoricalSelectDataType
} from "../../CannabisSample.util.ts";
import {useFetchSampleHistoricalDataQuery} from "../../queries/useFetchSampleHistoricalDataQuery.ts";

interface DetailProps {
    sample: ICannabisSampleViewer;
}
const DetailComponent: React.FC<DetailProps> = ({ sample }) => {
    const [historicalTimeFrame, setHistoricalTimeFrame] = useState<HistoricalSelectDataType>(defaultHistoricalSelectedValue);
    const historicalSelectValues : HistoricalSelectDataType[] = defaultHistoricalSelectValues;
    const [selectedAnalyte, setSelectedAnalyte] = useState<IAnalyte | null>(null);
    const { data: analytesWithHistData, isPending: loading } = useFetchSampleHistoricalDataQuery(sample, historicalTimeFrame.key)

    return (
        <div className={"p-[14px] h-[100%]"}>
            <Select className="max-w-xs mb-3 rounded-lg" label="Historical time frame"
                    isLoading={loading}
                    isDisabled={loading}
                    size={"sm"}
                    variant={"faded"}
                    selectedKeys={[historicalTimeFrame.key]}
                    onSelectionChange={(keys) => {
                        setSelectedAnalyte(null);
                        setHistoricalTimeFrame(
                            {
                                key: Array.from(keys)[0] as string,
                                label: historicalSelectValues.find(x => x.key === Array.from(keys)[0])?.label ?? "",
                            }
                        )
                    }}
                    placeholder="Select historical time frame">
                {historicalSelectValues.map((item) => (
                    <SelectItem key={item.key}>{item.label}</SelectItem>
                ))}
            </Select>
            <Select className="max-w-xs mb-3 bg-white rounded-lg ml-2"
                    label="Select Analyte"
                    isDisabled={loading}
                    size="sm"
                    variant="faded"
                    selectedKeys={selectedAnalyte ? [String(selectedAnalyte.analyteId)] : []}
                    onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as number;
                        const analyte = analytesWithHistData?.find(a => a.analyteId === +(selectedKey)) || null;
                        setSelectedAnalyte(analyte);
                    }}
                    placeholder="Choose an Analyte">
                {analytesWithHistData ? (
                    analytesWithHistData.map((analyte) => (
                        <SelectItem key={analyte.analyteId}>{analyte.analyteName}</SelectItem>
                    ))
                ) : null}
            </Select>

            { selectedAnalyte &&
                <SampleHistoricalData samplePanelId={sample.samplePanelId}
                                      analyte={selectedAnalyte}
                                      historicalTimeFrame={historicalTimeFrame}
                                      itemBrand={sample.itemBrand}/>
            }
        </div>
    );
};

export default DetailComponent;
