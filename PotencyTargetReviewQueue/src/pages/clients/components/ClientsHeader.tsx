import {FaHospitalUser} from "react-icons/fa";
import {Button, Chip, useDisclosure} from "@heroui/react";
import {TiUserAdd} from "react-icons/ti";
import AddClientsDrawer from "./AddClientsDrawer.tsx";
import {IClient} from "../../../../types/clients.type.ts";
import {useFetchClientsStats} from "../queries/useFetchClientsStats.ts";
import ChipLoader from "./ChipLoader.tsx";

const ClientsHeader = () => {
    const {isOpen, onOpen: onOpenEditClientModal, onClose} = useDisclosure();

    const { data: clientStats, isPending } = useFetchClientsStats();
    const handleSuccessfulOperation = (client: IClient) => {
        console.log(client);
    }

    return (
        <>
            <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50  rounded-xl overflow-hidden border border-blue-100 mb-4">
                <div className="relative px-6 py-8">
                    <div className="flex justify-between items-center relative z-10">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-600 rounded-lg shadow-md mr-4">
                                <FaHospitalUser color={"white"} size={25} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Clients</h1>
                                <p className="text-sm text-gray-500 mt-1">Manage your client relationships</p>
                            </div>
                        </div>

                        <Button color="primary" variant="ghost" onPress={onOpenEditClientModal} startContent={<TiUserAdd fontSize={20} />}>
                            <span className="font-bold text-lg">Add</span>
                        </Button>
                    </div>
                </div>

                <div className="px-6 py-4 bg-white border-t border-blue-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm">
                            <Chip color="primary"
                                  startContent={<ChipLoader type={"primary"} isPending={isPending} />}
                                  variant="flat">
                                <div className={"flex align-center justify-center gap-1"}>
                                    <span className="font-bold">{clientStats?.totalRecords}</span>
                                    <span className="font-bold">Active</span>
                                </div>
                            </Chip>
                            <Chip color="success"
                                  startContent={<ChipLoader type={"success"} isPending={isPending} />}
                                  variant="flat">
                                <div className={"flex align-center justify-center gap-1"}>
                                    <span className="font-bold">{clientStats?.activeRecords}</span>
                                    <span className="font-bold">Active</span>
                                </div>
                            </Chip>
                            <Chip color="danger" variant="flat"
                                  startContent={<ChipLoader type={"danger"} isPending={isPending} />}>
                                <div className={"flex align-center justify-center gap-1"}>
                                    <span className="font-bold">{clientStats?.inactiveRecords}</span>
                                    <span className="font-bold">Inactive</span>
                                </div>
                            </Chip>
                        </div>
                    </div>
                </div>
            </div>

            <AddClientsDrawer mode={"create"} isOpen={isOpen} onClose={onClose} onSuccess={handleSuccessfulOperation} />
        </>
    );
};

export default ClientsHeader;