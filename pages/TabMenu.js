var TabMenu = function() {
    
    this.navigateMain = async function () {
        await element(by.css('ul.nav-tabs li:first-child a')).click();
    }
}

module.exports = TabMenu;