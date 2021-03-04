import Text from './Text'
import { Commands } from '../definitions/enums'
import { Keyable } from '../definitions/interfaces'
import { generateLineBreaks } from '../utils'
export default class Embed {
    public static generic = (
      color: string | number,
      title: string,
      description: string
    ) => {
      return {
        embed: {
          color,
          title,
          description
        }
      }
    };

    public static pinnedMessage = () => {
      const [title, description] = Text.pinnedMessage()

      return {
        embed: {
          color: 0x3f66ff,
          title,
          description
        }
      }
    };

    public static help = () => {
      const message = []

      for (const command of Object.keys(Commands)) {
        message.push(
                `\`${process.env.DISCORD_PREFIX + command + ' '}\` - ${
                    (Commands as Keyable)[command]
                }`
        )
      }

      return {
        embed: {
          color: 0xff7f50,
          title: 'Help',
          fields: [
            {
              name: 'Commands',
              value: generateLineBreaks(message, false, 2),
              inline: false
            }
          ]
        }
      }
    };
}
