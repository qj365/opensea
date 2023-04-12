import React from 'react';
import { MdSearch, MdClear } from 'react-icons/md';

function InputWithIcon({
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
            <div
                className={`flex items-center rounded-xl border-2 border-[#4c505c]  hover:border-[#8a939b] focus:border-[#8a939b]  transition-colors ease-in-out duration-[250] ${inputCss} `}
            >
                <MdSearch className="text-3xl text-[#ffffffcc] ml-4" />
                <input
                    type={type}
                    className="bg-transparent text-white without-ring border-0 py-[10px] px-4 w-full"
                    id={id}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                    min={min}
                    autoComplete={autoComplete}
                    step={step}
                />
                {value && (
                    <MdClear
                        className="text-3xl text-[#ffffffcc] mr-4 cursor-pointer"
                        onClick={() => onChange({ target: { value: '' } })}
                    />
                )}
            </div>
        </>
    );
}

export default InputWithIcon;
