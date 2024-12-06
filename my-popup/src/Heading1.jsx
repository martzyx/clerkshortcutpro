import React from "react";

const Heading = ({ heading }) => {
    return (
        <div className="flex items-center">
            <h1 className="text-3xl font-extrabold dark:text-white">{heading}</h1>
        </div>
    );
};

export default Heading;
