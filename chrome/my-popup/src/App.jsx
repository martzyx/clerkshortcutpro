import { useState } from "react";
import Heading1 from "./Heading1";
import ShortcutForm from "./ShortCutForm";
import HorizontalLine from "./HorizontalLine";
import Footer from "./Footer";

function App() {
    return (
        <div className="font-sans max-w-xl mx-auto min-w-max p-8 bg-white text-black dark:bg-darkMode dark:text-white">
            <Heading1 heading="ClerkShortcutPro" />
            <HorizontalLine />
            <ShortcutForm />
            <Footer />
        </div>
    );
}

export default App;
