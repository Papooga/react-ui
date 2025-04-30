import {useCallback, useMemo, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import {
    ColDef,
    GridReadyEvent,
    IServerSideDatasource,
    ModuleRegistry,
    PaginationModule,
} from "ag-grid-community";
import {
    CellValueChangedEvent,
    ColumnMenuModule,
    ColumnsToolPanelModule,
    ContextMenuModule, ICellRendererParams,
    ServerSideRowModelModule,
    ValidationModule,
} from "ag-grid-enterprise";
import agent from "../../../api/agent.ts";
import {IClient, IClientsApiResponse} from "../../../../types/clients.type.ts";
import {ICannabisSampleViewer} from "../../../../types/cannabis-sample.types.ts";
import ClientsActionCell from "./ClientsActionCell.tsx";
import {PhoneEditor} from "./PhoneEditor.tsx";
import {formatPhoneNumber} from "../Clients.util.ts";
import ClientsDetailComponent from "./ClientsDetailComponent.tsx";

ModuleRegistry.registerModules([
    PaginationModule,
    ColumnsToolPanelModule,
    ColumnMenuModule,
    ContextMenuModule,
    ServerSideRowModelModule,
    ValidationModule,
]);

const getServerSideDatasource = (): IServerSideDatasource => {
    return {
        getRows: (params) => {
            const requestParams = {
                startRow: params.request.startRow,
                endRow: params.request.endRow,
                sortModel: params.request.sortModel,
                filterModel: params.request.filterModel
            };
            agent.post<IClientsApiResponse>("/api/v1/clients", requestParams)
                .then(response => {
                    const data = response;
                    params.success({
                        rowData: data.clients,
                        rowCount: data.totalRecords,
                    });
                })
                .catch(error => {
                    console.error("Error fetching clients from API:", error);
                    params.fail();
                });
        },
    };
};

const ClientsGrid = () => {
    const containerStyle = useMemo(() => ({width: "100%", height: "100%"}), []);

    const [columnDefs] = useState<ColDef[]>([
        {
            field: "name",
            editable: true,
            headerName: "Name",
            minWidth: 200,
            cellRenderer: 'agGroupCellRenderer',
            filter: 'agTextColumnFilter'
        },
        {
            field: "dbaName",
            editable: true,
            headerName: "DBA Name",
            minWidth: 200,
            filter: 'agTextColumnFilter'
        },
        {
            field: "contactName",
            editable: true,
            headerName: "Contact Name",
            minWidth: 180,
            filter: 'agTextColumnFilter'
        },
        {
            field: "contactFirstName",
            editable: true,
            headerName: "First Name",
            minWidth: 180,
            filter: 'agTextColumnFilter'
        },
        {
            field: "contactLastName",
            editable: true,
            headerName: "Last Name",
            minWidth: 180,
            filter: 'agTextColumnFilter'
        },
        {
            field: 'phone',
            editable: true,
            headerName: 'Phone',
            cellEditor: PhoneEditor,
            minWidth: 180,
            filter: 'agTextColumnFilter',
            valueFormatter: (params) => formatPhoneNumber(params.value),
        },
        {
            field: "email",
            editable: true,
            headerName: "Email",
            minWidth: 180,
            filter: 'agTextColumnFilter'
        },
        {
            field: "address1",
            editable: true,
            headerName: "Address 1",
            minWidth: 180,
            filter: 'agTextColumnFilter'
        },
        {
            field: "address2",
            editable: true,
            headerName: "Address 2",
            minWidth: 180,
            filter: 'agTextColumnFilter'
        },
        {
            field: "city",
            editable: true,
            headerName: "City",
            minWidth: 180,
            filter: 'agTextColumnFilter'
        },
        {
            field: "state",
            editable: true,
            headerName: "State",
            minWidth: 180,
            filter: 'agTextColumnFilter'
        },
        {
            field: "postalCode",
            editable: true,
            headerName: "ZIP Code",
            minWidth: 180,
            filter: 'agTextColumnFilter'
        },
        {
            headerName: "Actions",
            pinned: "right",
            width: 110,
            cellRenderer: ClientsActionCell,
            cellRendererParams: (params: ICellRendererParams<ICannabisSampleViewer>) => ({
                client: params.data
            }),
        },
    ]);

    const detailCellRenderer = useCallback(ClientsDetailComponent, []);
    const detailCellRendererParams = useCallback((params: ICellRendererParams<IClient>) => {
        return { client: params.data };
    }, []);

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
            minWidth: 150,
            sortable: true,
            filter: true,
            resizable: true,
        };
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        const datasource = getServerSideDatasource();
        params.api!.setGridOption("serverSideDatasource", datasource);
    }, []);
    const onCellValueChanged = useCallback((event: CellValueChangedEvent) => {
        console.log("Data after change is", event.data);
    }, []);

    return (
        <div style={containerStyle}>
            <AgGridReact
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowModelType={"serverSide"}
                pagination={true}
                paginationPageSize={20}
                onCellValueChanged={onCellValueChanged}
                cacheBlockSize={20}
                masterDetail={true}
                detailCellRenderer={detailCellRenderer}
                detailCellRendererParams={detailCellRendererParams}
                detailRowHeight={400}
                onGridReady={onGridReady}
                enableCellTextSelection={true}
                domLayout={"autoHeight"}
                ensureDomOrder={true}
            />
        </div>
    );
};

export default ClientsGrid;