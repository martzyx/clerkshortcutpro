import React from "react";

const CheckboxInput = ({ onclick, id, name, label }) => {
    return (
        <div className="flex items-center justify-between mt-2">
            <label htmlFor={id} className="mr-2 text-sm">
                {label}
            </label>
            <input type="checkbox" onClick={() => onclick()} id={id} name={name} className="toggle toggle-info" />
        </div>
    );
};

export default CheckboxInput;
