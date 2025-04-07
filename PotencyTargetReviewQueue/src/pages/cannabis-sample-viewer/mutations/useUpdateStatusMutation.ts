import {useMutation, useQueryClient} from "@tanstack/react-query";
import {
    IReplicateRequest,
    IStatus,
    IUpdateStatusResponse
} from "../../../../types/repetition-request.types.ts";
import agent from "../../../api/agent.ts";
import {addToast} from "@heroui/react";
import React from "react";
import {FaRegCircleCheck} from "react-icons/fa6";
import {BiErrorAlt} from "react-icons/bi";

export const useUpdateStatusMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({replicateRequest, updatedStatusValue, onStatusUpdated}:
                           {replicateRequest: IReplicateRequest,
                               updatedStatusValue: number,
                               onStatusUpdated: (replicateRequest: IReplicateRequest, statusReturned: string) => void}) => {
            const payload = {
                "replicateRequestId": replicateRequest.replicateRequestId,
                "status": updatedStatusValue
            };

            const response = await agent.post<IUpdateStatusResponse>('api/v1/update-replicate-request-status', payload);

            return {response, replicateRequest, onStatusUpdated};
        },
        onSuccess: ({response, replicateRequest, onStatusUpdated}) => {
            const statuses = queryClient.getQueryData<IStatus[]>(["statuses"]) || [];
            const statusReturned = statuses.find(x => x.text === response.status);

            if (statusReturned) {

                /* TODO: update logic later on in a way that we dont need a callback */
                onStatusUpdated(replicateRequest, statusReturned.text);

                addToast({
                    title: "Success",
                    description: "Status updated successfully",
                    color: "success",
                    icon: React.createElement(FaRegCircleCheck)
                })
            }
        },
        onError: (error) => {
            addToast({
                title: "Something went wrong saving status",
                description: error.message,
                color: "danger",
                icon: React.createElement(BiErrorAlt)
            })
        }
    })
}