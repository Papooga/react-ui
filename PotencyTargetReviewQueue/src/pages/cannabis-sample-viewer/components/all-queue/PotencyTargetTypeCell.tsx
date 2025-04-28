import React from "react";
import {Chip} from "@heroui/react";
import {getPotencyTargetTypeChipColor, getPotencyTargetTypeStr} from "../../PotencyTargetReviewQueue.util.ts";

interface IProps {
    potencyTargetType: string;
}
const PotencyTargetTypeCell: React.FC<IProps> = ({potencyTargetType}) => {
    return (
        <>
            {potencyTargetType && (
                <Chip color={getPotencyTargetTypeChipColor(potencyTargetType)}>{getPotencyTargetTypeStr(potencyTargetType)}</Chip>
            )}
        </>
    );
}
export default PotencyTargetTypeCell;