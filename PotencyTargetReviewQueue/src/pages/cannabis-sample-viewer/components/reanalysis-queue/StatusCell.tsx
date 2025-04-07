import * as React from "react";
import {Chip} from "@heroui/react";

interface IProps {
    status: string
}
const StatusCell: React.FC<IProps> = ({status}) => {
    const statusColors: Record<typeof status, "default" | "primary" | "secondary" | "success" | "warning" | "danger"> = {
        Requested: "primary",
        InPrep: "secondary",
        OnInstrument: "warning",
        RFR: "danger",
        NFA: "default",
        Completed: "success",
    };

    return (
        <Chip color={statusColors[status]}>{status}</Chip>
    );
}

export default StatusCell;