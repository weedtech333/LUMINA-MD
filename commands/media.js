import fs from 'fs'
import { downloadMediaMessage } from 'baileys'

export async function photo(client, message) {
    try {
        const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage
        const target = quoted?.stickerMessage
        
        if (!target) {
            return await client.sendMessage(message.key.remoteJid, {
                text: '📸 *Digital Crew 243*\n\nRépondez à un sticker pour le convertir en image.\n\nUsage: .photo (réponse à un sticker)'
            })
        }

        const buffer = await downloadMediaMessage({ message: quoted }, "buffer")
        const filename = `./temp/sticker-${Date.now()}.png`

        if (!fs.existsSync('./temp')) fs.mkdirSync('./temp')
        fs.writeFileSync(filename, buffer)

        await client.sendMessage(message.key.remoteJid, {
            image: fs.readFileSync(filename),
            caption: '✨ Digital Crew 243'
        })

        fs.unlinkSync(filename)

    } catch (e) {
        console.log(e)
        await client.sendMessage(message.key.remoteJid, {
            text: '❌ Erreur de conversion.'
        })
    }
}

export async function tomp3(client, message) {
    try {
        const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage
        const target = quoted?.videoMessage
        
        if (!target) {
            return await client.sendMessage(message.key.remoteJid, {
                text: '🎵 *Digital Crew 243*\n\nRépondez à une vidéo pour extraire l\'audio.\n\nUsage: .toaudio (réponse à une vidéo)'
            })
        }

        const buffer = await downloadMediaMessage({ message: quoted }, "buffer")
        const inputPath = `./temp/video-${Date.now()}.mp4`
        const outputPath = `./temp/audio-${Date.now()}.mp3`

        if (!fs.existsSync('./temp')) fs.mkdirSync('./temp')
        fs.writeFileSync(inputPath, buffer)

        const { exec } = await import('child_process')
        await new Promise((resolve, reject) => {
            exec(`ffmpeg -i ${inputPath} -vn -ab 128k -ar 44100 -y ${outputPath}`, (err) => {
                if (err) return reject(err)
                resolve()
            })
        })

        await client.sendMessage(message.key.remoteJid, {
            audio: fs.readFileSync(outputPath),
            mimetype: 'audio/mp4',
            ptt: false
        })

        fs.unlinkSync(inputPath)
        fs.unlinkSync(outputPath)

    } catch (e) {
        console.log(e)
        await client.sendMessage(message.key.remoteJid, {
            text: '❌ Erreur de conversion audio.'
        })
    }
}

export default { photo, tomp3 }