import Discord, { TextChannel } from 'discord.js'
import puppeteer from 'puppeteer'

// Definitions
import { Msg } from './definitions/interfaces/'

// Controllers
import Commands from './controllers/Commands'
import Chegg from './controllers/Chegg'

// Views
require('dotenv').config()

const client = new Discord.Client()

const Cheggie = async () => {
  const browser = await puppeteer.launch({
    headless: process.env.HEADLESS === 'TRUE',
  })

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
    // Header for Chrome on Windows
    // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36
    headers['User-Agent'] =
      // This is a header for Chrome on Linux
      process.env.USER_AGENT
    request.continue({ headers })
  })

  // go to chegg's website
  await page.goto('https://www.chegg.com/', {
    waitUntil: 'networkidle2',
  })

  //await page.goto('https://www.chegg.com/homework-help/questions-and-answers', {
  //waitUntil: 'networkidle2',
  //})

  const chegg = new Chegg(browser, page)

  client.on('ready', () => {
    // Creates tables in database
    console.log(`Logged in as ${client.user?.tag}`)
  })

  client.on('message', async (msg: Msg) => {
    // if message does not start with '!ht dev'
    // if message is from the bot
    if (
      !msg.content.startsWith(process.env.DISCORD_PREFIX! + 'dev') &&
      msg.author.bot
    ) {
      return
    }

    // Set UserId for Database Instance

    // Parses message content into a command and runs that command
    new Commands(msg, chegg)
  })

  client.login(process.env.DISCORD_TOKEN)
}

Cheggie()
