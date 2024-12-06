document.addEventListener("DOMContentLoaded", () => {
    // check if iframe is old myclerk
    if (document.body && window.location.href.startsWith("https://old-my.clerk.io/")) {
        const observer = new MutationObserver((mutations, observer) => {
            checkUrl();
            const editorWidthEl = document.querySelector('[ng-view][autoscroll="true"].ng-scope');
            if (editorWidthEl && editorWidthEl.getAttribute("data-csp") == "true") {
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
    if (window.location.href.includes("/code")) {
        enlargeEditor();
    }
}

function enlargeEditor() {
    // https://ace.c9.io/#nav=howto
    const editorWidthEl = document.querySelector('[ng-view][autoscroll="true"].ng-scope');
    const editorEl = document.querySelectorAll(".editor");
    editorEl.forEach((el) => (el.style = "height:calc(80vh - 5em)"));

    for (el of editorEl) {
        let editorID = el.getAttribute("id");
        if (typeof ace !== "undefined") {
            let editor = ace.edit(editorID);
            editor.resize();
        }
    }

    if (editorWidthEl) {
        editorWidthEl.style = "max-width:100vw";
        editorWidthEl.setAttribute("data-csp", "true");
    }
}
