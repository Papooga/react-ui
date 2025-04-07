import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/react";
import {IoSendOutline} from "react-icons/io5";
import * as React from "react";
import {ReactNode} from "react";

interface IProps {
    onConfirm?: () => void;
    isOpen: boolean;
    onClose: () => void;
    isSubmitting: boolean;
    confirmButtonText: string;
    children?: React.ReactNode;
}
const ConfirmActionModal: React.FC<IProps> & {
    Body: React.FC<{children: ReactNode}>;
} = ({onConfirm, isOpen, onClose, isSubmitting, children, confirmButtonText}) => {

    const body = React.Children.toArray(children).find(child =>
        React.isValidElement(child) && child.type === ConfirmActionModal.Body);

    return (
        <Modal backdrop={"blur"} isOpen={isOpen} size={"xl"} onClose={onClose}>
            <ModalContent>
                {(onCloseNoAction) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Confirm action</ModalHeader>
                        <ModalBody>
                            {body}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="ghost" onPress={onCloseNoAction}>
                                Close
                            </Button>
                            <Button color="primary"
                                    isLoading={isSubmitting}
                                    startContent={<IoSendOutline />}
                                    onPress={onConfirm} >
                                {confirmButtonText}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

ConfirmActionModal.Body = ({children}: {children: React.ReactNode}) => <>{children}</>

export default ConfirmActionModal;