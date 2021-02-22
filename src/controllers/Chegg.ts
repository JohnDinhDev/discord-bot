<<<<<<< HEAD
//Puppeteer (scraper)
import puppeteer from "puppeteer";
export default class Chegg {
    browser: any;
    page: any;
    constructor(browser: any, page: any) {
        this.browser = browser;
        this.page = page;
    }
    search = async (/*searchStr: string*/) => {
        // intercept page request and insert 'human like' headers
        await this.page.setRequestInterception(true);

        this.page.on("request", (request: any) => {
            // Do nothing in case of non-navigation requests.
            if (!request.isNavigationRequest()) {
                request.continue();
                return;
            }

            // Add a new header for navigation request
            const headers = request.headers();
            headers["User-Agent"] = process.env.USER_AGENT;
            request.continue({ headers });
        });

        // go to chegg's website
        await this.page.goto(
            "https://www.chegg.com/homework-help/questions-and-answers",
            {
                waitUntil: "networkidle2",
            }
        );

        // timout for 3 seconds
        await this.page.waitForTimeout(3000);

        // find an input element on the page with the name "homeworkhelp_search"
        await this.page.$eval(
            "input[name=homeworkhelp_search]",
            // after it finds this element, enter 'hello world' into the search bar
            // @ts-ignore
            (el) => (el.value = "hello world")
        );

        // clicks the search button to submit the search
        await this.page.click('a[title="autosuggest search button"]');

        // waits 3 seconds again for page to load
        await this.page.waitForTimeout(3000);

        // TODO: get the question text

        //await this.browser.close();
    };
=======
import { Browser, Page, ElementHandle } from 'puppeteer'

export default class Chegg {
  browser: Browser
  page: Page

  constructor(browser: Browser, page: Page) {
    this.browser = browser
    this.page = page
  }

  static $ = async (
    page: Page,
    selectors: Array<string>
  ): Promise<ElementHandle | null> => {
    for (let selector of selectors) {
      const foundElement = await page.$(selector)
      if (foundElement) {
        return foundElement
      }
    }

    return null
  }

  $ = async (selectors: Array<string>) => {
    return Chegg.$(this.page, selectors)
  }

  static clearInputEl = async (inputEl: ElementHandle): Promise<void> => {
    await inputEl.click({ clickCount: 3 })
    await inputEl.press('Backspace')
  }

  clearInputEl = async (inputEl: ElementHandle) => {
    await Chegg.clearInputEl(inputEl)
  }

  search = async (searchStr: string) => {
    const searchBarElSelectors = [
      'input#chegg-searchbox',
      'input#autosuggest-input',
      'input#chegg-header-search',
    ]
    const searchSubmitElSelectors = [
      'a[title="autosuggest search button"]',
      'button[data-test="chegg-searchbox_submit_btn"]',
      'button[data-test="chegg-header-search_submit_btn"]',
    ]

    const searchBarEl = await this.$(searchBarElSelectors)
    const searchSubmitEl = await this.$(searchSubmitElSelectors)

    await this.clearInputEl(searchBarEl!)
    await searchBarEl?.type(searchStr, { delay: 100 })
    await searchSubmitEl?.click()

    await this.page.waitForNavigation({
      waitUntil: 'networkidle2',
    })

    const questions = await this.page.$$('div[data-test="study-question"]')
    if (!questions) return
    const results = questions.map(async (result) => {
      return await this.page.evaluate((el) => el.textContent, result)
    })

    return results
  }
>>>>>>> a219817f1bddee5978b4a07d9549c0b0cf4be64b
}
