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
}
