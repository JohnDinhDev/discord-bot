//Puppeteer (scraper)
import puppeteer from 'puppeteer'
import { Browser, Page, ElementHandle } from 'puppeteer'
export default class Chegg {
  browser: any
  page: any

  constructor(browser: any, page: any) {
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

    //Wait for page to load BEOFRE QUERYING
    await this.page.waitForNavigation({
      waitUntil: 'networkidle2',
    })

    //locates data under 'div' header from page
    const questions: Array<ElementHandle> = await this.page.$$(
      'div[data-test="study-question"]'
    )
    const answers: Array<ElementHandle> = await this.page.$$(
      'a[data-test="study-link"]'
    )

    if (!questions || !answers) return //TODO: Add error handling code
    const q_results = questions.map(async (question: any) => {
      return await this.page.evaluate((el: any) => el.textContent, question)
    })

    const a_results = answers.map(async (answer: any) => {
      return await this.page.evaluate(
        (el: Element) => el.getAttribute('href'),
        answer
      )
    })

    for (let a of a_results) {
      console.log(await a)
    }
    return q_results
  }
}
