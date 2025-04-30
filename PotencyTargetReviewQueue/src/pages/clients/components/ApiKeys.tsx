import {IApiKeyResponse, IClient} from "../../../../types/clients.type.ts";
import {addToast, Button} from "@heroui/react";
import {FaPlus} from "react-icons/fa";
import React, {useState} from "react";
import CopyableInput from "../../../components/CopyableInput.tsx";
import agent from "../../../api/agent.ts";
import {BiErrorAlt} from "react-icons/bi";
import {useFormContext} from "react-hook-form";

interface IProps {
    client: IClient;
}

const ApiKeys:React.FC<IProps> = ({client}) => {
    const [apiKeyResponse, setApiKeyResponse] = useState<IApiKeyResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const {setValue} = useFormContext();

    const fetchApiKey = async () => {
        try {
            setLoading(true);
            const response = await agent.get<IApiKeyResponse>("/api/v1/get-api-key");
            setValue("limsClientApiID", response.apiId);
            setValue("limsClientApiKey", response.apiKey);

            setApiKeyResponse(response);
        } catch {
            addToast({
                title: "Error",
                description: "Something went wrong generating Api Key",
                color: "danger",
                icon: React.createElement(BiErrorAlt)
            })
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">API Key</h3>
                {(!client.limsClientApiID || !client.limsClientApiKey) && (
                    <Button color="primary"
                            isLoading={loading}
                            isDisabled={loading}
                            variant="ghost"
                            onPress={fetchApiKey}
                            startContent={<FaPlus size={14} />}>
                        Generate API Key
                    </Button>
                )}
            </div>


            {apiKeyResponse ? (
                <div className="space-y-4">
                    <CopyableInput label="API ID"
                                   value={apiKeyResponse.apiId}
                                   readOnly={true}
                                   className="mb-4" />

                    <CopyableInput label="API Key"
                                   readOnly={true}
                                   value={apiKeyResponse.apiKey}
                                   className="mb-4" />
                </div>
            ) : (
                <div className="space-y-4">
                    <div className={"text-center py-8 text-gray-500"}>
                        No Api key generated. Please click on the button to generate.</div>
                </div>
            )}

        </div>
    );
}

export default ApiKeys;