import React from "react";
import Heading2 from "./Heading2";
import CheckboxInput from "./CheckBoxInput";
import TextInput from "./TextInput";
import Button from "./Button";
import HorizontalLine from "./HorizontalLine";

const ShortcutForm = () => {
    return (
        <form id="shortcut-form" className="text-center">
            <Heading2 text="Proceed/Confirm Shortcut" tooltipText="helloooo" />
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

            <HorizontalLine />

            <Heading2 text="Escape/Close Modal Shortcut" />
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

            <Heading2 text="Delete Search Designs Button" />
            <CheckboxInput
                id="enable-delete-designs"
                name="enable-delete-designs"
                label="Enable delete button for search designs:"
            />
            <Button />
        </form>
    );
};

export default ShortcutForm;
