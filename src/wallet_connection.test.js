const { TIME } = require('../utils/config').default
import * as gFunc from "../utils/global_func"
import { sels } from "../utils/selectors"
import { init } from "../utils/testSetup"


let browser;
let metamask;
let gnosisPage;
let MMpage;

beforeAll(async ()=>{
    [browser, metamask, gnosisPage, MMpage] = await init()
}, TIME.T60)

afterAll(async () => {
    await gnosisPage.waitFor(2000)
    await browser.close();
})

describe("Wallet Connection", ()=>{
    test("Importing Account", async () => {
        console.log("Importing Account\n")
        await gFunc.importAccounts(metamask);
        await MMpage.waitFor(1000)
    }, TIME.T60)
    test("Navigating in Gnosis", async () => {
        console.log("Navigating in Gnosis\n")
        await gnosisPage.bringToFront()
        await gFunc.clickSomething(sels.xpSelectors.homepage.accept_cookies,gnosisPage)
        await gFunc.clickSomething(sels.xpSelectors.homepage.connect_btn,gnosisPage)
        await gFunc.clickSomething(sels.xpSelectors.homepage.metamask_option,gnosisPage)
    }, TIME.T15)
    test("Confirming in MetaMask", async () => {
        console.log("Confirming in MetaMask\n")
        await metamask.confirmTransaction();
    }, TIME.T15)
    test("Asserting Connection", async () => {
        console.log("Asserting Connection\n")
        await gnosisPage.bringToFront()  
        await gFunc.clickSomething(sels.xpSelectors.homepage.metamask_option,gnosisPage)
        await gFunc.assertTextPresent(sels.xpSelectors.homepage.loggedin_status, gnosisPage, sels.assertions.wallet_connection);
        try{
            await gFunc.closeIntercom(sels.cssSelectors.intercom_close_btn, gnosisPage)
        }catch(e){}
    }, TIME.T15)
})
