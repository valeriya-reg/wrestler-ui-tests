function DropDown(modelName) {

    this.selectElement = element(by.css(`[value="${modelName}"]`));

    this.selectOption = async function(optionText) {
        await this.selectElement
            .all(by.cssContainingText("option", optionText))
            .first()
            .click();
    }

    this.selectedOption = async function() {
        return await this.selectElement
            .element(by.css("option:checked"))
            .getText();
    }
}

var WrestlerPage = function() {

    function findInput(modelName){
        return element(by.css(`[value="${modelName}"] input`));
    }

    this.fname = findInput("wr.fname");
    this.lname = findInput("wr.lname");
    this.mname = findInput("wr.mname");
    this.dob = findInput("wr.dob");

    this.region1 = new DropDown("wr.region1");
    this.region2 = new DropDown("wr.region2");
    this.fst1 = new DropDown("wr.fst1");
    this.fst2 = new DropDown("wr.fst2");
    this.style = new DropDown("wr.style");
    this.lictype = new DropDown("wr.lictype");
    this.expires = new DropDown("wr.expires");
    this.card_state = new DropDown("wr.card_state");

    this.save = async function() {
        await element(by.css('.btn-success')).click();
    }

    this.delete = async function() {
        await element(by.css('.btn-danger')).click();
        await element(by.css('.modal-dialog .btn-success')).click();
    }

    this.getWrestlerId = async function() {
        return await element(by.css('div[ng-controller="WrestlerCtrl"]')).evaluate("wr.id_wrestler");
    }
}

module.exports = WrestlerPage;