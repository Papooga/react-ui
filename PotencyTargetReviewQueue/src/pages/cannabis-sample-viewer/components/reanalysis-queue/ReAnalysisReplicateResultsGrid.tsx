import * as React from "react";
import {IReplicateRequestDetail} from "../../../../../types/repetition-request.types.ts";
import {Card} from "@heroui/react";
import {useEffect, useState} from "react";
import {ColDef} from "ag-grid-enterprise";
import {AgGridReact} from "ag-grid-react";

interface IProps {
    requestDetails: IReplicateRequestDetail[],
    loadingGrid: boolean
}
const ReAnalysisReplicateResultsGrid: React.FC<IProps> = ({requestDetails, loadingGrid}) => {
    const [rowData, setRowData] = useState<IReplicateRequestDetail[]>(requestDetails);
    const columnDefs: ColDef<IReplicateRequestDetail>[] = [
        { field: "analyteName", headerName: "Analyte", filter: "agTextColumnFilter"},
        { field: "analyteCas", headerName: "Analyte Cas", filter: "agTextColumnFilter"},
        { field: "uom", headerName: "Uom"},
        { field: "result", headerName: "Result"},
        { field: "measuredConcentration", headerName: "Measured concentration"},
        { field: "sampleWeight", headerName: "Sample weight"},
        { field: "dilutionFactor", headerName: "Dilution factor"},
        { field: "extractionVolume", headerName: "Extraction volume"},
    ]

    useEffect(() => {
        if (requestDetails.length > 0) {
            setRowData(requestDetails);
        }
    }, [requestDetails.length]);

    return (
        <>
            <Card className="h-full px-[14px] py-[18px] bg-[#f4f4f5] shadow-none">
                <div className="ag-theme-alpine" style={{ height: "100%", width: "100%" }}>
                    <AgGridReact rowData={rowData}
                                 loading={loadingGrid}
                                 columnDefs={columnDefs}
                                 pagination={true}
                                 domLayout={"autoHeight"}
                                 paginationPageSize={50} />
                </div>
            </Card>
        </>
    )
}
export default ReAnalysisReplicateResultsGrid;