import React from "react";

const TextInput = ({ id, name, label }) => {
    return (
        <div className="flex justify-between">
            <label htmlFor={id} className="mr-1 text-sm">
                {label}{" "}
            </label>
            <input
                type="text"
                id={id}
                name={name}
                placeholder="Map key here"
                className="input input-bordered rounded-none font-mono text-center"
            />
        </div>
    );
};

export default TextInput;
