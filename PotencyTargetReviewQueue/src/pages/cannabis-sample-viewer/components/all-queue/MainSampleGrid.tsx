import {ICannabisSampleViewer} from "../../../../../types/cannabis-sample.types.ts";
import { AgGridReact } from "ag-grid-react";
import {useCallback, useEffect, useState} from "react";

import {
    ClientSideRowModelModule,
    ColDef,
    DateFilterModule, GridApi, ICellRendererParams,
    ModuleRegistry,
    NumberFilterModule,
    PaginationModule,
    TextFilterModule,
} from "ag-grid-enterprise";
import DetailComponent from "./DetailComponent.tsx";
import ActionCell from "./ActionCell.tsx";
import PotencyTargetTypeCell from "./PotencyTargetTypeCell.tsx";

ModuleRegistry.registerModules([
    ClientSideRowModelModule, NumberFilterModule, TextFilterModule,
    DateFilterModule, PaginationModule
]);

interface Props {
    samples: ICannabisSampleViewer[],
    isLoadingSamples: boolean,
}
const MainSampleGrid: React.FC<Props> = ({ samples, isLoadingSamples }) => {
    const [rowData, setRowData] = useState<ICannabisSampleViewer[]>(samples);
    const [gridApi, setGridApi] = useState<GridApi<ICannabisSampleViewer> | null>(null);
    const detailCellRenderer = useCallback(DetailComponent, []);

    const columnDefs: ColDef<ICannabisSampleViewer>[] = [
        { field: "sampleId", headerName: "Sample ID", filter: "agNumberColumnFilter", cellRenderer: 'agGroupCellRenderer' },
        { field: "labSampleNr", headerName: "Lab Sample #", filter: "agNumberColumnFilter" },
        { field: "clientName", headerName: "Client", filter: true, sortable: true },
        { field: "confidentCannabisId", headerName: "CC ID", filter: true, sortable: true },
        { field: "metrcPackageNr", headerName: "Metrc Package #", filter: true, sortable: true },
        {
            field: "receivedOn",
            headerName: "Received On",
            valueGetter: p => p.data?.receivedOn ? new Date(p?.data.receivedOn) : null,
            valueFormatter: p => p.value ? new Intl.DateTimeFormat('en-US').format(p.value) : "",
            filter: "agDateColumnFilter"
        },
        {
            field: "neededBy", headerName: "Needed by", filter: "agDateColumnFilter",
            valueGetter: p => p.data?.neededBy ? new Date(p?.data.neededBy) : null,
            valueFormatter: p => p.value ? new Intl.DateTimeFormat('en-US').format(p.value) : "",
        },
        { field: "itemBrand", headerName: "Item brand"},
        { field: "sourcePackageNr", headerName: "Source package #" },
        { field: "potencyTargetUnit", headerName: "Potency Target Unit" },
        { field: "potencyTargetType", headerName: "Potency Target Type" },
        {
            headerName: "Total THC",
            valueGetter: p => p.data?.analytes.find(analyte =>
                analyte.analyteName.includes("THC"))?.measuredResult || "-",
        },
        {
            headerName: "THC Target",
            valueGetter: p => p.data?.analytes.find(analyte =>
                analyte.analyteName.includes("THC"))?.target || "-",
        },
        {
            headerName: "18 Mo Avg",
            valueGetter: p => p.data?.analytes.find(analyte =>
                analyte.analyteName.includes("THC"))?.average || "-",
        },
        {
            headerName: "18 Mo Sample Vol",
            valueGetter: p => p.data?.analytes.find(analyte =>
                analyte.analyteName.includes("THC"))?.historicalCount || "-",
        },
        {
            headerName: "18 Mo Low",
            valueGetter: p => p.data?.analytes.find(analyte =>
                analyte.analyteName.includes("THC"))?.lowestValue || "-",
        },
        {
            headerName: "18 Mo High",
            valueGetter: p => p.data?.analytes?.find(analyte =>
                analyte.analyteName.includes("THC"))?.highestValue || "-"
        },
        {
            headerName: "Total CBD",
            valueGetter: p => p.data?.analytes?.find(analyte =>
                analyte.analyteName.includes("CBD"))?.measuredResult || "-",
        },
        {
            headerName: "CBD Target",
            valueGetter: p => p.data?.analytes?.find(analyte =>
                analyte.analyteName.includes("CBD"))?.target || "-",
        },
        {
            headerName: "18 Mo Avg",
            valueGetter: p => p.data?.analytes?.find(analyte =>
                analyte.analyteName.includes("CBD"))?.average || "-"
        },
        {
            headerName: "18 Mo Sample Vol",
            valueGetter: p => p.data?.analytes?.find(analyte =>
                analyte.analyteName.includes("CBD"))?.historicalCount || "-"
        },
        {
            headerName: "18 Mo Low",
            valueGetter: p => p.data?.analytes?.find(analyte =>
                analyte.analyteName.includes("CBD"))?.lowestValue || "-"
        },
        {
            headerName: "18 Mo High",
            valueGetter: p => p.data?.analytes?.find(analyte =>
                analyte.analyteName.includes("CBD"))?.highestValue || "-"
        },
        {
            headerName: "Target source",
            cellRenderer: PotencyTargetTypeCell,
            valueGetter: p => p.data?.potencyTargetType,
            cellRendererParams: (params: ICellRendererParams<ICannabisSampleViewer>) => ({
                potencyTargetType: params.data?.potencyTargetType
            }),
            filter: 'agSetColumnFilter',
            filterParams: {
                values: ['UserSupplied', 'HistoricalAverage', 'ManifestAverage', 'ManifestPair'],
                debounceMs: 200,
            },
        },
        {
            headerName: "Actions",
            pinned: "right",
            width: 110,
            cellRenderer: ActionCell,
            cellRendererParams: (params: ICellRendererParams<ICannabisSampleViewer>) => ({
                sample: params.data,
                handleRowRemoveFromSampleGrid: handleRowRemoveFromGrid,
                onReplicateRequestCreated: handleOnReplicateRequestCreated
            }),
        },
    ];
    const handleRowRemoveFromGrid = (sample: ICannabisSampleViewer) => {
        setRowData((prev) =>
            prev.filter(row => row.sampleId !== sample.sampleId));
    };
    const handleOnReplicateRequestCreated = (sample: ICannabisSampleViewer, status: string) => {
        if (status.toLowerCase() === "requested") {
            setRowData((prev) =>
                prev.map(row => row.sampleId === sample.sampleId ? {...row, reanalysisStatus: status} : row));
        } else if (status.toLowerCase() === "nfa") {
            handleRowRemoveFromGrid(sample);
        }
    };

    const detailCellRendererParams = useCallback((params: ICellRendererParams<ICannabisSampleViewer>) => {
        return { sample: params.data };
    }, []);

    useEffect(() => {
        if (samples.length > 0) {
            setRowData(samples);
        }
    }, [samples, gridApi]);

    return (
        <div className="ag-theme-alpine" style={{ height: 800, width: "100%" }}>
            <AgGridReact rowData={rowData}
                         loading={isLoadingSamples}
                         rowBuffer={10}
                         columnDefs={columnDefs}
                         masterDetail={true}
                         detailCellRenderer={detailCellRenderer}
                         detailCellRendererParams={detailCellRendererParams}
                         pagination={true}
                         paginationPageSize={50}
                         detailRowHeight={666}
                         onGridReady={(params) => setGridApi(params.api)}
            />
        </div>
    );
}

export default MainSampleGrid;