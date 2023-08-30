window.addEventListener("message", function (event) {
    if (event.source !== window) return;
    if (event.data.type && event.data.type === "FROM_CONTENT_SCRIPT") {
        setKeyboardShortcut(event.data.shortcut1, event.data.enableShortcut1);
        setKeyboardShortcut2(event.data.shortcut2, event.data.enableShortcut2);
    }
});

function setKeyboardShortcut(shortcut1, enableShortcut1) {
    if (enableShortcut1) {
        document.addEventListener("keydown", function (event) {
            if (
                event.key === shortcut1 &&
                window.location.href.startsWith("https://my.clerk.io/")
            ) {
                console.log("Proceed shortcut pressed: " + shortcut1);
                const buttons = [
                    {
                        selector: '[click="saveDesign(true)"] > button',
                        message: "Clicking saveAndExitbutton",
                    },
                    {
                        selector: '[click="deleteDesign()"] > button',
                        message: "Clicking deleteButton",
                    },
                    {
                        selector: '[click="$root.uiConfirmConfirm()"] > button',
                        message: "Clicking confirmButton",
                    },
                    {
                        selector: '[click="hideUnsavedModal(true)"] > button',
                        message: "Clicking leavePage",
                    },
                    {
                        selector: '[click="saveDuplicateDesign(designToDuplicate)"] > button',
                        message: "Clicking saveCopy",
                    },
                    {
                        selector: "[ng-click=\"selectIndex($index, 'next')\"] > button",
                        message: "Clicking nextButton",
                    },
                    {
                        selector: '[ng-click="submitEvent(config)"] > button',
                        message: "Clicking create design button",
                    },
                    {
                        selector: "[ng-view] .body .green.button",
                        message: "Clicking green button in setup flow",
                    },
                    // Add more buttons here
                ];

                for (let button of buttons) {
                    const element = document.querySelector(button.selector);
                    if (element) {
                        console.log(button.message);
                        element.click();
                        break; // Exit the loop as soon as we find a button that exists
                    }
                }
            }
        });
    }
}

function setKeyboardShortcut2(shortcut2, enableShortcut2) {
    if (enableShortcut2) {
        document.addEventListener("keydown", function (event) {
            if (
                event.key === shortcut2 &&
                window.location.href.startsWith("https://my.clerk.io/")
            ) {
                console.log("closeModal shortcut pressed: " + shortcut2);
                const buttons = [
                    { selector: '[ng-click="closeModal()"]', message: "Clicking closeModal" },
                    {
                        selector: '[ng-click="design.exit()"] > button',
                        message: "Clicking exit new design flow",
                    },
                    { selector: "[ng-view] .gray.button", message: "Clicking back in setup flow" },
                    {
                        selector: '[ng-click="content.exit()"] > button',
                        message: "Exiting new content flow",
                    },
                    {
                        selector: ".sidebar.visible .sidebar-close",
                        message: "Exiting side modal for selecting products",
                    },
                    {
                        selector: '[ng-click="merchandising.exit()"] > button',
                        message: "Exiting merchandising campaign",
                    },
                ];
                for (let button of buttons) {
                    const element = document.querySelector(button.selector);
                    if (element) {
                        console.log(button.message);
                        element.click();
                        break; // Exit the loop as soon as we find a button that exists
                    }
                }
            }
        });
    }
}
