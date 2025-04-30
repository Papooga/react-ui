import {Button, Tooltip} from "@heroui/react";
import {IClient} from "../../../../types/clients.type.ts";
import {FaTruckFast} from "react-icons/fa6";
import {GrTest} from "react-icons/gr";
import {Link} from "react-router-dom";
import * as React from "react";

interface IProps {
    client: IClient
}

const ClientsActionCell: React.FC<IProps> = () => {
    return (
        <>
            <div className={"flex flex-wrap gap-2 items-center h-full"}>
                <Tooltip content="Go to manifests">
                    <Link to={'/manifests'}>
                        <Button color="secondary" isIconOnly variant="ghost" size={"sm"}>
                            <FaTruckFast fill="currentColor" size={17} />
                        </Button>
                    </Link>
                </Tooltip>

                <Tooltip content="Go to samples">
                    <Link to={'/samples'}>
                        <Button color="success" isIconOnly variant="ghost" size={"sm"}>
                            <GrTest fill="currentColor" size={14} />
                        </Button>
                    </Link>
                </Tooltip>
            </div>
        </>
    )
}

export default ClientsActionCell;