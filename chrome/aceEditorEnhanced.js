function largenEditor() {
    // https://ace.c9.io/#nav=howto
    const editorEl = document.querySelectorAll(".editor");
    const editorWidthEl = document.querySelector('[ng-view][autoscroll="true"].ng-scope');

    editorEl.forEach((el) => (el.style = "height:calc(100vh - 5em)"));
    editorWidthEl.style = "max-width:100vw";

    for (el of editorEl) {
        let editorID = el.getAttribute("id");
        let editor = ace.edit(editorID);
        editor.resize();
    }
}
