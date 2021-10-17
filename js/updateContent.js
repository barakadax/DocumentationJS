'use strict';

class updateContent{
    #tableRows;
    #findAllMatches;
    #replaceValuesJSFriendly;
    #replaceValuesHTMLFriendly;

    constructor() {
        this.#findAllMatches = 'g';
        this.#tableRows = document.getElementsByTagName("tr");
        this.#replaceValuesJSFriendly = [['\n', '<br>'],
        ['&lt;i&gt;', '<i>'], ['&lt;/i&gt;', '</i>'], ['&lt;b&gt;', '<b>'], ['&lt;/b&gt;', '</b>'], ['&lt;u&gt;', '<u>'], ['&lt;/u&gt;', '</u>'],
        ['&lt;I&gt;', '<I>'], ['&lt;/I&gt;', '</I>'], ['&lt;B&gt;', '<B>'], ['&lt;/B&gt;', '</B>'], ['&lt;U&gt;', '<U>'], ['&lt;/U&gt;', '</U>'],
        ['&lt;ul&gt;', '<ul>'], ['&lt;/ul&gt;', '</ul>'], ['&lt;li&gt;', '<li>'], ['&lt;/li&gt;', '</li>'], ['&lt;ol&gt;', '<ol>'], ['&lt;/ol&gt;', '</ol>'],
        ['&lt;UL&gt;', '<UL>'], ['&lt;/UL&gt;', '</UL>'], ['&lt;LI&gt;', '<LI>'], ['&lt;/LI&gt;', '</LI>'], ['&lt;OL&gt;', '<OL>'], ['&lt;/OL&gt;', '</OL>']];
        this.#replaceValuesHTMLFriendly = [['&lt;', '<'], ['&gt;', '>'], ['<br>', '\n'], ['&amp;', '&'],
        ['<i>', '#i#'], ['</i>', '#/i#'], ['<b>', '#b#'], ['</b>', '#/b#'], ['<u>', '#u#'], ['</u>', '#/u#'],
        ['<I>', '#I#'], ['</I>', '#/I#'], ['<B>', '#B#'], ['</B>', '#/B#'], ['<U>', '#U#'], ['</U>', '#/U#'],
        ['<ul>', '#ul#'], ['</ul>', '#/ul#'], ['<li>', '#li#'], ['</li>', '#/li#'], ['<ol>', '#ol#'], ['</ol>', '#/ol#'],
        ['<UL>', '#UL#'], ['</UL>', '#/UL#'], ['<LI>', '#LI#'], ['</LI>', '#/LI#'], ['<OL>', '#OL#'], ['</OL>', '#/OL#']];
    }

    execute(subject) {
        subject = this.#editTextForUse(subject, this.#replaceValuesJSFriendly);
        this.#showOrHideWindow();
        this.#checkRowToEdit(subject);
    }

    #editTextForUse(text, replaceValuesArray) {
        for (let replaceValuesArrayIndex = 0; replaceValuesArrayIndex < replaceValuesArray.length; replaceValuesArrayIndex -= -1)
            text = this.#regexChangeTextToFitJavascriptOrHTML(text, replaceValuesArrayIndex, replaceValuesArray);
        return text.trim();
    }

    #regexChangeTextToFitJavascriptOrHTML(text, replaceValuesArrayIndex, replaceValuesArray) {
        let regexExpression = new RegExp(replaceValuesArray[replaceValuesArrayIndex][ENUM.regexChangeFromIndex], this.#findAllMatches);
        return text.replace(regexExpression, replaceValuesArray[replaceValuesArrayIndex][ENUM.regexChangeToIndex]);
    }

    #showOrHideWindow() {
        this.#clear();
        addUpdateWindow.style.display = addUpdateWindow.style.display === '' ? 'none' : '';
    }

    #checkRowToEdit(text) {
        for (let rowIndex = 0; rowIndex < this.#tableRows.length; rowIndex -= -1)
            if (this.#validateRowMatchContent(rowIndex, text))
                this.#insertDataIntoInputFields(rowIndex);         
    }

    #validateRowMatchContent(rowIndex, text) {
        return this.#tableRows[rowIndex].id == '' &&
        this.#tableRows[rowIndex].children[ENUM.SubjectCellIndex].innerHTML.trim().toLowerCase() ==
        text.trim().toLowerCase();
    }

    #insertDataIntoInputFields(rowIndex) {
        SearchReferencesInput.value = this.#editTextForUse(this.#tableRows[rowIndex].children[ENUM.SearchReferencesCellIndex].innerHTML, this.#replaceValuesHTMLFriendly);
        SubjectInput.value = this.#editTextForUse(this.#tableRows[rowIndex].children[ENUM.SubjectCellIndex].innerHTML, this.#replaceValuesHTMLFriendly);
        descriptionInputText.value = this.#editTextForUse(this.#tableRows[rowIndex + ENUM.nextRow].children[ENUM.SearchReferencesCellIndex].innerHTML, this.#replaceValuesHTMLFriendly);
    }

    #clear() {
        SearchReferencesInput.value = '';
        SubjectInput.value = '';
        descriptionInputText.value = '';
    }
}