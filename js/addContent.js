'use strict';

class addContent{
    table;
    tableRows;
    editImage;
    deleteImage;
    triangleImage;
    findAllMatches;
    descriptionBtnText;
    regexReplaceValuesArray;

    constructor() {
        this.findAllMatches = 'g';
        this.descriptionBtnText = " Press for description ";
        this.tableRows = document.getElementsByTagName("tr");
        this.table = document.getElementsByTagName("table")[0];
        this.editImage = "<img class=\"smallImages\" src=\"img/edit.png\" alt=\"edit\">";
        this.deleteImage = "<img class=\"smallImages\" src=\"img/delete.png\" alt=\"delete\">";
        this.regexReplaceValuesArray = [['\'', ''], ['\"', ''], ['&', '&amp;'],
        ['<i>', ''], ['</i>', ''], ['<b>', ''], ['</b>', ''], ['<u>', ''], ['</u>', ''],
        ['<I>', ''], ['</I>', ''], ['<B>', ''], ['</B>', ''], ['<U>', ''], ['</U>', ''],
        ['<ul>', ''], ['</ul>', ''], ['<li>', ''], ['</li>', ''], ['<ol>', ''], ['</ol>', ''],
        ['<UL>', ''], ['</UL>', ''], ['<LI>', ''], ['</LI>', ''], ['<OL>', ''], ['</OL>', ''],
        ['&lt;i&gt;', ''], ['&lt;/i&gt;', ''], ['&lt;b&gt;', ''], ['&lt;/b&gt;', ''], ['&lt;u&gt;', ''], ['&lt;/u&gt;', ''],
        ['&lt;I&gt;', ''], ['&lt;/I&gt;', ''], ['&lt;B&gt;', ''], ['&lt;/B&gt;', ''], ['&lt;U&gt;', ''], ['&lt;/U&gt;', ''],
        ['&lt;ul&gt;', ''], ['&lt;/ul&gt;', ''], ['&lt;li&gt;', ''], ['&lt;/li&gt;', ''], ['&lt;ol&gt;', ''], ['&lt;/ol&gt;', ''],
        ['&lt;UL&gt;', ''], ['&lt;/UL&gt;', ''], ['&lt;LI&gt;', ''], ['&lt;/LI&gt;', ''], ['&lt;OL&gt;', ''], ['&lt;/OL&gt;', ''],
        ['<', '&lt;'], ['>', '&gt;'], ['\n', '<br>'],
        ['#i#', '<i>'], ['#/i#', '</i>'], ['#b#', '<b>'], ['#/b#', '</b>'], ['#u#', '<u>'], ['#/u#', '</u>'],
        ['#I#', '<I>'], ['#/I#', '</I>'], ['#B#', '<B>'], ['#/B#', '</B>'], ['#U#', '<U>'], ['#/U#', '</U>'],
        ['#ul#', '<ul>'], ['#/ul#', '</ul>'], ['#li#', '<li>'], ['#/li#', '</li>'], ['#ol#', '<ol>'], ['#/ol#', '</ol>'],
        ['#UL#', '<UL>'], ['#/UL#', '</UL>'], ['#LI#', '<LI>'], ['#/LI#', '</LI>'], ['#OL#', '<OL>'], ['#/OL#', '</OL>']];
        this.triangleImage = "<img class=\"smallImages\" src=\"img/triangle.png\" alt=\"highlightThisIsAButtonTriangle\"/>";
    }

    showOrHideWindow() {
        this.clear();
        addUpdateWindow.style.display = addUpdateWindow.style.display === '' ? 'none' : '';
    }
    
    execute() {
        this.changeAllInputToHtmlFriendly();
        if (this.checkIfCanBeAddOrEdited() || this.checkIfEditOrAdd())
            return this.showOrHideWindow();;
        this.createSearchRow();
        this.createDescriptionRow();
        this.showOrHideWindow();
    }

    checkIfCanBeAddOrEdited() {
        let isSubjectEmpty = SubjectInput.value == '';
        if(isSubjectEmpty)
            alert("You must at least have subject to be able submitting!");
        return isSubjectEmpty;
    }

    changeAllInputToHtmlFriendly() {
        SearchReferencesInput.value = this.editTextForJSUse(SearchReferencesInput.value);
        SubjectInput.value = this.editTextForJSUse(SubjectInput.value);
        descriptionInputText.value = this.editTextForJSUse(descriptionInputText.value);
    }

