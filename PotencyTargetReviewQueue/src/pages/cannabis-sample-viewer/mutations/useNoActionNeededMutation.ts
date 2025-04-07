import {useMutation} from "@tanstack/react-query";
import {ICannabisSampleViewer, INoActionNeededResponse} from "../../../../types/cannabis-sample.types.ts";
import agent from "../../../api/agent.ts";
import {addToast} from "@heroui/react";
import React from "react";
import {FaRegCircleCheck} from "react-icons/fa6";
import {BiErrorAlt} from "react-icons/bi";

export const useNoActionNeededMutation = () => {
    return useMutation({
        mutationFn: async ({sample, removeRowFromSampleGrid, closeModal}:
                           {
                               sample: ICannabisSampleViewer,
                               removeRowFromSampleGrid: (sample: ICannabisSampleViewer) => void,
                               closeModal:  () => void
                           }) => {
            const url = `/api/v1/no-further-action?samplePanelId=${sample.samplePanelId}`
            const response = await agent.post<INoActionNeededResponse>(url);
            return { response, sample, removeRowFromSampleGrid, closeModal }
        },
        onSuccess: ({ response, sample, removeRowFromSampleGrid, closeModal }) => {
            if (response.success) {
                removeRowFromSampleGrid(sample);
                closeModal();
                addToast({
                    title: "Success",
                    description: response.message,
                    color: "success",
                    icon: React.createElement(FaRegCircleCheck)
                })
            } else {
                addToast({
                    title: "Something went wrong saving status",
                    description: response.message,
                    color: "danger",
                    icon: React.createElement(BiErrorAlt)
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
    });
}