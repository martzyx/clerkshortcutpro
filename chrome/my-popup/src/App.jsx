import { useState } from "react";
import Footer from "./Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "./Settings";
import Help from "./Help";
import Heading1 from "./Heading1";
import Links from "./Links";

function App() {
    return (
        <Router>
            <div
                id="app-wrapper"
                className="font-sans max-w-xl mx-auto w-128 h-screen min-h-50em p-8 bg-white text-black dark:bg-darkMode dark:text-white">
                <Heading1 heading="ClerkShortcutPro" />
                <Routes>
                    <Route path="/" element={<Links />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/help" element={<Help />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
