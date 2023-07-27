import React, { useEffect } from "react";
import ShortcutForm from "./ShortCutForm";

const Settings = () => {
    useEffect(() => {
        // var settingsNavEl = document.getElementById("settingsNav");
        // if (settingsNavEl) {
        //     document.getElementById("settingsNav").click();
        // }

        // Dispatch a custom event
        const event = new CustomEvent("reactComponentLoaded", { detail: {} });
        window.dispatchEvent(event);
    }, []);
    return (
        <>
            <ShortcutForm />
        </>
    );
};

export default Settings;
