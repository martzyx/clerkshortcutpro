document.addEventListener("DOMContentLoaded", () => {
    // check if iframe is old myclerk
    if (document.body && window.location.href.startsWith("https://old-my.clerk.io/")) {
        const observer = new MutationObserver((mutations) => {
            checkUrl();
            console.log("first observer run");
            const element = document.querySelector('[ng-view][autoscroll="true"].ng-scope');
            if (element.getAttribute("data-csp") == "true") {
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }
});

function checkUrl() {
    if (window.location.href.includes("/code") && window.location.href.startsWith("https://old-my.clerk.io/")) {
        // Check if the angular element is loaded
        function checkAngularEl(observer) {
            const element = document.querySelector('[ng-view][autoscroll="true"].ng-scope');
            if (element) {
                enlargeEditor();
                observer.disconnect();
                console.log("second observer run");
            }
        }

        const config = { attributes: false, childList: true, subtree: true };

        const callback = function (mutationsList, observer) {
            for (const mutation of mutationsList) {
                if (mutation.type === "childList") {
                    checkAngularEl(observer);
                }
            }
        };

        const observer = new MutationObserver(callback);
        const targetNode = document.body;
        observer.observe(targetNode, config);
    }
}

function enlargeEditor() {
    // https://ace.c9.io/#nav=howto
    const editorWidthEl = document.querySelector('[ng-view][autoscroll="true"].ng-scope');
    const editorEl = document.querySelectorAll(".editor");
    editorEl.forEach((el) => (el.style = "height:calc(100vh - 5em)"));

    for (el of editorEl) {
        let editorID = el.getAttribute("id");
        let editor = ace.edit(editorID);
        editor.resize();
    }


    if (editorWidthEl) {
        editorWidthEl.style = "max-width:100vw";
        editorWidthEl.setAttribute("data-csp", "true");
    }
}
