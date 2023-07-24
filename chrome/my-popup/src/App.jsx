import { useState } from "react";
import Heading1 from "./Heading1";
import ShortcutForm from "./ShortCutForm";
import HorizontalLine from "./HorizontalLine";

function App() {
    return (
        <div className="font-sans max-w-xl mx-auto p-8 bg-white text-black dark:bg-darkMode dark:text-white h-screen">
            <Heading1 heading="ClerkShortcutPro Settings" />
            <HorizontalLine />
            <ShortcutForm />
        </div>
    );
}

export default App;
