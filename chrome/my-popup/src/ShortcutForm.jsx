import React from "react";
import Heading2 from "./Heading2";
import CheckboxInput from "./CheckBoxInput";
import TextInput from "./TextInput";

const ShortcutForm = () => {
    return (
        <form id="shortcut-form">
            <Heading2 text="Proceed/Confirm Shorcut" />
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

            <Heading2 text="Escape/Close Modal Shorcut" />
            <CheckboxInput
                id="enable-shortcut2"
                name="enable-shortcut2"
                label="Enable close modal shortcut:"
            />
            <TextInput
                id="shorcut2"
                name="shorcut2"
                label="Map the key you want to use (default is 'esc'):"
            />

            <Heading2 text="Delete Search Designs Button" />
            <CheckboxInput
                id="enable-delete-designs"
                name="enable-delete-designs"
                label="Enable delete button for search designs:"
            />
        </form>
    );
};

export default ShortcutForm;
