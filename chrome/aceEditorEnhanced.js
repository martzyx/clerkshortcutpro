function checkEl() {
    // Check if oldmyclerk iframe
    if (!window.location.href.startsWith("https://old-my.clerk.io")) {
        return;
    }

    let editorWidthEl = document.querySelector('[ng-view][autoscroll="true"].ng-scope');
    if (editorWidthEl) {
        enlargeEditor();
        clearInterval(editorInterval);
    }
}

let editorInterval = setInterval(checkEl, 200);

function enlargeEditor() {
    // https://ace.c9.io/#nav=howto
    let editorWidthEl = document.querySelector('[ng-view][autoscroll="true"].ng-scope');
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
