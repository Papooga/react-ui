import * as React from "react";
import {IReplicateRequest} from "../../../../../types/repetition-request.types.ts";
import {useCallback, useEffect, useState} from "react";
import ReAnalysisDetailComponent from "./ReAnalysisDetailComponent.tsx";
import {
    ClientSideRowModelModule,
    ColDef, DateFilterModule,
    ICellRendererParams,
    ModuleRegistry,
    NumberFilterModule, PaginationModule, TextFilterModule
} from "ag-grid-enterprise";
import StatusCell from "./StatusCell.tsx";
import {AgGridReact} from "ag-grid-react";
import UpdateStatusCell from "./UpdateStatusCell.tsx";

ModuleRegistry.registerModules([
    ClientSideRowModelModule, NumberFilterModule, TextFilterModule,
    DateFilterModule, PaginationModule
]);

interface IProps {
    replicateRequests: IReplicateRequest[];
    loading: boolean;
}

const ReAnalysisSampleGrid: React.FC<IProps> = ({replicateRequests, loading}) => {
    const [rowData, setRowData] = useState<IReplicateRequest[]>(replicateRequests);
    const detailCellRenderer = useCallback(ReAnalysisDetailComponent, []);
    const columnDefs: ColDef<IReplicateRequest>[] = [
        { field: "samplePanelId", headerName: "Sample panel ID", filter: "agNumberColumnFilter", cellRenderer: 'agGroupCellRenderer' },
        { field: "clientName", headerName: "Client name", filter: "agTextColumnFilter"},
        { field: "confidentCannabisId", headerName: "CC ID", filter: "agNumberColumnFilter"},
        { field: "metrcPackageNr", headerName: "Metrc Package #", filter: "agNumberColumnFilter"},
        { field: "itemBrand", headerName: "Item brand", filter: "agTextColumnFilter"},
        { field: "requestedBy", headerName: "Requested by", filter: "agTextColumnFilter"},
        {
            field: "requestedDateTime",
            headerName: "Requested date",
            valueGetter: p => p.data?.requestedDateTime ? new Date(p?.data.requestedDateTime) : null,
            valueFormatter: p => p.value ? new Intl.DateTimeFormat('en-US').format(p.value) : "",
            filter: "agDateColumnFilter"
        },
        {
            headerName: "Requested Time",
            valueGetter: p => p.data?.requestedDateTime ? new Date(p.data.requestedDateTime) : null,
            valueFormatter: p => p.value
                ? new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).format(p.value)
                : "",
            filter: "agDateColumnFilter"
        },
        { field: "reanalysisReps", headerName: "Reanalysis Reps Req'd", width: 150},
        {
            headerName: "Notes",
            field: "notes",
            valueFormatter: p => p.value?.length > 50 ? `${p.value.substring(0, 50)}...` : p.value
        },
        {
            headerName: 'Status',
            cellRenderer: StatusCell,
            cellRendererParams: (params: ICellRendererParams<IReplicateRequest>) => ({
                status: params.data?.status
            })
        },
        {
            headerName: 'Action',
            width: 100,
            pinned: 'right',
            cellRenderer: UpdateStatusCell,
            cellRendererParams: (params: ICellRendererParams<IReplicateRequest>) => ({
                replicateRequest: params.data,
                onStatusUpdated: handleOnStatusUpdated
            })
        }
    ]

    const handleOnStatusUpdated = (replicateRequest: IReplicateRequest, updatedStatus: string) => {
        setRowData((prev) => {
            return prev.map(repReq =>
                repReq.replicateRequestId === replicateRequest.replicateRequestId ? {...repReq, status: updatedStatus } : repReq)
        })
    }

    const detailCellRendererParams = useCallback((params: ICellRendererParams<IReplicateRequest>) => {
        return { replicateRequest: params.data };
    }, []);

    useEffect(() => {
        if (replicateRequests.length > 0) {
            setRowData(replicateRequests);
        }
    }, [replicateRequests.length]);

    return (
        <>
            <div className="ag-theme-alpine" style={{ height: "100%", width: "100%" }}>
                <AgGridReact rowData={rowData}
                             loading={loading}
                             rowBuffer={10}
                             columnDefs={columnDefs}
                             masterDetail={true}
                             detailCellRenderer={detailCellRenderer}
                             detailCellRendererParams={detailCellRendererParams}
                             pagination={true}
                             domLayout={"autoHeight"}
                             paginationPageSize={50}
                             detailRowHeight={333} />
            </div>
        </>
    )
}

export default ReAnalysisSampleGrid;