'use strict';

class searchObj {
    tableRows;
    searchedText;
    replaceValues;
    findAllMatches;

    constructor() {
        this.searchedText = null;
        this.findAllMatches = 'g';
        this.tableRows = document.getElementsByTagName("tr");
        this.replaceValues = [['\'', ''], ['\"', ''], ['<', '&lt;'], ['>', '&gt;'], ['\n', '<br>']];
    }

    execute() {
        this.updateSearchedText();
        this.SearchedContent();
    }

    updateSearchedText() {
        this.searchedText = document.getElementById("searchedText").value.toLowerCase();
        this.editTextForJSUse();
    }

    editTextForJSUse() {
        for (let replaceValuesArrayIndex = 0; replaceValuesArrayIndex < this.replaceValues.length; replaceValuesArrayIndex++)
            this.regexChangeTextToFitJavascriptOrHTML(replaceValuesArrayIndex);
        this.searchedText = this.searchedText.trim().split(" ").filter(element => {
            return element !== '';
        });
    }

    regexChangeTextToFitJavascriptOrHTML(replaceValuesArrayIndex) {
        let regexExpression = new RegExp(this.replaceValues[replaceValuesArrayIndex][ENUM.regexChangeFromIndex], this.findAllMatches);
        this.searchedText.replace(regexExpression, this.replaceValues[replaceValuesArrayIndex][ENUM.regexChangeToIndex]);
    }

    SearchedContent() {
        if (this.searchedText.length == 0)
            this.showAll();
        else
            for (let rowIndex = 0; rowIndex < this.tableRows.length; rowIndex++)
                if (this.tableRows[rowIndex].id == "")
                    this.showOrHideSearchedContent(rowIndex);
    }

    showAll() {
        for (let rowIndex = 0; rowIndex < this.tableRows.length; rowIndex += 2)
            this.tableRows[rowIndex].style.display = '';
    }

    showOrHideSearchedContent(rowIndex) {
        this.isTextInContent(rowIndex) ? this.tableRows[rowIndex].style.display = '' : this.hideIrrelevantResult(rowIndex);
    }

    isTextInContent(rowIndex) {
        let variableTextToSearchIn = this.tableRows[rowIndex].children[ENUM.SearchReferencesCellIndex].innerHTML.trim().toLowerCase();
        let typeTextToSearchIn = this.tableRows[rowIndex].children[ENUM.SubjectCellIndex].innerHTML.trim().toLowerCase();
        for (let i = 0; i < this.searchedText.length; i++)
            if (variableTextToSearchIn.includes(this.searchedText[i]) || typeTextToSearchIn.includes(this.searchedText[i]))
                return true;
        return false;
    }

    hideIrrelevantResult(rowIndex) {
        this.tableRows[rowIndex].style.display = 'none';
        if (this.tableRows[rowIndex + ENUM.nextRow].id != "")
            this.tableRows[rowIndex + ENUM.nextRow].style.display = 'none';
    }
}