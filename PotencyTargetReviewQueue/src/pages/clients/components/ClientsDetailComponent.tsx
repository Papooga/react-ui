import {IClient, IClientFormData} from "../../../../types/clients.type.ts";
import {Button, Card} from "@heroui/react";
import * as React from "react";
import ClientLicenses from "./ClientLicenses.tsx";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {useEffect} from "react";
import {IoSendOutline} from "react-icons/io5";
import ApiKeys from "./ApiKeys.tsx";

interface IProps {
    client: IClient;
}

const ClientsDetailComponent: React.FC<IProps> = ({client}) => {
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
        }
    }, [client, methods.reset]);

    const onSubmit: SubmitHandler<IClientFormData> = async (data) => {
        console.log(data);
    }
    const handleSubmitButtonPress = () => {
        methods.handleSubmit(onSubmit)();
    };
    return (
        <div className="flex flex-col h-full bg-[#e4e4e78c]">
            <div className="flex-1 overflow-auto">
                <FormProvider {...methods}>
                    <form id="clientFormDetail" className={"h-full"} onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className="flex h-full gap-3 p-3">
                            <Card className={"flex-1 bg-white h-100 shadow-none overflow-auto"} radius={"lg"}>
                                <ClientLicenses client={client}/>
                            </Card>
                            <Card className={"flex-1 bg-white h-100 shadow-none"} radius={"lg"}>
                                <ApiKeys client={client} />
                            </Card>
                            <Card className={"flex-1 bg-white shadow-none"} radius={"lg"}>

                            </Card>
                        </div>
                    </form>
                </FormProvider>
            </div>

            <div className="p-4 border-t bg-[#eff3ff]">
                <Button color="primary"
                        startContent={<IoSendOutline/>}
                        onPress={handleSubmitButtonPress}
                        type="submit"
                >
                    Update Client
                </Button>
            </div>
        </div>

    );
}
export default ClientsDetailComponent;