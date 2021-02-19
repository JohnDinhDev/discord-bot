import Discord, { TextChannel } from 'discord.js'

// Definitions
import { Msg } from './definitions/interfaces/'

// Controllers
import Commands from './controllers/Commands'

// Views
require('dotenv').config()

const client = new Discord.Client()

client.on('ready', () => {
  // Creates tables in database
  console.log(`Logged in as ${client.user?.tag}`)
})

client.on('message', async (msg: Msg) => {
  // if message does not start with '!ht dev'
  // if message is from the bot
  if (!msg.content.startsWith(process.env.DISCORD_PREFIX! + 'dev') && msg.author.bot) { return }

  // Set UserId for Database Instance

  // Parses message content into a command and runs that command
  new Commands(msg)
})

client.login(process.env.DISCORD_TOKEN)
