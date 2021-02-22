import Discord, { TextChannel } from "discord.js";

import puppeteer from "puppeteer";

// Definitions
import { Msg } from "./definitions/interfaces/";

// Controllers
import Commands from "./controllers/Commands";

//Chegg
import Chegg from "./controllers/Chegg";

// Views
require("dotenv").config();

//---RUNS SOURCE CODE OF BOT---
const Cheggie = async () => {
    const client = new Discord.Client();
    const browser = await puppeteer.launch({
        headless: process.env.HEADLESS === "TRUE",
    });
    //get new page from browser
    const page = await browser.newPage();

    const chegg = new Chegg(browser, page);

    client.on("ready", () => {
        // Creates tables in database
        console.log(`Logged in as ${client.user?.tag}`);
    });

    client.on("message", async (msg: Msg) => {
        // if message does not start with '!ht dev'
        // if message is from the bot
        if (
            !msg.content.startsWith(process.env.DISCORD_PREFIX! + "dev") &&
            msg.author.bot
        ) {
            return;
        }

        // Set UserId for Database Instance

        // Parses message content into a command and runs that command
        new Commands(msg, chegg);
    });

    client.login(process.env.DISCORD_TOKEN);
};

//Run it
Cheggie();
