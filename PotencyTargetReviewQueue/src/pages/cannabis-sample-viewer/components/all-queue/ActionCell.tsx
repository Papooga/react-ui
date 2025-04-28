import * as React from "react";
import {ICannabisSampleViewer} from "../../../../../types/cannabis-sample.types.ts";
import {
    Button,
    Card, Form,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader, NumberInput, Textarea,
    Tooltip,
    useDisclosure
} from "@heroui/react";
import { IoIosGitPullRequest } from "react-icons/io";
import {FaCheck} from "react-icons/fa";
import {useRef, useState} from "react";
import {IoSendOutline} from "react-icons/io5";
import ConfirmActionModal from "../../../../modals/ConfirmActionModal.tsx";
import {IReplicateRequestForm} from "../../../../../types/repetition-request.types.ts";
import {useNoActionNeededMutation} from "../../mutations/useNoActionNeededMutation.ts";
import {useSubmitRequestReplicateMutation} from "../../mutations/useSubmitRequestReplicateMutation.ts";
import {AiOutlineCloseCircle} from "react-icons/ai";

interface IProps {
    sample: ICannabisSampleViewer;
    handleRowRemoveFromSampleGrid: (sample: ICannabisSampleViewer) => void;
    onReplicateRequestCreated: (sample: ICannabisSampleViewer, status: string) => void;
}

const ActionCell: React.FC<IProps> = ({sample, handleRowRemoveFromSampleGrid, onReplicateRequestCreated}) => {
    const {isOpen: isOpenRepReq, onOpen: onOpenRepReq, onClose: onCloseRepReq} = useDisclosure();
    const {isOpen: isOpenNoAction, onOpen: onOpenConfirmModal, onClose: onCloseNoAction} = useDisclosure();

    const formRef = useRef<HTMLFormElement | null>(null);
    const [notes, setNotes] = useState('');
    const [numOfReplicates, setNumOfReplicates] = useState<number | undefined>(undefined);

    const { mutate: handleNoActionNeeded, isPending: isProcessingNoActionNeeded } = useNoActionNeededMutation();
    const { mutate: handleSubmitReplicateRequest, isPending: isSubmittingReplicateRequest } = useSubmitRequestReplicateMutation();

    const initiateNoActionNeeded = () => {
        handleNoActionNeeded({sample: sample, removeRowFromSampleGrid: handleRowRemoveFromSampleGrid, closeModal: onCloseNoAction});
    }
    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const replicateReqForm: IReplicateRequestForm = {
            notes: notes,
            numOfReplicates: numOfReplicates,
        }
        handleSubmitReplicateRequest(
            {
                sample: sample,
                replicateRequestForm: replicateReqForm,
                onReplicateRequestCreated: onReplicateRequestCreated,
                closeModal: onCloseRepReq
            });
    }
    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    }

    return (
        <>
            <div className={"flex flex-wrap gap-2 items-center h-full"}>
                <Tooltip content="Request Re-analysis">
                    <Button color="primary" isIconOnly variant="solid" size={"sm"} onPress={onOpenRepReq}>
                        <IoIosGitPullRequest fill="currentColor" size={17} />
                    </Button>
                </Tooltip>

                <Tooltip content="No action needed">
                    <Button color="success" isIconOnly variant="ghost" size={"sm"} onPress={onOpenConfirmModal}>
                        <FaCheck fill="currentColor" size={14} />
                    </Button>
                </Tooltip>
            </div>

            <Modal backdrop={"blur"} isOpen={isOpenRepReq} size={"xl"} onClose={onCloseRepReq}>
                <ModalContent>
                    {(onCloseRepReq) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Request analysis</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-wrap gap-3">
                                    <Card className="w-sm-[220px] bg-[#f4f4f5] p-[14px] shadow-none flex-1">
                                        <p className={"text-[12px]"}>Sample id</p>
                                        <p className={"text-[15px] font-semibold"}>{sample.sampleId}</p>
                                    </Card>
                                    <Card className="w-sm-[220px] bg-[#f4f4f5] p-[14px] shadow-none flex-1">
                                        <p className={"text-[12px]"}>Item</p>
                                        <p className={"text-[15px] font-semibold"}>{sample.itemBrand}</p>
                                    </Card>
                                </div>

                                <div>
                                    <Form ref={formRef} className="w-full" id="request-analysis-form" onSubmit={onSubmit}>
                                        <NumberInput isRequired className={"mb-1"}
                                                     errorMessage="Please enter a valid username"
                                                     label="Number of replicates"
                                                     labelPlacement="inside"
                                                     placeholder="Enter number of replicates"
                                                     value={numOfReplicates}
                                                     onValueChange={setNumOfReplicates} />

                                        <Textarea label="Notes"
                                                  placeholder="Enter notes (optional)"
                                                  value={notes}
                                                  onValueChange={setNotes} />
                                    </Form>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="ghost" onPress={onCloseRepReq} startContent={<AiOutlineCloseCircle />}>
                                    Close
                                </Button>
                                <Button color="primary" isLoading={isSubmittingReplicateRequest}
                                        startContent={<IoSendOutline />}
                                        onPress={handleSubmit} >
                                    Submit request
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <ConfirmActionModal isOpen={isOpenNoAction} onClose={onCloseNoAction}
                                onConfirm={initiateNoActionNeeded}
                                isSubmitting={isProcessingNoActionNeeded}
                                confirmButtonText={"Yes, process"}>
                <ConfirmActionModal.Body>
                    <p>Are you sure you want to proceed?</p>
                </ConfirmActionModal.Body>
            </ConfirmActionModal>
        </>
    )
}

export default ActionCell;