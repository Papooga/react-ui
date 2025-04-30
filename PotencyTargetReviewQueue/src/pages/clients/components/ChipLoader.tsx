import {ChipLoaderProps} from "../../../../types/clients.type.ts";
import {Spinner} from "@heroui/react";

const ChipLoader = ({ type, isPending }: ChipLoaderProps) => {
    const dotClass = `bg-${type}`;

    return (
        <>
            {isPending ? (
                <Spinner color={type} className={"ml-1"} size={"sm"} />
            ) : (
                <span className={`${dotClass} h-2 w-2 rounded-full ml-2 mr-2`}></span>
            )}
        </>
    );
}
export default ChipLoader;