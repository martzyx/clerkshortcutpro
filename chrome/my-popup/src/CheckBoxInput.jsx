import React from "react";

const CheckboxInput = ({ id, name, label }) => {
    return (
        <div className="flex items-center justify-between">
            <label htmlFor={id} className="mr-2 text-sm">
                {label}
            </label>
            <input type="checkbox" id={id} name={name} className="toggle toggle-info" />
        </div>
    );
};

export default CheckboxInput;
