import React from "react";
import Heading2 from "./Heading2";
import CheckboxInput from "./CheckBoxInput";

const ShortcutForm = () => {
    return (
        <form id="shortcut-form">
            <div>
                <Heading2 text="Proceed/Confirm Shorcut" />
                <div>
                    <CheckboxInput
                        id="enable-shortcut1"
                        name="enable-shortcut1"
                        label="Enable proceed/confirm shortcut:"
                    />
                </div>
                <div>
                    <label htmlFor="shortcut1">
                        Map the key you want to use (default is 'enter'):
                    </label>
                    <input type="text" id="shortcut1" name="shortcut1" />
                </div>
            </div>
            <div>
                <Heading2 text="Escape/Close Modal Shorcut" />
                <div>
                    <CheckboxInput
                        id="enable-shortcut2"
                        name="enable-shortcut2"
                        label="Enable close modal shortcut:"
                    />
                </div>
                <label htmlFor="shortcut2">Map the key you want to use (default is 'esc'):</label>
                <input type="text" id="shortcut2" name="shortcut2" />
            </div>
            <div>
                <Heading2 text="Delete Search Designs Button" />
                <CheckboxInput
                    id="enable-delete-designs"
                    name="enable-delete-designs"
                    label="Enable delete button for search designs:"
                />
            </div>
        </form>
    );
};

export default ShortcutForm;
