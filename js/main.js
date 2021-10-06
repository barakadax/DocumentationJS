'use strict';

let reader = new FileReader();
let searchTextObj = new searchObj();
let addContentObj = new addContent();
let updateContentObj = new updateContent();
let deleteContentObj = new deleteContent();
let jsonExportCommandHandlerObj = new jsonExportCommandHandler();
let showDescriptionObj = new showDescriptionOfSelectedContentObj();
const ENUM = {
    nextRow: 1,
    SubjectCellIndex: 1,
    regexChangeToIndex: 1,
    regexChangeFromIndex: 0,
    descriptionCellIndex: 0,
    descriptionRowSpanLength: 5,
    SearchReferencesCellIndex: 0,
    descriptionCellIndexFromJson: 2,
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ABOVE NO TOUCH, VARIABLE & ENUM SETUP~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

addUpdateWindow.style.display = 'none';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ABOVE NO TOUCH, HIDE WINDOW~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function showSearchedVariables() {
    searchTextObj.execute();
}

function showDescription(Description) {
    showDescriptionObj.execute(Description);
}

function changeAddEditWindowVisibility() {
    addContentObj.showOrHideWindow();
}

function addNewContent() {
    addContentObj.execute();
}

function editThis(typeOfContentValue) {
    updateContentObj.execute(typeOfContentValue);
}

function deleteThis(typeOfContentValue) {
    deleteContentObj.execute(typeOfContentValue);
}

function exportJSON() {
    jsonExportCommandHandlerObj.execute();
}

function importJSON() { 
    let file = document.getElementById('getFile');
    if (file.files[0])
        reader.readAsBinaryString(file.files[0]);
    file.value = "";
}

reader.onload = function(event) {
    let jsonImportCommandHandlerObj = new jsonImportCommandHandler();
    jsonImportCommandHandlerObj.execute(event.target.result);
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ABOVE allowed change physical button in the page~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/