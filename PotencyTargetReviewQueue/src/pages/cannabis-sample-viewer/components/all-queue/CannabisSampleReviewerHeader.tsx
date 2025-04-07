import {Button, Card, DatePicker, Form} from "@heroui/react";
import {useCannabisSampleFilterStore} from "../../../../stores/useCannabisSampleFilterStore.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useFetchSamplesQuery} from "../../queries/useFetchSamplesQuery.ts";

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
        <Card className="px-[14px] py-[18px] bg-[#f4f4f5] shadow-none">
            <h3 className="mb-4 text-[20px]">Potency Target Review Queue</h3>

            <div className="flex items-center space-x-4 gap-5">
                <Form className="w-full" onSubmit={onSubmit}>
                    <div className="flex gap-2 mb-2">
                        <DatePicker variant="faded" isRequired
                                    size="sm"
                                    className="w-[250px]"
                                    label="Start date"
                                    value={startDate}
                                    onChange={setStartDate} />

                        <DatePicker variant="faded" isRequired
                                    size="sm"
                                    className=""
                                    value={endDate}
                                    onChange={setEndDate}
                                    label="End date" />

                        <Button color={"default"} fullWidth type="submit" isLoading={loading || isRefetching}>Fetch samples</Button>
                    </div>
                </Form>
            </div>
        </Card>
    );
}

export default CannabisSampleReviewerHeader;