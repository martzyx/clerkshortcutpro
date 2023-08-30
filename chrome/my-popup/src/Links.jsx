import React from "react";
import HorizontalLine from "./HorizontalLine";
import FormHeading from "./FormHeading";
import InfoIcon from "./InfoIcon";
import Button from "./Button";

const Links = () => {
    return (
        <>
            <HorizontalLine />
            <div className="flex items-center gap-2 justify-center">
                <FormHeading text="Get Visitor ID" />
                <InfoIcon tooltipText="Opens new tab with API call to get visitorID" />
            </div>
            <div className="flex items-center justify-between mt-2">
                <label className="mr-2 text-sm">Get visitor ID of current tab</label>
                <Button label="Go" />
            </div>
            <HorizontalLine />
            <div
                className={`alert alert-error grid mx-2 grid-flow-col grid-cols-[auto,minmax(auto,1fr)] justify-items-start text-left fixed left-1/2 w-fit transform -translate-x-1/2 bottom-20 transition-opacity duration-1000 opacity-0`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span>Error (check console)</span>
            </div>
        </>
    );
};

export default Links;
