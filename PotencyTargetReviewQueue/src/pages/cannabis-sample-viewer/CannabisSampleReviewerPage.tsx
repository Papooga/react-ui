import CannabisSampleReviewerHeader from "./components/all-queue/CannabisSampleReviewerHeader.tsx";
import {Tab, Tabs} from "@heroui/react";
import MainSampleGridContainer from "./components/all-queue/MainSampleGridContainer.tsx";
import ReAnalysisSampleGridContainer from "./components/reanalysis-queue/ReAnalysisSampleGridContainer.tsx";

function CannabisSampleReviewerPage() {
    return (
        <>
            <CannabisSampleReviewerHeader/>

            <Tabs aria-label="Tabs radius" variant={"underlined"} className={"mt-4"} radius={"lg"}>
                <Tab key="All" title="All">
                    <MainSampleGridContainer />
                </Tab>
                <Tab key="Re-Analysis Queue" title="Re-Analysis Queue">
                    <ReAnalysisSampleGridContainer />
                </Tab>
            </Tabs>

        </>
    );
}

export default CannabisSampleReviewerPage;