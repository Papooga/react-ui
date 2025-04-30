export interface IClientStateLicense {
    active: boolean;
    clientId: number;
    clientLicenseTypeId: number;
    clientLicenseType: string;
    deleted: boolean;
    id: number;
    licenseNumber: string;
    numberOfManifests: number;
    name: string;
    ccLicenseId?: number;
}

export interface IClient {
    active: boolean;
    address1: string;
    address2: string | null;
    ccClientId: number | null;
    ccPrimaryAddressId: number | null;
    city: string;
    clientType: string | null;
    contactFirstName: string;
    contactLastName: string;
    contactName: string;
    dbaName: string;
    deleted: boolean;
    email: string | null;
    id: number;
    labId: number;
    logo: string | null;
    folderPath: string | null;
    fileName: string | null;
    name: string;
    phone: string | null;
    postalCode: string;
    state: string;
    stateId: number;
    limsClientApiID: string | null;
    limsClientApiKey: string | null;
    licenseVms: IClientStateLicense[];
}

export interface IClientsApiResponse {
    clients: IClient[];
    totalRecords: number;
}

export interface IClientStats {
    totalRecords: number;
    activeRecords: number;
    inactiveRecords: number;
}

export interface ChipLoaderProps {
    type: "success" | "danger" | "primary";
    isPending: boolean;
}

export interface IClientFormData {
    active: boolean;
    name: string;
    dbaName: string;
    contactFirstName: string;
    contactLastName: string;
    phone: string;
    email: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalCode: string;
    logo: File | null;
    licenseVms: IClientStateLicense[];
}

export interface IApiKeyResponse {
    apiId: string;
    apiKey: string;
}