import { useState } from "react";
import Heading1 from "./Heading1";
import ShortcutForm from "./ShortCutForm";

function App() {
    return (
        <div className="font-sans max-w-1280 mx-auto p-8 bg-darkMode text-white h-screen">
            <Heading1 heading="ClerkShortcutPro Settings" />
            <ShortcutForm />
        </div>
    );
}

export default App;
