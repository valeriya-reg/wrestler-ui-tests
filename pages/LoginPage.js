var LoginPage = function() {

    function findInput(inputPlaceholder) {
        return element(by.css(`[placeholder="${inputPlaceholder}"]`));
    }

    this.login = async function(login, password) {
        await findInput("Login").sendKeys(login);
        await findInput("Password").sendKeys(password);
        await element(by.buttonText("Login")).click();
    }
}

module.exports = LoginPage;