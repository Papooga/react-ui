import * as React from "react";
import {IReplicateRequest, IStatus} from "../../../../../types/repetition-request.types.ts";
import {
    Button,
    Card,
    Modal,
    ModalBody, ModalContent,
    ModalFooter,
    ModalHeader,
    Select, SelectItem,
    Tooltip,
    useDisclosure
} from "@heroui/react";
import {useEffect, useState} from "react";
import {IoSendOutline} from "react-icons/io5";
import StatusCell from "./StatusCell.tsx";
import {MdOutlineModeEdit} from "react-icons/md";
import {useFetchStatusesQuery} from "../../queries/useFetchStatusesQuery.ts";
import {useUpdateStatusMutation} from "../../mutations/useUpdateStatusMutation.ts";

interface IProps {
    replicateRequest: IReplicateRequest,
    onStatusUpdated: (replicateRequest: IReplicateRequest, updatedStatus: string) => void
}
const UpdateStatusCell: React.FC<IProps> = ({replicateRequest, onStatusUpdated}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [updatedStatus, setUpdatedStatus] = useState<IStatus | null>(null);
    const {mutate: updateStatus, isPending: isUpdatingStatus} = useUpdateStatusMutation()

    const { data: statuses, isPending: isFetchingStatuses } = useFetchStatusesQuery();

    useEffect(() => {
        if (statuses && statuses.length > 0) {
            const matchingStatus = statuses.find(x => x.text === replicateRequest.status);
            setUpdatedStatus(matchingStatus ? matchingStatus : null);
        }
    }, [statuses, replicateRequest.status]);

    const saveStatus = async () => {
        if (updatedStatus) {
            updateStatus(
                {
                    replicateRequest: replicateRequest,
                    updatedStatusValue: updatedStatus?.value,
                    onStatusUpdated: onStatusUpdated
                }
            );
        }
    }

    return (
        <>
            <div className={"flex flex-wrap gap-2 items-center h-full"}>
                <Tooltip content="Update status">
                    <Button color="primary" isIconOnly variant="ghost" size={"sm"} onPress={() => onOpen()}>
                        <MdOutlineModeEdit fill="currentColor" size={16} />
                    </Button>
                </Tooltip>
            </div>

            <Modal backdrop={"blur"} isOpen={isOpen} size={"xl"} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Update status</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-wrap gap-3 mb-2">
                                    <Card className="w-sm-[220px] bg-[#f4f4f5] p-[14px] shadow-none flex-1">
                                        <p className={"text-[12px]"}>Sample panel ID</p>
                                        <p className={"text-[15px] font-semibold"}>{replicateRequest.samplePanelId}</p>
                                    </Card>
                                    <Card className="w-sm-[220px] bg-[#f4f4f5] p-[14px] shadow-none flex-1">
                                        <p className={"text-[12px]"}>Requested by</p>
                                        <p className={"text-[15px] font-semibold"}>{replicateRequest.requestedBy}</p>
                                    </Card>
                                    <Card className="w-sm-[220px] bg-[#f4f4f5] p-[14px] shadow-none flex-1">
                                        <p className={"text-[12px] mb-1"}>Current status</p>
                                        <StatusCell status={replicateRequest.status} />
                                    </Card>
                                </div>
                                <Select className="mb-3 rounded-lg" label="Status"
                                        description={"Please select updated status"}
                                        placeholder={"Select"}
                                        isLoading={isFetchingStatuses}
                                        isDisabled={isFetchingStatuses}
                                        size={"sm"}
                                        variant={"faded"}
                                        selectedKeys={updatedStatus ? [String(updatedStatus.value)] : []}
                                        onSelectionChange={(keys) => {
                                            const selectedKey = Array.from(keys)[0] as number;
                                            const status = statuses?.find(a => a.value === +(selectedKey)) || null;
                                            setUpdatedStatus(status)
                                        }}>
                                    {(statuses ?? []).map((status) => (
                                        <SelectItem key={status.value}>{status.text}</SelectItem>
                                    ))}
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="ghost" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary"
                                        isLoading={isUpdatingStatus}
                                        startContent={<IoSendOutline />}
                                        onPress={saveStatus} >
                                    Save status
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default UpdateStatusCell;