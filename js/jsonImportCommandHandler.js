'use strict';

class jsonImportCommandHandler {
    table;
    tableRows;
    editImage;
    deleteImage;
    triangleImage;
    descriptionBtnText;

    constructor() {
        this.descriptionBtnText = " Press for description ";
        this.tableRows = document.getElementsByTagName("tr");
        this.table = document.getElementsByTagName("table")[0];
        this.editImage = "<img class=\"smallImages\" src=\"img/edit.png\" alt=\"edit\">";
        this.deleteImage = "<img class=\"smallImages\" src=\"img/delete.png\" alt=\"delete\">";
        this.triangleImage = "<img class=\"smallImages\" src=\"img/triangle.png\" alt=\"highlightThisIsAButtonTriangle\"/>";
    }

    execute(fileContent) {
        let jsonData = JSON.parse(fileContent);
        for (let jsonIndex = 0; jsonIndex < jsonData.length; jsonIndex++)
            this.buildNewContent(jsonData[jsonIndex]);
    }

    buildNewContent(contentArray) {
        this.createSearchRow(contentArray);
        this.createDescriptionRow(contentArray);
        this.hideAllDescriptionUponStart();
    }

    createSearchRow(contentArray) {
        let searchRow = document.createElement('tr');
        searchRow.appendChild(this.hideSearchCell(this.createNewCellWithData(contentArray[ENUM.SearchReferencesCellIndex])));
        searchRow.appendChild(this.createNewCellWithData(contentArray[ENUM.SubjectCellIndex]));
        searchRow.appendChild(this.createBtnCell(this.triangleImage + this.descriptionBtnText + this.triangleImage, "showDescription(\'" + contentArray[ENUM.SubjectCellIndex] + "\')"));
        searchRow.appendChild(this.createBtnCell(this.editImage, "editThis(\'" + contentArray[ENUM.SubjectCellIndex] + "\')"));
        searchRow.appendChild(this.createBtnCell(this.deleteImage, "deleteThis(\'" + contentArray[ENUM.SubjectCellIndex] + "\')"));
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

    createBtnCell(btnVisualInHtml, btnFunction) {
        let descriptionBtnCell = document.createElement('td');
        descriptionBtnCell.appendChild(this.createBtn(btnVisualInHtml, btnFunction));
        return descriptionBtnCell;
    }

    createBtn(btnVisualInHtml, btnFunction) {
        let DescriptionBtn = document.createElement('button'); 
        DescriptionBtn.innerHTML = btnVisualInHtml;
        DescriptionBtn.setAttribute('onclick', btnFunction);
        return DescriptionBtn;
    }

    createDescriptionRow(cellContent) {
        let descriptionRow = this.createRowForDescription(cellContent);
        descriptionRow.appendChild(this.createDescriptionContent(cellContent));
        this.table.appendChild(descriptionRow);
    }

    createRowForDescription(cellContent) {
        let descriptionRow = document.createElement('tr');
        descriptionRow.setAttribute("dir", "auto");
        descriptionRow.style.display = 'none';
        descriptionRow.id = cellContent[ENUM.SubjectCellIndex];
        return descriptionRow;
    }

    createDescriptionContent(cellContent) {
        let rowContent = this.createNewCellWithData(cellContent[ENUM.descriptionCellIndexFromJson]);
        rowContent.colSpan = ENUM.descriptionRowSpanLength;
        return rowContent;
    }

    hideAllDescriptionUponStart() {
        for (let rowIndex = 0; rowIndex < this.tableRows.length; rowIndex++)
            if (this.tableRows[rowIndex].id != "")
                this.tableRows[rowIndex].style.display = 'none';
    }
}