export interface IReplicateRequest {
    replicateRequestId: number,
    samplePanelId: number,
    status: string,
    confidentCannabisId: string,
    clientName: string,
    labSampleNr: number,
    metrcPackageNr: string,
    itemBrand: string,
    sourcePackageNr: string,
    requestedBy: string,
    requestedDateTime: string,
    reanalysisReps: number,
    notes: string
}
export interface IReplicateRequestDetail {
    replicateResultId: number,
    analyteName: string,
    analyteCas: string,
    uom: number,
    result: number,
    measuredConcentration: number,
    sampleWeight: number,
    dilutionFactor: number,
    extractionVolume: number
}
export interface IStatus {
    text: string,
    value: number,
}

export interface IUpdateStatusResponse {
    replicateRequestId: number,
    status: string
}

export interface IReplicateRequestForm {
    numOfReplicates: number | undefined,
    notes: string
}