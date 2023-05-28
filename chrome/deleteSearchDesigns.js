document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
      // Check the URL pattern
      const urlPattern = /^https:\/\/my.clerk.io\/#\/store\/\w+\/search\/designs$/;
      if (urlPattern.test(window.location.href)) {
        // Find the c-card element
        const cardElement = document.querySelector('c-card[headline-title="Design"]');
        
        // Check if the element exists
        if (cardElement) {
          // Create a new button element
          const btn = document.createElement("button");
          btn.innerHTML = "Delete standard crap!";
          
          // Append the button to the card element
          cardElement.appendChild(btn);
    
          // Define the function to be triggered
          const myFunction = async () => {
            // Array of the desired innerHTML values
            let values = ["search_facets - Style 4", "search_instant - Style 4", "search_page - Style 4", "search_instant - Style 2", "search_instant - Style 1", "search_facets - Style 1", "search_facets - Style 3", "search_facets - Style 2", "search_page - Style 3", "search_page - Style 1", "search_page - Style 2", "search_instant - Style 3"];
            let iterations = 0;
    
            while (!document.querySelector('[ng-if="designs.length == 0"]') && iterations < 10) {
              // Get all td elements in an array
              let tdElements = Array.from(document.querySelectorAll('td'));
    
              // Loop over the values array
              for (let value of values) {
                // Find the td that has the innerHTML equal to the current value
                let targetTd = tdElements.find(td => td.innerHTML === value);
    
                // Get the parent tr of the target td
                let parentTr;
                if (targetTd) {
                  parentTr = targetTd.parentNode;
    
                  // Find the c-button with the specific attribute within parentTr
                  let cButton = parentTr.querySelector('c-button[click="toggleDropdown()"]');
    
                  if (cButton) {
                    // Find the immediate button child of c-button
                    let button = cButton.querySelector('button');
                    
                    if (button) {
                      // Click on the button
                      button.click();
    
                      // Find and click on the div
                      let div = document.querySelector('div[ng-click="openDeleteModal(template)"]');
                      if (div) {
                        div.click();
    
                        // Find and click on the delete button
                        let deleteButton = document.querySelector('[click="deleteDesign()"] > button');
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
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
    
            // Log message indicating that the loop has finished
            console.log('Finished deleting the spam.');
          };
    
          // Attach the function to the button click event
          btn.addEventListener("click", myFunction);
        } else {
          console.log("No c-card element with headline-title 'Design' found.");
        }
      } else {
        console.log("URL does not match pattern.");
      }
    }, 1000);
  });
  