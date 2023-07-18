import React from "react";

const CheckboxInput = ({ id, name, label }) => {
    return (
        <div className="flex items-center">
            <label htmlFor={id} className="mr-2">
                {label}
            </label>
            <div className="relative">
                <input type="checkbox" id={id} name={name} className="hidden" />
                <label
                    htmlFor={id}
                    className="flex items-center justify-start w-10 border border-black h-6 p-1 cursor-pointer">
                    <span className="w-4 h-4 bg-black block"></span>
                </label>
            </div>
        </div>
    );
};

export default CheckboxInput;
