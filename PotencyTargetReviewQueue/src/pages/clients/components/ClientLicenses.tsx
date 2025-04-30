import React, {useEffect} from 'react';
import { Button, Input, Card } from "@heroui/react"; // Adjust based on your UI library
import {useFormContext, useFieldArray, Controller, get} from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa';
import {IClient} from "../../../../types/clients.type.ts";

interface IProps {
    client?: IClient;
}
const ClientLicenses: React.FC<IProps> = ({client}) => {
    const { control, formState: { errors } } = useFormContext();

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: "licenseVms"
    });

    useEffect(() => {
        if (client && client.licenseVms && client.licenseVms.length > 0) {
            replace([]);

            client.licenseVms.forEach(license => {
                append({
                    active: license.active,
                    clientId: license.clientId,
                    clientLicenseTypeId: license.clientLicenseTypeId,
                    clientLicenseType: license.clientLicenseType || '',
                    deleted: license.deleted,
                    id: license.id,
                    licenseNumber: license.licenseNumber || '',
                    numberOfManifests: license.numberOfManifests || 0,
                    name: license.name || '',
                    ccLicenseId: license.ccLicenseId || null
                });
            });
        }
    }, [client?.licenseVms.length]);

    const addNewLicense = () => {
        append({
            active: true,
            clientId: 0,
            clientLicenseTypeId: 0,
            clientLicenseType: '',
            deleted: false,
            id: 0,
            licenseNumber: '',
            numberOfManifests: 0,
            name: '',
            ccLicenseId: null
        });
    };

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Client Licenses</h3>
                <Button color="primary"
                        variant="ghost"
                        onPress={addNewLicense}
                        startContent={<FaPlus size={14} />}>
                    Add License
                </Button>
            </div>

            {fields.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No licenses added. Click "Add License" to add a new license.
                </div>
            ) : (
                <div className="space-y-4">
                    {fields.map((license, index) => (
                        <Card key={license.id} className="border lg p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">License #{index + 1}</h4>
                                <Button
                                    color="danger"
                                    variant="ghost"
                                    isIconOnly
                                    onPress={() => remove(index)}
                                >
                                    <FaTrash size={14} />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <Controller
                                        name={`licenseVms.${index}.clientLicenseType`}
                                        control={control}
                                        rules={{ required: "License type is required" }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="License Type"
                                                placeholder="Enter license type"
                                                isInvalid={!!get(errors, `licenseVms.${index}.clientLicenseType.message`)}
                                                errorMessage={get(errors, `licenseVms.${index}.clientLicenseType.message`)}
                                                fullWidth
                                            />
                                        )}
                                    />
                                </div>

                                <div>
                                    <Controller
                                        name={`licenseVms.${index}.licenseNumber`}
                                        control={control}
                                        rules={{ required: "License number is required" }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="License Number"
                                                placeholder="Enter license number"
                                                isInvalid={!!get(errors, `licenseVms.${index}.licenseNumber.message`)}
                                                errorMessage={get(errors, `licenseVms.${index}.licenseNumber.message`)}
                                                fullWidth
                                            />
                                        )}
                                    />
                                </div>

                                <div>
                                    <Controller
                                        name={`licenseVms.${index}.name`}
                                        control={control}
                                        rules={{ required: "Name is required" }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Name"
                                                placeholder="Enter name"
                                                isInvalid={!!get(errors, `licenseVms.${index}.name.message`)}
                                                errorMessage={get(errors, `licenseVms.${index}.name.message`)}
                                                fullWidth
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClientLicenses;