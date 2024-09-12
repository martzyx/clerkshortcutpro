import React from "react";

const Button = ({ onClick, label, type, id }) => {
    return (
        <button
            type={type}
            id={id}
            onClick={onClick()}
            className="mt-2 rounded-none bg-black text-white hover:bg-pasPurp py-1.5 px-3 transition w-32">
            {label}
        </button>
    );
};

export default Button;
