import React from "react";

const CheckboxInput = ({ id, name, label }) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input type="checkbox" id={id} name={name} />
        </div>
    );
};

export default CheckboxInput;
