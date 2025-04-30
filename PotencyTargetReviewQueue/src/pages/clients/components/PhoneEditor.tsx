import React, { useEffect, useRef, forwardRef } from 'react';
import type { ICellEditor } from 'ag-grid-community';
import type { CustomCellEditorProps } from 'ag-grid-react';
import {formatPhoneNumber, stripNonNumeric} from "../Clients.util.ts";

export interface PhoneEditorRef extends ICellEditor {
    myCustomFunction?: () => { rowIndex: number; colId: string };
}

export const PhoneEditor = forwardRef<PhoneEditorRef, CustomCellEditorProps<string>>(
    ({ value, onValueChange, eventKey, stopEditing }) => {
        const refInput = useRef<HTMLInputElement>(null);
        const [displayValue, setDisplayValue] = React.useState('');

        useEffect(() => {
            let startValue: string;
            const rawValue = value ? stripNonNumeric(value) : '';

            if (eventKey === 'Backspace') {
                startValue = '';
                if (rawValue !== '') {
                    onValueChange('');
                }
            } else if (eventKey && eventKey.length === 1) {
                startValue = eventKey;
                onValueChange(startValue);
            } else {
                startValue = rawValue;
            }

            const formatted = formatPhoneNumber(startValue);
            setDisplayValue(formatted);

            refInput.current?.focus();
        }, []);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = stripNonNumeric(e.target.value);
            const currentRawValue = value ? stripNonNumeric(value) : '';
            const formatted = formatPhoneNumber(raw);

            setDisplayValue(formatted);

            if (raw !== currentRawValue) {
                onValueChange(raw);
            }
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' || e.key === 'Tab') {
                stopEditing();
            }
        };

        const handleBlur = () => {
            stopEditing();
        };

        return (
            <input
                ref={refInput}
                value={displayValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                className="ag-input-field-input ag-text-field-input w-full"
                style={{
                    padding: '4px 8px',
                    border: '1px solid #ccc',
                    borderRadius: 4,
                    fontSize: '0.875rem',
                }}
            />
        );
    }
);