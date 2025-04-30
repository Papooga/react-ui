export const formatPhoneNumber = (value: string): string => {
    if (!value) { return "-"; }
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
};

export const stripNonNumeric = (input: string): string => {
    return input.replace(/\D/g, '');
};