export interface IPaginatedResponseICannabisSampleViewer<T> {
    samples: T[];
    totalRecords: number;
}

export interface ICannabisSampleViewer {
    sampleId: 146874,
    labSampleNr: number,
    clientName: string,
    confidentCannabisId: string | null,
    licenseNumber: string,
    labId: number,
    metrcPackageNr: string,
    receivedOn: string,
    neededBy: string,
    itemBrand: string,
    sourcePackageNr: string,
    potencyTargetUnit: string,
    potencyTargetType: string,
    samplePanelId: number,
    reanalysisStatus: string,
    analytes: IAnalyte[],
}
export interface IAnalyte {
    analyteName: string,
    cas: string,
    average: number,
    lowestValue: number,
    highestValue: number,
    stdDev: number,
    historicalCount: number,
    analyteId: number,
    target: number | null,
    measuredResult: number,
    offTarget: boolean,
    historicalData: IHistoricalData[]
}
export interface IHistoricalData {
    analysisResult: number,
    createdOn: string,
}

export interface IPotencyReplicateResponse {
    clientName: string,
    confidentCannabisId: string,
    labId: number,
    labSampleNr: number,
    licenseNumber: string,
    metrcPackageNr: string,
    analytes: IPotencyReplicateAnalyte[]
}

export interface IPotencyReplicateAnalyte {
    analyteName: string,
    cas: string,
    averageResult: number,
    averageResultFmt: string,
    averagePc: number,
    averagePcFmt: string,
    potencyOffTarget: boolean,
    potencyTargetLow: string | null,
    potencyTargetHigh: string | null,
    "replicates": IReplicate[]
}
export interface IReplicate {
    replicateNumber: number,
    measuredConcentration: number,
    sampleWeight: number,
    dilutionFactor: number,
    extractionVolume: number
}

export interface ICreateReplicateResponse {
    id: number,
    samplePanelId: number,
    userId: number,
    replicates: number,
    requestDateTime: string,
    status: string,
    reanalysisRushRequestFlag: boolean,
    fromManifest: boolean,
    goalTime: string | null,
    eta: string | null,
    notes: string
}

export interface INoActionNeededResponse {
    success: boolean,
    message: string
}