    editTextForJSUse(text) {
        for (let replaceValuesArrayIndex = 0; replaceValuesArrayIndex < this.regexReplaceValuesArray.length; replaceValuesArrayIndex++)
            text = this.regexChangeTextToFitJavascriptOrHTML(text, replaceValuesArrayIndex);
        return text.trim();
    }

    regexChangeTextToFitJavascriptOrHTML(text, replaceValuesArrayIndex) {
        let regexExpression = new RegExp(this.regexReplaceValuesArray[replaceValuesArrayIndex][ENUM.regexChangeFromIndex], this.findAllMatches);
        return text.replace(regexExpression, this.regexReplaceValuesArray[replaceValuesArrayIndex][ENUM.regexChangeToIndex]);
    }

    checkIfEditOrAdd() {
        for (let rowIndex = 0; rowIndex < this.tableRows.length; rowIndex++)
            if (this.addOrEditValidator(rowIndex))
                return this.editOnOccurrence(rowIndex);
        return false;
    }

    addOrEditValidator(rowIndex) {
        return this.tableRows[rowIndex].id == '' &&
            this.tableRows[rowIndex].children[ENUM.SubjectCellIndex].innerHTML.trim().toLowerCase() ==
            SubjectInput.value.trim().toLowerCase();
    }

    editOnOccurrence(rowIndex) {
        this.tableRows[rowIndex].children[ENUM.SearchReferencesCellIndex].innerHTML = SearchReferencesInput.value.trim();
        this.tableRows[rowIndex].children[ENUM.SubjectCellIndex].innerHTML = SubjectInput.value.trim();
        this.tableRows[rowIndex + ENUM.nextRow].children[ENUM.SearchReferencesCellIndex].innerHTML = descriptionInputText.value.trim();
        this.tableRows[rowIndex + ENUM.nextRow].id = SubjectInput.value.trim();
        return this.clear();
    }

    createSearchRow() {
        let searchRow = document.createElement('tr');
        searchRow.appendChild(this.hideSearchCell(this.createNewCellWithData(SearchReferencesInput.value)));
        searchRow.appendChild(this.createNewCellWithData(SubjectInput.value));
        searchRow.appendChild(this.createBtnCell(this.triangleImage + this.descriptionBtnText + this.triangleImage, "showDescription(\'" + SubjectInput.value + "\')"));
        searchRow.appendChild(this.createBtnCell(this.editImage, "editThis(\'" + SubjectInput.value + "\')"));
        searchRow.appendChild(this.createBtnCell(this.deleteImage, "deleteThis(\'" + SubjectInput.value + "\')"));
        this.table.appendChild(searchRow);
    }

    createNewCellWithData(cellContent) {
        let newCell = document.createElement('td');
        newCell.setAttribute("dir", "auto");
        newCell.innerHTML = cellContent;
        return newCell;
    }

    hideSearchCell(searchCell) {
        searchCell.style.display = 'none';
        return searchCell;
    }

    createBtnCell(btnVisual, btnFunction) {
        let descriptionBtnCell = document.createElement('td');
        descriptionBtnCell.appendChild(this.createBtn(btnVisual, btnFunction));
        return descriptionBtnCell;
    }

    createBtn(btnVisual, btnFunction) {
        let DescriptionBtn = document.createElement('button'); 
        DescriptionBtn.innerHTML = btnVisual;
        DescriptionBtn.setAttribute('onclick', btnFunction);
        return DescriptionBtn;
    }

    createDescriptionRow() {
        let descriptionRow = this.createRowForDescription();
        descriptionRow.appendChild(this.createDescriptionContent());
        this.table.appendChild(descriptionRow);
    }

    createRowForDescription() {
        let descriptionRow = document.createElement('tr');
        descriptionRow.setAttribute("dir", "auto");
        descriptionRow.style.display = 'none';
        descriptionRow.id = SubjectInput.value;
        return descriptionRow;
    }

    createDescriptionContent() {
        let rowContent = this.createNewCellWithData(descriptionInputText.value);
        rowContent.colSpan = ENUM.descriptionRowSpanLength;
        return rowContent;
    }

    clear() {
        SearchReferencesInput.value = '';
        SubjectInput.value = '';
        descriptionInputText.value = '';
        return true;
    }
}
