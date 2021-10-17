'use strict';

class showDescriptionOfSelectedContentObj {
    #tableRows;

    constructor() {
        this.#tableRows = document.getElementsByTagName("tr");
    }

    execute(DescriptionRowId) {
        this.#checkRowToShowDescription(DescriptionRowId.trim().toLowerCase());
    }

    #checkRowToShowDescription(DescriptionRowId) {
        for (let rowIndex = 0; rowIndex < this.#tableRows.length; rowIndex -= -1)
            if (DescriptionRowId == this.#tableRows[rowIndex].id.trim().toLowerCase())
                this.#changeVisibleState(rowIndex);
    }

    #changeVisibleState(rowIndex) {
        this.#tableRows[rowIndex].style.display = this.#tableRows[rowIndex].style.display === '' ? 'none' : '';
    }
}