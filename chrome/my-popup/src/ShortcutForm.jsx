import React, { useState } from "react";
import FormHeading from "./FormHeading";
import CheckboxInput from "./CheckBoxInput";
import TextInput from "./TextInput";
import HorizontalLine from "./HorizontalLine";
import InfoIcon from "./InfoIcon";
import Button from "./Button";

const ShortcutForm = () => {
    // Define state to hold display status
    const [saveAlert, setSaveAlert] = useState(false);
    const [fade, setFade] = useState(false);

    const handleSubmit = (e) => {
        // Prevent form from refreshing the page on submit
        e.preventDefault();

        // Show the save alert
        setSaveAlert(true);

        // Start the fade out after 2 seconds
        setTimeout(() => {
            setFade(true);

            // Hide the alert after the transition ends
            setTimeout(() => {
                setSaveAlert(false);
                setFade(false);
            }, 1000); // This should match the transition duration
        }, 2000);
    };
    return (
        <form id="shortcut-form" className="text-center" onSubmit={handleSubmit}>
            <HorizontalLine />
            <div className="flex items-center gap-2 justify-center">
                <FormHeading text="Proceed/Confirm Shortcut" />
                <InfoIcon tooltipText="Proceeds with the modal or the current flow" />
            </div>
            <div>
                <CheckboxInput
                    id="enable-shortcut1"
                    name="enable-shortcut1"
                    label="Enable proceed/confirm shortcut:"
                />
                <TextInput
                    id="shortcut1"
                    name="shortcut1"
                    label="Map the key you want to use (default is 'enter'):"
                />
            </div>

            <HorizontalLine />
            <div className="flex items-center gap-2 justify-center">
                <FormHeading text="Escape/Close Modal Shortcut" />
                <InfoIcon tooltipText="Closes modal or exits the current flow" />
            </div>
            <CheckboxInput
                id="enable-shortcut2"
                name="enable-shortcut2"
                label="Enable close modal shortcut:"
            />
            <TextInput
                id="shortcut2"
                name="shortcut2"
                label="Map the key you want to use (default is 'esc'):"
            />

            <HorizontalLine />
            <div className="flex items-center gap-2 justify-center">
                <FormHeading text="Delete Search Designs Button" />
                <InfoIcon tooltipText="Creates delete all designs button in search designs page" />
            </div>
            <CheckboxInput
                id="enable-delete-designs"
                name="enable-delete-designs"
                label="Enable delete button for search designs:"
            />

            <HorizontalLine />

            <Button label="Save settings"></Button>
            {saveAlert && (
                <div
                    className={`grid mx-2 grid-flow-col grid-cols-[auto,minmax(auto,1fr)] justify-items-start text-left alert alert-success fixed left-1/2 w-fit transform -translate-x-1/2 bottom-20 transition-opacity duration-1000 ${
                        fade ? "opacity-0" : "opacity-100"
                    }`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Settings saved</span>
                </div>
            )}
        </form>
    );
};

export default ShortcutForm;
