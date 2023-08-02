window.addEventListener("message", function (event) {
    if (event.source !== window) return;
    if (event.data.type && event.data.type === "FROM_CONTENT_SCRIPT") {
        runDeleteSearchDesigns(event.data.enableDeleteDesigns);
    }
});

function runDeleteSearchDesigns(enableDeleteDesigns) {
    if (enableDeleteDesigns) {
        function checkUrlSearchDesigns() {
            // Your values array
            let values = [
                "search_facets - Style 4",
                "search_instant - Style 4",
                "search_page - Style 4",
                "search_instant - Style 2",
                "search_instant - Style 1",
                "search_facets - Style 1",
                "search_facets - Style 3",
                "search_facets - Style 2",
                "search_page - Style 3",
                "search_page - Style 1",
                "search_page - Style 2",
                "search_instant - Style 3",
            ];

            // Function to check if the given value is in the array
            function isInArray(value, array) {
                return array.indexOf(value) !== -1;
            }

            // Function to check the <td> elements against the values array
            function checkTDValues() {
                let tds = document.querySelectorAll("td");
                let matchFound = false;

                tds.forEach((td) => {
                    let tdValue = td.textContent.trim();

                    if (isInArray(tdValue, values)) {
                        matchFound = true;
                    }
                });
                let defaultDesignsDetected;
                if (matchFound) {
                    defaultDesignsDetected = true;
                    console.log("default designs detected");
                } else {
                    defaultDesignsDetected = false;
                    console.log("default designs NOT detected");
                }
            }

            // Call the function to check the <td> elements on page load
            checkTDValues();

            if (
                window.location.href.indexOf("/search/designs") !== -1 &&
                window.location.href.indexOf("/search/designs/new") === -1
            ) {
                // Find the c-card element
                const cardElement = document.querySelector('c-card[headline-title="Design"]');

                // Check if the element exists
                if (cardElement && !document.querySelector(".martzDeleteButton")) {
                    // Create a new button element
                    const btn = document.createElement("button");
                    btn.textContent = "Delete standard crap!";
                    btn.classList.add("c-btn", "rounded", "danger", "martzDeleteButton");

                    // Append the button to the card element
                    cardElement.appendChild(btn);

                    // Define the function to be triggered
                    const myFunction = async () => {
                        // Array of the desired innerHTML values
                        let values = [
                            "search_facets - Style 4",
                            "search_instant - Style 4",
                            "search_page - Style 4",
                            "search_instant - Style 2",
                            "search_instant - Style 1",
                            "search_facets - Style 1",
                            "search_facets - Style 3",
                            "search_facets - Style 2",
                            "search_page - Style 3",
                            "search_page - Style 1",
                            "search_page - Style 2",
                            "search_instant - Style 3",
                        ];
                        let iterations = 0;

                        while (
                            !document.querySelector('[ng-if="designs.length == 0"]') &&
                            iterations < 10
                        ) {
                            // Get all td elements in an array
                            let tdElements = Array.from(document.querySelectorAll("td"));

                            // Loop over the values array
                            for (let value of values) {
                                // Find the td that has the innerHTML equal to the current value
                                let targetTd = tdElements.find((td) => td.innerHTML === value);

                                // Get the parent tr of the target td
                                let parentTr;
                                if (targetTd) {
                                    parentTr = targetTd.parentNode;

                                    // Find the c-button with the specific attribute within parentTr
                                    let cButton = parentTr.querySelector(
                                        'c-button[click="toggleDropdown()"]'
                                    );

                                    if (cButton) {
                                        // Find the immediate button child of c-button
                                        let button = cButton.querySelector("button");

                                        if (button) {
                                            // Click on the button
                                            button.click();

                                            // Find and click on the div
                                            let div = document.querySelector(
                                                'div[ng-click="openDeleteModal(template)"]'
                                            );
                                            if (div) {
                                                div.click();

                                                // Find and click on the delete button
                                                let deleteButton = document.querySelector(
                                                    '[click="deleteDesign()"] > button'
                                                );
                                                if (deleteButton) {
                                                    deleteButton.click();
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            iterations++;

                            // Wait for 1000ms before the next iteration
                            await new Promise((resolve) => setTimeout(resolve, 1000));
                        }

                        // Log message indicating that the loop has finished
                        console.log("ClerkShortcutPro: Finished deleting the spam.");
                    };

                    // Attach the function to the button click event
                    btn.addEventListener("click", myFunction);
                }
            }
        }
        setInterval(checkUrlSearchDesigns, 1000); // Check every second
    }
}
