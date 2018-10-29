function WrestlerRow(id, fullName) {
    
    this.id = id;
    this.fullName = fullName;
}

var MainPage = function() {

    this.addNewWrestler = async function() {
        await element(by.buttonText("New")).click();
    }

    this.searchWrestler = async function(searchString) {
        await element(by.model("searchFor")).clear().sendKeys(searchString);
        await element(by.buttonText("Search")).click();
    }

    this.getFirstWrestlerFromList = async function() {
        var row = element(by.repeater("wrestler in wrestlers.rows").row(0));
        return new WrestlerRow(
            await row.all(by.tagName('td')).get(0).getText(), 
            await row.all(by.tagName('td')).get(1).getText());
    }

    this.getNumberOfWrestlerRows = async function() {
        return await element.all(by.repeater("wrestler in wrestlers.rows")).count();
    }
}

module.exports = MainPage;