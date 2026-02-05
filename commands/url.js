import axios from 'axios'
import { downloadMediaMessage } from 'baileys'
import { fileTypeFromBuffer } from 'file-type'
import FormData from 'form-data'
import stylizedChar from '../utils/fancy.js'

async function uploadToCatbox(buffer, fileName) {
    const form = new FormData()
    form.append('reqtype', 'fileupload')
    form.append('fileToUpload', buffer, fileName)

    const res = await axios.post(
        'https://catbox.moe/user/api.php',
        form,
        { headers: form.getHeaders() }
    )

    return res.data.trim()
}

async function url(client, message) {
    const jid = message.key.remoteJid
    const ctx = message.message?.extendedTextMessage?.contextInfo

    if (!ctx?.quotedMessage) {
        return client.sendMessage(jid, {
            text: 'Reply to an image, video, audio or document.'
        })
    }

    let mediaMessage = null
    let ext = 'bin'

    if (ctx.quotedMessage.imageMessage) {
        mediaMessage = { imageMessage: ctx.quotedMessage.imageMessage }
        ext = 'jpg'
    } else if (ctx.quotedMessage.videoMessage) {
        mediaMessage = { videoMessage: ctx.quotedMessage.videoMessage }
        ext = 'mp4'
    } else if (ctx.quotedMessage.audioMessage) {
        mediaMessage = { audioMessage: ctx.quotedMessage.audioMessage }
        ext = 'mp3'
    } else if (ctx.quotedMessage.documentMessage) {
        mediaMessage = { documentMessage: ctx.quotedMessage.documentMessage }
        ext = ctx.quotedMessage.documentMessage.fileName?.split('.').pop() || 'bin'
    } else {
        return client.sendMessage(jid, { text: 'Unsupported media.' })
    }

    await client.sendMessage(jid, { text: 'Uploading…' })

    const buffer = await downloadMediaMessage(
        {
            key: {
                remoteJid: jid,
                id: ctx.stanzaId,
                fromMe: false
            },
            message: mediaMessage
        },
        'buffer'
    )

    const type = await fileTypeFromBuffer(buffer)
    if (type?.ext) ext = type.ext

    const fileName = `file_${Date.now()}.${ext}`
    const link = await uploadToCatbox(buffer, fileName)

    await client.sendMessage(jid, { text: link })
}

export default url