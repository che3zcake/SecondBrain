type InputBoxProps = {
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};


export function InputBox({ label, placeholder, value, onChange, onKeyDown }: InputBoxProps) {
    return (
        <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-semibold">{label}</label>
            <input
                className="border p-2 rounded"
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </div>
    );
}