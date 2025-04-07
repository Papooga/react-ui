import * as React from "react";
import {Card} from "@heroui/react";
import {AgGridReact} from "ag-grid-react";
import {useEffect, useMemo, useRef, useState} from "react";
import {defColDefs, flattenAnalytes, getValueOrDash} from "../../CannabisSample.util.ts";
import {ColDef} from "ag-grid-enterprise";
import {useFetchAnalyteRepetitions} from "../../queries/useFetchAnalyteRepetitions.ts";

interface AnalyteRepetitionProps {
    samplePanelId: number;
}
const AnalyteRepetitionGrid: React.FC<AnalyteRepetitionProps> = ({samplePanelId}) => {
    const { data: analyteWithReps, isPending: loading } = useFetchAnalyteRepetitions(samplePanelId);
    const [maxReps, setMaxReps] = useState<number>(0);

    const gridRef = useRef<AgGridReact>(null);
    const gridStyle = useMemo(() => ({ width: "100%" }), []);
    const [columnDefs, setColumnDefs] = useState<ColDef[]>(defColDefs);
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const [rowData, setRowData] = useState<any[]>([]);
    /* eslint-enable @typescript-eslint/no-explicit-any */

    useEffect(() => {
        if (analyteWithReps && analyteWithReps.length > 0) {
            setMaxReps(Math.max(...analyteWithReps.map(a => a.replicates.length)));
        }
    }, [analyteWithReps]);

    useEffect(() => {
        if (analyteWithReps && analyteWithReps.length > 0 && maxReps > 0) {
            setRowData(flattenAnalytes(analyteWithReps, maxReps));
        }
    }, [analyteWithReps, maxReps]);
    
    useEffect(() => {
        setColumnDefs(
            [
                { field: "analyteName", headerName: "Analyte", width: 120 },
                {
                    headerName: "Target/Range",
                    valueGetter: p => `${getValueOrDash(p.data?.potencyTargetLow)} / ${getValueOrDash(p.data?.potencyTargetHigh)}`,
                    width: 150
                },
                {
                    headerName: "Status",
                    valueGetter: p => p.data?.potencyOffTarget ? 'Off target' : 'On target',
                    width: 150
                },
                {
                    headerName: "Result",
                    valueGetter: p => p.data?.averageResultFmt,
                    width: 150
                },
                ...Array.from({ length: maxReps }, (_, i) => ({
                    headerName: `Rep ${i + 1}`,
                    field: `Rep${i + 1}`,
                    width: 120
                }))
            ]
        )
    }, [maxReps])

    return (
        <div>
            <Card className="min-h-[250px] px-[14px] py-[18px] bg-[#f4f4f5] shadow-none">
                <p className={"text-[16px] font-semibold mb-3"}>All Cannabinoids</p>

                <div className="ag-theme-alpine" style={gridStyle}>
                    <AgGridReact ref={gridRef}
                                 loading={loading}
                                 rowData={rowData}
                                 columnDefs={columnDefs}
                                 domLayout={"autoHeight"}
                                 pagination={true}
                                 paginationAutoPageSize={true} />
                </div>
            </Card>
        </div>
    )
}

export default AnalyteRepetitionGrid;