import React, { useEffect } from "react";
import ShortcutForm from "./ShortCutForm";

const Settings = () => {
    useEffect(() => {
        // Dispatch a custom event
        const event = new CustomEvent("reactSettingsLoaded", { detail: {} });
        window.dispatchEvent(event);
    }, []);
    return (
        <>
            <ShortcutForm />
        </>
    );
};

export default Settings;
