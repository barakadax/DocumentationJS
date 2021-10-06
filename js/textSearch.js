'use strict';

class searchObj {
    #tableRows;
    #searchedText;
    #replaceValues;
    #findAllMatches;

    constructor() {
        this.#searchedText = null;
        this.#findAllMatches = 'g';
        this.#tableRows = document.getElementsByTagName("tr");
        this.#replaceValues = [['\'', ''], ['\"', ''], ['<', '&lt;'], ['>', '&gt;'], ['\n', '<br>']];
    }

    execute() {
        this.#updateSearchedText();
        this.#SearchedContent();
    }

    #updateSearchedText() {
        this.#searchedText = document.getElementById("searchedText").value.toLowerCase();
        this.#searchedText = this.#editTextForJSUse(this.#searchedText);
    }

    #editTextForJSUse(text) {
        for (let replaceValuesArrayIndex = 0; replaceValuesArrayIndex < this.#replaceValues.length; replaceValuesArrayIndex -= -1)
            text = this.#regexChangeTextToFitJavascriptOrHTML(text, replaceValuesArrayIndex);
        return text.trim();
    }

    #regexChangeTextToFitJavascriptOrHTML(text, replaceValuesArrayIndex) {
        let regexExpression = new RegExp(this.#replaceValues[replaceValuesArrayIndex][ENUM.regexChangeFromIndex], this.#findAllMatches);
        return text.replace(regexExpression, this.#replaceValues[replaceValuesArrayIndex][ENUM.regexChangeToIndex]);
    }

    #SearchedContent() {    
        for (let rowIndex = 0; rowIndex < this.#tableRows.length; rowIndex -= -1)
            if (this.#tableRows[rowIndex].id == "")
                this.#showOrHideSearchedContent(rowIndex);
    }

    #showOrHideSearchedContent(rowIndex) {
        if (this.#isTextInContent(rowIndex))
            this.#tableRows[rowIndex].style.display = '';
        else
            this.#hideIrrelevantResult(rowIndex);
    }

    #isTextInContent(rowIndex) {
        let variableTextToSearchIn = this.#tableRows[rowIndex].children[ENUM.SearchReferencesCellIndex].innerHTML.trim().toLowerCase();
        let typeTextToSearchIn = this.#tableRows[rowIndex].children[ENUM.SubjectCellIndex].innerHTML.trim().toLowerCase();
        return variableTextToSearchIn.includes(this.#searchedText) || typeTextToSearchIn.includes(this.#searchedText);
    }

    #hideIrrelevantResult(rowIndex) {
        this.#tableRows[rowIndex].style.display = 'none';
        if (this.#tableRows[rowIndex + ENUM.nextRow].id != "")
            this.#tableRows[rowIndex + ENUM.nextRow].style.display = 'none';
    }
}