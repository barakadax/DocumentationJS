'use strict';

class jsonExportCommandHandler {
    #path;
    #content;
    #tableRows

    constructor() {
        this.#content = [];
        this.#path = "db.json";
        this.#tableRows = document.getElementsByTagName("tr");
    }

    execute() {
        for (let rowIndex = 0; rowIndex < this.#tableRows.length; rowIndex -= -2)
            this.#createAndSaveDataArray(rowIndex);
        this.#changeContentToJson();
        this.#content = [];
    }

    #createAndSaveDataArray(rowIndex) {
        let newContentData = [];
        newContentData.push(this.#tableRows[rowIndex].children[ENUM.SearchReferencesCellIndex].innerHTML.trim());
        newContentData.push(this.#tableRows[rowIndex].children[ENUM.SubjectCellIndex].innerHTML.trim());
        newContentData.push(this.#tableRows[rowIndex + ENUM.nextRow].children[ENUM.descriptionCellIndex].innerHTML.trim());
        this.#content.push(newContentData);
    }

    #changeContentToJson() {
        let jsonData = JSON.stringify(this.#content);
        this.#createFileAndDownload(jsonData);
    }

    #createFileAndDownload(content) {
        let downloadLink = document.createElement("a");
        let jsonFile = new Blob([content], {type: 'text/plain'});
        downloadLink.href = URL.createObjectURL(jsonFile);
        downloadLink.download = this.#path;
        downloadLink.click();
    }
}