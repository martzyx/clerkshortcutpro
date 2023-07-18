import React from "react";

const TextInput = ({ id, name, label }) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input type="text" id={id} name={name} />
        </div>
    );
};

export default TextInput;
