
//Puppeteer (scraper)
import puppeteer from 'puppeteer'
export default class Chegg {
    search = async (searchStr: string) => {
      // launch physical browser
      const browser = await puppeteer.launch({
        headless: false
      })



      // open a new tab in phyical browser
      const page = await browser.newPage()


      // intercept page request and insert 'human like' headers
      await page.setRequestInterception(true)


      page.on('request', (request) => {
        // Do nothing in case of non-navigation requests.
        if (!request.isNavigationRequest()) {
          request.continue()
          return
        }

        // Add a new header for navigation request
        const headers = request.headers()
        headers['User-Agent'] =
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36'
        request.continue({ headers })
      })

      // go to chegg's website
      await page.goto(
        'https://www.chegg.com/homework-help/questions-and-answers',
        {
          waitUntil: 'networkidle2'
        }
      )

      // timout for 3 seconds
      await page.waitForTimeout(3000)

      // find an input element on the page with the name "homeworkhelp_search"
      await page.$eval(
        'input[name=homeworkhelp_search]',
        // after it finds this element, enter 'hello world' into the search bar
        // @ts-ignore
        (el) => (el.value = 'hello world')
      )

      // clicks the search button to submit the search
      await page.click('a[title="autosuggest search button"]')

      // waits 3 seconds again for page to load
      await page.waitForTimeout(3000)

      // TODO: get the question text

      await browser.close()
    };
}
