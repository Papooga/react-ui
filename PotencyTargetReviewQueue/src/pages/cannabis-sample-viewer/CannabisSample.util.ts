import {IPotencyReplicateAnalyte, } from "../../../types/cannabis-sample.types.ts";
import {ColDef} from "ag-grid-community";
import {DateValue} from "@heroui/react";
import {format} from "date-fns";

export interface HistoricalSelectDataType {
    key: string;
    label: string;
}

export const defaultHistoricalSelectedValue: HistoricalSelectDataType = { key: "548", label: "18 months"}

export const defaultHistoricalSelectValues: HistoricalSelectDataType[] = [
    {key: "30", label: "30 days"},
    {key: "60", label: "60 days"},
    {key: "90", label: "90 days"},
    {key: "183", label: "6 months"},
    {key: "365", label: "12 months"},
    {key: "548", label: "18 months"},
    {key: "0", label: "All data"},
]

export const flattenAnalytes = (analytes: IPotencyReplicateAnalyte[], maxReplicates: number) => {
    // Transform each analyte
    return analytes.map(analyte => {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const flattened: any = { ...analyte };
        /* eslint-enable @typescript-eslint/no-explicit-any */

        // Add Rep1, Rep2, etc., based on the replicates array
        analyte.replicates.forEach((rep, index) => {
            flattened[`Rep${index + 1}`] = rep.replicateNumber;
        });

        // Fill missing replicate properties with "-"
        for (let i = analyte.replicates.length; i < maxReplicates; i++) {
            flattened[`Rep${i + 1}`] = "-";
        }

        return flattened;
    });
};

export const defColDefs: ColDef[] = [
    { headerName: "Analyte" },
    { headerName: "Target/Range" },
    { headerName: "Status" },
    { headerName: "Result (%)" },
    { headerName: "Rep 1" },
    { headerName: "Rep 2" },
];

export const getValueOrDash = <T>(value: T): T | string => {
    if (value === null || value === undefined) {
        return "-";
    } else {
        return value;
    }
}

export const formatDate = (date: DateValue | null): string => {
    if (!date) return ""; // Handle null case

    // Convert DateValue to JavaScript Date (if necessary)
    const jsDate = date instanceof Date ? date : new Date(date.toString());

    return format(jsDate, "MM-dd-yyyy"); // Format to MM-dd-yyyy
};

export const getPotencyTargetTypeStr = (potencyTargetType: string): string => {
    const potencyTargetTypeRecord: Record<typeof potencyTargetType, string> = {
        UserSupplied: "User",
        HistoricalAverage: "Historical Range",
        ManifestAverage: "Manifest",
        ManifestPair: "Manifest (Pair)",
    };
    return potencyTargetTypeRecord[potencyTargetType];
}
export const getPotencyTargetTypeChipColor = (potencyTargetType: string): "primary" | "secondary" | "default" | "warning" => {
    const potencyTargetTypeRecord: Record<typeof potencyTargetType, "primary" | "secondary" | "default" | "warning"> = {
        UserSupplied: "primary",
        HistoricalAverage: "secondary",
        ManifestAverage: "default",
        ManifestPair: "warning",
    };
    return potencyTargetTypeRecord[potencyTargetType];
}