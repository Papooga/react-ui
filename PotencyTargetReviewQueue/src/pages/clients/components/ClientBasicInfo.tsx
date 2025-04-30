import React, { useState, useEffect } from 'react';
import { Input, Divider } from "@heroui/react";
import { useFormContext, Controller } from 'react-hook-form';

const ClientBasicInfo: React.FC = () => {
    const { control, formState: { errors }, watch, setValue } = useFormContext();
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const currentLogo = watch('logo');

    useEffect(() => {
        if (currentLogo instanceof File) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(currentLogo);
        }
    }, [currentLogo]);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (file) {
            setValue('logo', file);
        } else {
            setValue('logo', null);
            setLogoPreview(null);
        }
    };

    return (
        <div className="py-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "name is required" }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Name"
                                isInvalid={!!errors.name}
                                placeholder="Enter name"
                                errorMessage={errors.name?.message as string}
                                fullWidth
                            />
                        )}
                    />
                </div>

                <div>
                    <Controller
                        name="dbaName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="DBA Name"
                                placeholder="Enter DBA name"
                                fullWidth
                            />
                        )}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Controller
                        name="contactFirstName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="First Name"
                                placeholder="Enter contact first name"
                                fullWidth
                            />
                        )}
                    />
                </div>

                <div>
                    <Controller
                        name="contactLastName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Last Name"
                                placeholder="Enter contact last name"
                                fullWidth
                            />
                        )}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Phone"
                                placeholder="Enter phone number"
                                fullWidth
                            />
                        )}
                    />
                </div>

                <div>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Please enter a valid email"
                            }
                        }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Email"
                                placeholder="Enter email address"
                                errorMessage={errors.email?.message as string}
                                fullWidth
                            />
                        )}
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start">
                <div>
                    <div className="text-sm font-medium mb-3">Logo</div>
                    <input
                        type="file"
                        accept="image/*"
                        id="logo-upload"
                        onChange={handleLogoChange}
                        className="hidden"
                    />
                    <label
                        htmlFor="logo-upload"
                        className="cursor-pointer bg-blue-50 border border-blue-300 rounded-md py-2 px-4 mt-2 text-blue-600 hover:bg-blue-100 transition"
                    >
                        Choose File
                    </label>
                </div>

                {logoPreview && (
                    <div className="mt-2">
                        <img
                            src={logoPreview}
                            alt="Logo preview"
                            className="h-20 w-auto object-contain border rounded"
                        />
                    </div>
                )}
            </div>

            <Divider />

            {/* Address Section */}
            <div className="space-y-4">
                <div>
                    <Controller
                        name="address1"
                        control={control}
                        rules={{ required: "Address is required" }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Address"
                                placeholder="Enter street address"
                                errorMessage={errors.address1?.message as string}
                                fullWidth
                            />
                        )}
                    />
                </div>

                <div>
                    <Controller
                        name="address2"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Address 2"
                                placeholder="Apartment, suite, unit, etc."
                                fullWidth
                            />
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Controller
                            name="city"
                            control={control}
                            rules={{ required: "City is required" }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="City"
                                    placeholder="Enter city"
                                    errorMessage={errors.city?.message as string}
                                    fullWidth
                                />
                            )}
                        />
                    </div>

                    <div>
                        <Controller
                            name="state"
                            control={control}
                            rules={{
                                required: "State is required",
                                maxLength: {
                                    value: 2,
                                    message: "Use 2-letter state code"
                                }
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="State"
                                    placeholder="2-letter code (e.g. OH)"
                                    errorMessage={errors.state?.message as string}
                                    fullWidth
                                />
                            )}
                        />
                    </div>

                    <div>
                        <Controller
                            name="postalCode"
                            control={control}
                            rules={{ required: "Zip code is required" }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label="Zip Code"
                                    placeholder="Enter zip code"
                                    errorMessage={errors.postalCode?.message as string}
                                    fullWidth
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientBasicInfo;