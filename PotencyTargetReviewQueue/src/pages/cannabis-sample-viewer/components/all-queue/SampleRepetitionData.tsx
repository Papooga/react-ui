import * as React from "react";

interface SampleRepetitionProps {
    sampleId: number
}

const SampleRepetitionData: React.FC<SampleRepetitionProps> = ({sampleId}) => {
    return (
        <div>{sampleId}</div>
    );
}

export default SampleRepetitionData;