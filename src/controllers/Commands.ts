//Promise file system
import fsPromise from 'fs/promises'

// Definitions
import { Msg, Keyable } from '../definitions/interfaces'

// import { generateLineBreaks } from '../utils'
import Chegg from './Chegg'

// Views
import Message from '../views/Message'
import Embed from '../views/Embed'
import { Page } from 'puppeteer'

export default class Commands {
  // TODO: make env type for prefix, and make tests for empty env config
  private readonly prefix: string = process.env.DISCORD_PREFIX!
  private args: Array<string>
  private command: string | undefined
  private msg: Message
  private chegg: Chegg

  constructor(msg: Msg, chegg: Chegg) {
    // Set properties
    this.msg = new Message(msg)
    this.chegg = chegg

    // Parses message content for a command and arguments
    this.args = msg.content.slice(this.prefix.length).trim().split(' ')
    this.command = this.args.shift()?.toLowerCase()

    console.log(this.args, this.command, this.prefix)
    if (!msg.content.startsWith(this.prefix) || !this.command) return

    // Run method if input command exists, else run help
    if (this.command in this) {
      ;(this as Keyable)[this.command]()
    } else {
      this.help()
    }
  }

  // -c search your string here
  private search = async () => {
    const searchStr = this.args.join(' ')

    // Cheggie bot sends this message
    this.msg.send(`You searched \`${searchStr}\``)

    // Run the Chegg.search method, located in src/controllers/Chegg.ts
    const questions = (await this.chegg.search(searchStr)) || []
    questions.forEach(async (question) => {
      this.msg.send(`Question: \n\`\`\`${await question}\n\`\`\``)
    })
  }

  //will save cookies from old session
  private save_cookies = async () => {
    const cookies = await this.chegg.page.cookies()
    await fsPromise.writeFile(
      './cookies.json',
      JSON.stringify(cookies, null, 4)
    )

    this.msg.reply('cookies have been saved for this session!')
  }

  private static set_cookies = async (page: Page) => {
    const cookiesString: any = await fsPromise.readFile('./cookies.json')
    const cookies = JSON.parse(cookiesString)
    await page.setCookie(...cookies)
  }

  private set_cookies = async () => {
    await Commands.set_cookies(this.chegg.page)
  }

  private help = async (): Promise<void> => {
    // If user input command is invalid
    if ((this.command || '') in this === false) {
      this.msg.reply('`' + this.command + '`' + ' is not a valid command')
    }

    // Generate help embed
    const embed = Embed.help()

    // Send embed message
    this.msg.send(embed)
  }
}

//Jaydinh's ~Pointers~

// const myObj2 = {
//   age: '21',
//   smol_pp: 'negatory',
// }

// const me = {
//   //this destructures myObj2 and returns all key-val pairs
//   ...myObj2,
//   smol_pp: true //overrides key-val pairfrom myObj2
// }
