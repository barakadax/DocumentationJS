'use strict';

class deleteContent{
    tableRows;
    replaceValues
    findAllMatches;

    constructor() {
        this.findAllMatches = 'g';
        this.tableRows = document.getElementsByTagName("tr");
        this.replaceValues = [['\'', ''], ['\"', ''], ['\n', '<br>'],
        ['#i#', '<i>'], ['#/i#', '</i>'], ['#b#', '<b>'], ['#/b#', '</b>'], ['#u#', '<u>'], ['#/u#', '</u>'],
        ['#I#', '<I>'], ['#/I#', '</I>'], ['#B#', '<B>'], ['#/B#', '</B>'], ['#U#', '<U>'], ['#/U#', '</U>'],
        ['#ul#', '<ul>'], ['#/ul#', '</ul>'], ['#li#', '<li>'], ['#/li#', '</li>'], ['#ol#', '<ol>'], ['#/ol#', '</ol>'],
        ['#UL#', '<UL>'], ['#/UL#', '</UL>'], ['#LI#', '<LI>'], ['#/LI#', '</LI>'], ['#OL#', '<OL>'], ['#/OL#', '</OL>']];
    }

    execute(subject) {
        subject = this.editTextForJSUse(subject);
        this.searchSubjectForDelete(subject);
    }

    searchSubjectForDelete(subject) {
        for (let rowIndex = 0; rowIndex < this.tableRows.length; rowIndex++)
            if (this.validateRowMatchContent(rowIndex, subject))
                return this.removeContent(rowIndex);
    }

    editTextForJSUse(text) {
        for (let replaceValuesArrayIndex = 0; replaceValuesArrayIndex < this.replaceValues.length; replaceValuesArrayIndex++)
            text = this.regexChangeTextToFitJavascriptOrHTML(text, replaceValuesArrayIndex);
        return text.trim();
    }

    regexChangeTextToFitJavascriptOrHTML(text, replaceValuesArrayIndex) {
        let regexExpression = new RegExp(this.replaceValues[replaceValuesArrayIndex][ENUM.regexChangeFromIndex], this.findAllMatches);
        return text.replace(regexExpression, this.replaceValues[replaceValuesArrayIndex][ENUM.regexChangeToIndex]);
    }

    validateRowMatchContent(rowIndex, subject) {
        return this.tableRows[rowIndex].id == '' &&
        this.tableRows[rowIndex].children[ENUM.SubjectCellIndex].innerHTML.trim().toLowerCase() == subject.toLowerCase();
    }

    removeContent(rowIndex) {
        this.tableRows[rowIndex + ENUM.nextRow].remove();
        this.tableRows[rowIndex].remove();
    }
}