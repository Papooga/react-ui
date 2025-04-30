import { useState } from 'react';
import { Input, Button } from "@heroui/react";
import {FaRegClipboard} from "react-icons/fa";
import {BsClipboard2Check} from "react-icons/bs";

interface IProps {
    label: string;
    value: string;
    readOnly: boolean;
    className: string;
}
const CopyableInput: React.FC<IProps> = ({ label, value, readOnly = true, className = '' }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className={`w-full ${className}`}>
            <Input
                label={label}
                value={value}
                readOnly={readOnly}
                endContent={
                    <Button
                        isIconOnly
                        variant="light"
                        onPress={handleCopy}
                        aria-label="Copy to clipboard"
                    >
                        {copied ? (
                            <BsClipboard2Check size={20} />
                        ) : (
                            <FaRegClipboard size={20} />
                        )}
                    </Button>
                }
            />
        </div>
    );
};

export default CopyableInput;