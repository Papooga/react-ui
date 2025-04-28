import {Button, Card, DatePicker, Form} from "@heroui/react";
import {useCannabisSampleFilterStore} from "../../../../stores/useCannabisSampleFilterStore.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useFetchSamplesQuery} from "../../queries/useFetchSamplesQuery.ts";
import {TbDatabaseSearch} from "react-icons/tb";

const CannabisSampleReviewerHeader = () => {
    const startDate = useCannabisSampleFilterStore((state) => state.startDate);
    const endDate = useCannabisSampleFilterStore((state) => state.endDate);
    const setStartDate = useCannabisSampleFilterStore((state) => state.setStartDate);
    const setEndDate = useCannabisSampleFilterStore((state) => state.setEndDate);
    const triggerSearch = useCannabisSampleFilterStore((state) => state.triggerSearch);

    const queryClient = useQueryClient();
    const {isPending: loading, isRefetching} = useFetchSamplesQuery();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        triggerSearch();

        queryClient.invalidateQueries({
            queryKey: ["potency-samples"]
        })
    };

    return (
        <Card className="px-[14px] py-[18px] border border-[#ddddde] shadow-none">
            <h3 className="mb-4 text-[20px]">Potency Target Review Queue</h3>

            <div className="flex items-center space-x-4 gap-5">
                <Form className="w-full" onSubmit={onSubmit}>
                    <div className="flex gap-2 mb-2">
                        <DatePicker variant="faded" isRequired
                                    size="sm"
                                    radius={"lg"}
                                    className="w-[300px]"
                                    label="Start date"
                                    value={startDate}
                                    onChange={setStartDate} />

                        <DatePicker variant="faded" isRequired
                                    size="sm"
                                    radius={"lg"}
                                    className="w-[300px]"
                                    value={endDate}
                                    onChange={setEndDate}
                                    label="End date" />

                        <Button color={"secondary"} size={"lg"} isIconOnly={true} variant={"ghost"} type="submit" isLoading={loading || isRefetching}>
                            <TbDatabaseSearch size={20} />
                        </Button>
                    </div>
                </Form>
            </div>
        </Card>
    );
}

export default CannabisSampleReviewerHeader;