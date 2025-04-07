import {create} from "zustand/react";
import {DateValue} from "@heroui/react";
import { parseDate } from "@internationalized/date";
import {persist} from "zustand/middleware";

interface CannabisSampleFilterState {
    startDate: DateValue | null,
    endDate: DateValue | null,
    searchTrigger: number,
    setStartDate: (date: DateValue | null) => void,
    setEndDate: (date: DateValue | null) => void,
    triggerSearch: () => void,
    error: Error | null
}
export const useCannabisSampleFilterStore = create<CannabisSampleFilterState>()(
    persist(
        (set) => ({
            startDate: null,
            endDate: null,
            searchTrigger: 0,
            setStartDate: (date: DateValue | null) => set({ startDate: date }),
            setEndDate: (date: DateValue | null) => set({ endDate: date }),
            triggerSearch: () => set({ searchTrigger: Date.now() }),
            error: null
        }),
        {
            name: "useCannabisSampleFilterStore",
            partialize: (state) => ({
                startDate: state.startDate ? state.startDate.toString() : null,
                endDate: state.endDate ? state.endDate.toString() : null,
            }),
            merge: (persistedState, currentState) => {
                const typedState = persistedState as { startDate?: string | null; endDate?: string | null };

                return {
                    ...currentState,
                    startDate: typedState.startDate ? parseDate(typedState.startDate) : null,
                    endDate: typedState.endDate ? parseDate(typedState.endDate) : null,
                };
            },
        }
    )
);
