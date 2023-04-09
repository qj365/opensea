import React from 'react';

function TextInput({
    label = undefined,
    id = undefined,
    placeholder,
    type = 'text',
    required = false,
    lableCss = '',
    inputCss = '',
    onChange,
    disabled = false,
    value,
    min = 0,
    autoComplete = 'off',
    step,
}) {
    return (
        <>
            <label
                htmlFor={id}
                className={`block text-base font-semibold text-[#e5e8eb] pb-2 ${lableCss}`}
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                className={`rounded-xl border-2 border-[#4c505c] py-[10px] px-4 bg-transparent text-white hover:border-[#8a939b] focus:border-[#8a939b] without-ring transition-colors ease-in-out duration-[250] ${inputCss} `}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                value={value}
                onChange={onChange}
                min={min}
                autoComplete={autoComplete}
                step={step}
            />
        </>
    );
}

export default TextInput;
