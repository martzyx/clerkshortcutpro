import React from "react";
import FormHeading from "./FormHeading";
import CheckboxInput from "./CheckBoxInput";
import TextInput from "./TextInput";
import Button from "./Button";
import HorizontalLine from "./HorizontalLine";
import InfoIcon from "./InfoIcon";

const ShortcutForm = () => {
    return (
        <form id="shortcut-form" className="text-center">
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

            <Button />
        </form>
    );
};

export default ShortcutForm;
