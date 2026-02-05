
import configmanager from '../utils/configmanager.js';

import bug from '../commands/bug.js'

export async function auto(client, message, cond, emoji){

    const remoteJid = message.key.remoteJid;

    if(cond){

        await client.sendMessage(remoteJid, 

            {
                react: {
                    text: `${emoji}`,

                    key: message.key
                }
            }
    )

    } else {

        return
    }
}

// Simple emoji regex (works for most cases)
function isEmoji(str) {

    const emojiRegex = /^(?:\p{Emoji_Presentation}|\p{Extended_Pictographic})$/u;

    return emojiRegex.test(str);
}

export async function autoreact(client, message) {

    const number = client.user.id.split(':')[0];

    try {

        const remoteJid = message.key?.remoteJid;

        if (!remoteJid) {

            throw new Error("Message JID is undefined.");
        }

        const messageBody =

            message.message?.extendedTextMessage?.text ||

            message.message?.conversation ||

            '';

        const commandAndArgs = messageBody.slice(1).trim();

        const parts = commandAndArgs.split(/\s+/);

        const args = parts.slice(1);

        if (args.length === 0) {

            throw new Error("Please provide 'on', 'off'.");
        }

        const input = args[0].toLowerCase();

        if (!configmanager.config.users[number]) {

            configmanager.config.users[number] = {};
        }

        const userConfig = configmanager.config.users[number];

        if (input === 'on') {

            userConfig.autoreact = true;

            configmanager.save();

            await bug(

                message,

                client,

                `L'Auto-react est activé *${input.toUpperCase()}*.`,
                3
            );
        
        } else if (input === "off"){

             userConfig.autoreact = false;

            configmanager.save();

            await bug(

                message,

                client,

                `L'Auto-react est désactivée *${input.toUpperCase()}*.`,
                3
            );

        } else{

            await client.sendMessage(remoteJid, { text: "_*Select an option: On/off*_" });
        }

    } catch (error) {

        await client.sendMessage(message.key.remoteJid, {

            text: `❌ Error while updating autoreact settings: ${error.message}`,
        });
    }
}

export default { auto, autoreact };