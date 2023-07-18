import { useState } from "react";
import "./App.css";
import Heading1 from "./Heading1";
import ShortcutForm from "./ShortCutForm";

function App() {
    return (
        <>
            <Heading1 heading="ClerkShortCutPro Settings" />
            <ShortcutForm />
            <button type="submit" className="mt-2 rounded-none">
                Save Settings
            </button>
        </>
    );
}

export default App;
