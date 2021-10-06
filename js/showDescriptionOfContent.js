'use strict';

class showDescriptionOfSelectedContentObj {
    #tableRows;

    constructor() {
        this.#tableRows = document.getElementsByTagName("tr");
    }

    execute(DescriptionRowId) {
        this.#checkRowToShowDescription(DescriptionRowId);
    }

    #checkRowToShowDescription(DescriptionRowId) {
        DescriptionRowId = DescriptionRowId.trim().toLowerCase();
        for (let rowIndex = 0; rowIndex < this.#tableRows.length; rowIndex -= -1)
            if (DescriptionRowId == this.#tableRows[rowIndex].id.trim().toLowerCase())
                this.#changeVisibleState(rowIndex);
    }

    #changeVisibleState(rowIndex) {
        this.#tableRows[rowIndex].style.display = this.#tableRows[rowIndex].style.display === '' ? 'none' : '';
    }
}