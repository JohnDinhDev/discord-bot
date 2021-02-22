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
}
