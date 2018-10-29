var LoginPage = require('./pages/LoginPage');
var MainPage = require('./pages/MainPage');
var TabMenu = require('./pages/TabMenu');
var WrestlerPage = require('./pages/WrestlerPage');

describe('When create new wrestler', function() {

    var loginPage = new LoginPage();
    var mainPage = new MainPage();
    var tabMenu = new TabMenu();
    var wrestlerPage = new WrestlerPage();

    var createdWrestlerId;
    var currentFname;
    var currentLname;
    var currentMname;
    var currentDob;
    var currentRegion1;
    var currentRegion2;
    var currentFst1;
    var currentFst2;
    var currentStyle;
    var currentLictype;
    var currentExpires;
    var currentCardState;

    var consts = {
        region1: ["AR Krym", "Vynnitska", "Volynska", "Dnipropetrovska", "Donetska", "Ghitomerska", "Zakarpatska", "Zaporizka", "Ivano-Frankivska", 
            "Kyivska", "Kyrovogradska", "Luganska", "Lvivska", "Mykolaivska", "Odeska", "Poltavska", "Rivnenska", "Sumska", "Ternopilska", "Kharkivska", 
            "Khersonska", "Khemlnicka", "Cherkaska", "Chernivetska", "Chernigivska", "Sevastopol"],
        region2: ["AR Krym", "Vynnitska", "Volynska", "Dnipropetrovska", "Donetska", "Ghitomerska", "Zakarpatska", "Zaporizka", "Ivano-Frankivska", 
            "Kyivska", "Kyrovogradska", "Luganska", "Lvivska", "Mykolaivska", "Odeska", "Poltavska", "Rivnenska", "Sumska", "Ternopilska", "Kharkivska", 
            "Khersonska", "Khemlnicka", "Cherkaska", "Chernivetska", "Chernigivska", "Sevastopol"],
        fst1: ["Dinamo", "Kolos", "Ukraina", "Spartak", "MON", "ZSU", "SK"],
        fst2: ["Dinamo", "Kolos", "Ukraina", "Spartak", "MON", "ZSU", "SK"],
        style: ["FS", "FW", "GR"],
        lictype: ["Junior", "Cadet", "Senior"],
        expires: ["2013", "2014", "2015", "2016", "2017"],
        card_state: ["No card", "Produced", "Recieved"]
    };

    var loremIpsum = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum";

    var loremWords = loremIpsum.split(" ").map(function (word) {
        return word.charAt(0).toUpperCase() + word.substring(1);
    });

    var loremCount = loremWords.length;

    function getRandomName() {
        var randomWordIndex = Math.floor(Math.random() * loremCount);
        return loremWords[randomWordIndex];
    }

    function getRandomFromRange(data) {
        var length = data.length;
        var randomIndex = Math.floor(Math.random() * length);
        return data[randomIndex];
    }

    function getRandomDate() {
        var now = Date.now()
        var randomSeconds = Math.floor(Math.random() * now);
        var randomDate = new Date(randomSeconds);
        return new Date(randomDate.getFullYear(), randomDate.getMonth(), randomDate.getDate());
    }

    function padZero(num) {
        return ('0' + num).slice(-2);
    }

    function generateWrestlerInfo() {
        var randomDate = getRandomDate();
        var day = padZero(randomDate.getDate());
        var month = padZero(randomDate.getMonth() + 1);
        var year = randomDate.getFullYear();

        currentFname = getRandomName();
        currentLname = getRandomName();
        currentMname = getRandomName();
        currentDob = `${day}-${month}-${year}`;
        currentRegion1 = getRandomFromRange(consts.region1);
        currentRegion2 = getRandomFromRange(consts.region2);
        currentFst1 = getRandomFromRange(consts.fst1);
        currentFst2 = getRandomFromRange(consts.fst2);
        currentStyle = getRandomFromRange(consts.style);
        currentLictype = getRandomFromRange(consts.lictype);
        currentExpires = getRandomFromRange(consts.expires);
        currentCardState = getRandomFromRange(consts.card_state);
    }

    async function fillWrestlerInfo() {
        await wrestlerPage.fname.clear().sendKeys(currentFname);
        await wrestlerPage.lname.clear().sendKeys(currentLname);
        await wrestlerPage.mname.clear().sendKeys(currentMname);
        await wrestlerPage.dob.clear().sendKeys(currentDob);

        await wrestlerPage.region1.selectOption(currentRegion1);
        await wrestlerPage.region2.selectOption(currentRegion2);
        await wrestlerPage.fst1.selectOption(currentFst1);
        await wrestlerPage.fst2.selectOption(currentFst2);
        await wrestlerPage.style.selectOption(currentStyle);
        await wrestlerPage.lictype.selectOption(currentLictype);
        await wrestlerPage.expires.selectOption(currentExpires);
        await wrestlerPage.card_state.selectOption(currentCardState);
    }

    async function createNewWrestler() {
        
        generateWrestlerInfo();

        await mainPage.addNewWrestler();
        await fillWrestlerInfo();
        await wrestlerPage.save();
        await tabMenu.navigateMain();

        createdWrestlerId = (await wrestlerPage.getWrestlerId()).toString();
    }

    async function updateWrestler(wrestlerId) {
        
        generateWrestlerInfo();

        await mainPage.searchWrestler(wrestlerId);
        await fillWrestlerInfo();
        await wrestlerPage.save();
        await tabMenu.navigateMain();
    }

    async function deleteWrestler(wrestlerId) {

        await mainPage.searchWrestler(wrestlerId);
        await wrestlerPage.delete();
    }

    async function readValue(element) {
        return await element.getAttribute("value"); 
    }

    async function verifyWrestlerInfo(wrestlerId) {

        await mainPage.searchWrestler(wrestlerId);

        var fname = await readValue(wrestlerPage.fname);
        var lname = await readValue(wrestlerPage.lname);
        var mname = await readValue(wrestlerPage.mname);
        var dob = await readValue(wrestlerPage.dob);

        var region1 = await wrestlerPage.region1.selectedOption();
        var region2 = await wrestlerPage.region2.selectedOption();
        var fst1 = await wrestlerPage.fst1.selectedOption();
        var fst2 = await wrestlerPage.fst2.selectedOption();
        var style = await wrestlerPage.style.selectedOption();
        var lictype = await wrestlerPage.lictype.selectedOption();
        var expires = await wrestlerPage.expires.selectedOption();
        var card_state = await wrestlerPage.card_state.selectedOption();

        expect(fname).toEqual(currentFname);
        expect(lname).toEqual(currentLname);
        expect(mname).toEqual(currentMname);
        expect(dob).toEqual(currentDob);
        expect(region1).toEqual(currentRegion1);
        expect(region2).toEqual(currentRegion2);
        expect(fst1).toEqual(currentFst1);
        expect(fst2).toEqual(currentFst2);
        expect(style).toEqual(currentStyle);
        expect(lictype).toEqual(currentLictype);
        expect(expires).toEqual(currentExpires);
        expect(card_state).toEqual(currentCardState);
    }

    beforeAll(async function() {
        await browser.get('http://streamtv.net.ua/base/');
        await loginPage.login("auto", "test");

        await createNewWrestler();
    });

    it('Wrestler should appear in the list', async function() {

        var currentFullName = `${currentLname} ${currentFname} ${currentMname}`;

        await mainPage.searchWrestler(createdWrestlerId);
        await tabMenu.navigateMain();

        var wrestler = await mainPage.getFirstWrestlerFromList();

        expect(wrestler.id).toEqual(createdWrestlerId);
        expect(wrestler.fullName).toEqual(currentFullName);
    });

    it('Wrestler should have proper info', async function() {

        await verifyWrestlerInfo(createdWrestlerId);      
    });

    describe('And update wrestler info', function() {

        beforeAll(async function() {
            await tabMenu.navigateMain();
            await updateWrestler(createdWrestlerId);
        });

        it('Wrestler info should be updated', async function() {
        
            await verifyWrestlerInfo(createdWrestlerId);      
        });

        describe('And delete wrestler', function() {

            beforeAll(async function() {
                await tabMenu.navigateMain();
                await deleteWrestler(createdWrestlerId);
            });
    
            it('Wrestler should be deleted', async function() {
            
                await mainPage.searchWrestler(createdWrestlerId);
                var numberOfRows = await mainPage.getNumberOfWrestlerRows();    
    
                expect(numberOfRows).toEqual(0);
            });
        });
    });
});