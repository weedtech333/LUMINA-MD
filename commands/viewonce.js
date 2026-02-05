import { DigixNew } from '../utils/DigixNew.js';
import { downloadMediaMessage } from 'baileys';
import fs from 'fs';
import path from 'path';
import stylizedChar from '../utils/fancy.js';

export async function viewonce(client, message) {
    const remoteJid = message.key.remoteJid;
    const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quotedMessage?.imageMessage?.viewOnce && !quotedMessage?.videoMessage?.viewOnce && !quotedMessage?.audioMessage?.viewOnce) {
        await client.sendMessage(remoteJid, stylizedChar({ text: '_Reply to a valid ViewOnce message._' }));
        return;
    }

    const content = DigixNew(quotedMessage);

    function modifyViewOnce(obj) {
        if (typeof obj !== 'object' || obj === null) return;
        for (const key in obj) {
            if (key === 'viewOnce' && typeof obj[key] === 'boolean') {
                obj[key] = false;
            } else if (typeof obj[key] === 'object') {
                modifyViewOnce(obj[key]);
            }
        }
    }

    modifyViewOnce(content);

    try {
        if (content?.imageMessage) {
            const mediaBuffer = await downloadMediaMessage(
                { message: content },
                'buffer',
                {}
            );

            if (!mediaBuffer) {
                console.error('Failed to download media.');
                return await client.sendMessage(remoteJid, {
                    text: stylizedChar('_Failed to download the ViewOnce media. Please try again._'),
                });
            }

            const tempFilePath = path.resolve('./temp_view_once_image.jpeg');
            fs.writeFileSync(tempFilePath, mediaBuffer);

            await client.sendMessage(remoteJid, {
                image: { url: tempFilePath },
            });

            fs.unlinkSync(tempFilePath);

        } else if (content?.videoMessage) {
            const mediaBuffer = await downloadMediaMessage(
                { message: content },
                'buffer',
                {}
            );

            if (!mediaBuffer) {
                console.error('Failed to download media.');
                return await client.sendMessage(remoteJid, {
                    text: stylizedChar('_Failed to download the ViewOnce media. Please try again._'),
                });
            }

            const tempFilePath = path.resolve('./temp_view_once_image.mp4');
            fs.writeFileSync(tempFilePath, mediaBuffer);

            await client.sendMessage(remoteJid, {
                video: { url: tempFilePath },
            });

            fs.unlinkSync(tempFilePath);

        } else if (content?.audioMessage) {
            const mediaBuffer = await downloadMediaMessage(
                { message: content },
                'buffer',
                {}
            );

            if (!mediaBuffer) {
                console.error('Failed to download media.');
                return await client.sendMessage(remoteJid, {
                    text: stylizedChar('_Failed to download the ViewOnce media. Please try again._'),
                });
            }

            const tempFilePath = path.resolve('./temp_view_once_image.mp3');
            fs.writeFileSync(tempFilePath, mediaBuffer);

            await client.sendMessage(remoteJid, {
                audio: { url: tempFilePath },
            });

            fs.unlinkSync(tempFilePath);

        } else {
            console.error('No imageMessage found in the quoted message.');
            await client.sendMessage(remoteJid, {
                text: stylizedChar('_No valid imageMessage to modify and send._')
            });
        }
    } catch (error) {
        console.error('Error modifying and sending ViewOnce message:', error);
        await client.sendMessage(remoteJid, {
            text: stylizedChar('_An error occurred while processing the ViewOnce message._'),
        });
    }
}

export default viewonce;