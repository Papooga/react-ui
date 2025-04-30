import {Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, Tab, Tabs} from "@heroui/react";
import {IoSendOutline} from "react-icons/io5";
import * as React from "react";
import {AiOutlineCloseCircle} from "react-icons/ai";
import ClientBasicInfo from "./ClientBasicInfo.tsx";
import ClientLicenses from "./ClientLicenses.tsx";
import {FormProvider, useForm, SubmitHandler} from "react-hook-form";
import {useEffect, useState} from "react";
import axios from "axios";
import {IClient, IClientFormData} from "../../../../types/clients.type.ts";

interface IProps {
    client?: IClient;
    onSuccess: (clientData: IClient) => void;
    isOpen: boolean;
    onClose: () => void;
    mode: "edit" | "create";
}

const AddClientsDrawer: React.FC<IProps> = ({ isOpen, onClose, onSuccess, mode, client }) => {
    const isEditMode = !!client;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const methods = useForm<IClientFormData>({
        defaultValues: {
            active: true,
            name: '',
            dbaName: '',
            contactFirstName: '',
            contactLastName: '',
            phone: '',
            email: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            postalCode: '',
            logo: null,
            licenseVms: []
        }
    });

    useEffect(() => {
        if (client) {
            const formData: IClientFormData = {
                active: client.active,
                name: client.name || '',
                dbaName: client.dbaName || '',
                contactFirstName: client.contactFirstName || '',
                contactLastName: client.contactLastName || '',
                phone: client.phone || '',
                email: client.email || '',
                address1: client.address1 || '',
                address2: client.address2 || '',
                city: client.city || '',
                state: client.state || '',
                postalCode: client.postalCode || '',
                logo: null, // Can't populate File object from server data
                licenseVms: client.licenseVms || []
            };

            methods.reset(formData);
        } else {
            methods.reset({
                active: true,
                name: '',
                dbaName: '',
                contactFirstName: '',
                contactLastName: '',
                phone: '',
                email: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                postalCode: '',
                logo: null,
                licenseVms: []
            });
        }
    }, [client, methods.reset]);

    const onSubmit: SubmitHandler<IClientFormData> = async (data) => {
        setIsSubmitting(true);

        console.log(data);

        try {
            // Create FormData for file upload
            const formData = new FormData();

            // Add all text fields
            for (const key in data) {
                if (key !== 'logo' && key !== 'licenseVms') {
                    formData.append(key, String(data[key as keyof IClientFormData] || ''));
                }
            }

            // Add logo if selected
            if (data.logo) {
                formData.append('logo', data.logo);
            }

            // Add licenses as JSON string
            formData.append('licenseVms', JSON.stringify(data.licenseVms));

            let response;

            if (isEditMode && client) {
                // Update existing client
                formData.append('id', client.id.toString());
                response = await axios.put<IClient>(`/api/v1/clients/${client.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                // Create new client
                response = await axios.post<IClient>('/api/v1/clients', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            onSuccess(response.data);
        } catch (error) {
            console.error('Error saving client:', error);
            // Handle API errors
            alert(`Failed to ${isEditMode ? 'update' : 'create'} client. Please try again.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitButtonPress = () => {
        methods.handleSubmit(onSubmit)();
    };

    return (
        <Drawer backdrop={"blur"} isOpen={isOpen} size={"4xl"} onClose={onClose}>
            <DrawerContent>
                {(onCloseRepReq) => (
                    <>
                        <DrawerHeader className="flex flex-col gap-1">{mode === "edit" ? "Edit client" : "Add new Client"}</DrawerHeader>
                        <DrawerBody>
                            <FormProvider {...methods}>
                                <form id="clientForm" onSubmit={methods.handleSubmit(onSubmit)}>
                                    <Tabs variant={"underlined"}>
                                        <Tab key="client" title="Client Information">
                                            <ClientBasicInfo />
                                        </Tab>

                                        <Tab key="licenses" title="Licenses">
                                            <ClientLicenses client={client} />
                                        </Tab>

                                        <Tab key="api" title="API Keys">
                                            <div className="p-4">
                                                <div className="text-center py-8 text-gray-500">
                                                    API keys configuration will be implemented in the next phase.
                                                </div>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </form>
                            </FormProvider>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button color="danger" variant="ghost" onPress={onCloseRepReq} startContent={<AiOutlineCloseCircle />}>
                                Close
                            </Button>
                            <Button color="primary"
                                    isLoading={isSubmitting}
                                    startContent={<IoSendOutline />}
                                    onPress={handleSubmitButtonPress}
                                    type="submit"
                                    form="clientForm">
                                {mode === "edit" ? "Update client" : "Create client"}
                            </Button>
                        </DrawerFooter>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    );
};

export default AddClientsDrawer;