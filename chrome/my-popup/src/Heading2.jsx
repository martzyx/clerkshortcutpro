import React from "react";
import InfoIcon from "./InfoIcon";

const FormHeading = ({ text, tooltipText }) => {
    return (
        <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold my-3 text-center">{text}</h2>
            <InfoIcon tooltipText={tooltipText}></InfoIcon>
        </div>
    );
};

export default FormHeading;
