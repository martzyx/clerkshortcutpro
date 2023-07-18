import React from "react";

const TextInput = ({ id, name, label }) => {
    return (
        <div>
            <label htmlFor={id} className="mr-1">
                {label}{" "}
            </label>
            <input
                type="text"
                id={id}
                name={name}
                className="bg-transparent border border-black px-3 text-center border-1"
            />
        </div>
    );
};

export default TextInput;
