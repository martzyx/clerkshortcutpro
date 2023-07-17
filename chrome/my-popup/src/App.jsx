import { useState } from "react";
import "./App.css";
import Heading1 from "./Heading1";
import ShortcutForm from "./ShortCutForm";

function App() {
    return (
        <>
            <Heading1 heading="ClerkShortCutPro Settings" />
            <ShortcutForm />
            <button type="submit">Save Settings</button>
        </>
    );
}

export default App;
