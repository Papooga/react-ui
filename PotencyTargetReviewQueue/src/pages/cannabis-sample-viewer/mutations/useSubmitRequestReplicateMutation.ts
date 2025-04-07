import {useMutation} from "@tanstack/react-query";
import {ICannabisSampleViewer, ICreateReplicateResponse} from "../../../../types/cannabis-sample.types.ts";
import {IReplicateRequestForm} from "../../../../types/repetition-request.types.ts";
import agent from "../../../api/agent.ts";
import {addToast} from "@heroui/react";
import React from "react";
import {FaRegCircleCheck} from "react-icons/fa6";
import {BiErrorAlt} from "react-icons/bi";

export const useSubmitRequestReplicateMutation = () => {
    return useMutation({
        mutationFn: async ({sample, replicateRequestForm, onReplicateRequestCreated, closeModal}:
                           {
                               sample: ICannabisSampleViewer, replicateRequestForm: IReplicateRequestForm,
                               onReplicateRequestCreated: (sample: ICannabisSampleViewer, status: string) => void,
                               closeModal: () => void
                           }) => {
            const apiUrl = '/api/v1/create-replicate-request';
            const payload = {
                "samplePanelId": sample.samplePanelId,
                "replicates": replicateRequestForm.numOfReplicates,
                "notes": replicateRequestForm.notes
            };
            const response = await agent.post<ICreateReplicateResponse>(apiUrl, payload);
            return {response, sample, onReplicateRequestCreated, closeModal}
        },
        onSuccess: ({response, sample, onReplicateRequestCreated, closeModal}) => {
            onReplicateRequestCreated(sample, response.status);
            closeModal();
            addToast({
                title: "Success",
                description: "Request submitted successfully",
                color: "success",
                icon: React.createElement(FaRegCircleCheck)
            })
        },
        onError: (error) => {
            console.log(error);
            addToast({
                title: "Something went wrong submitting request",
                description: error.message,
                color: "danger",
                icon: React.createElement(BiErrorAlt)
            })
        }
    })
}