
import stylizedChar from "../utils/fancy.js"
import axios from "axios"

export async function play(message, client) {
    const remoteJid = message.key.remoteJid

    const rawText =
        message.message?.conversation ||
        message.message?.extendedTextMessage?.text ||
        ""

    const query = rawText.split(/\s+/).slice(1).join(" ").trim()

    if (!query) {
        return client.sendMessage(
            remoteJid,
            { text: stylizedChar("❌ Fournis un titre.\nEx: play calm down") },
            { quoted: message }
        )
    }

    try {
        await client.sendMessage(
            remoteJid,
            { text: stylizedChar(`🔎 Recherche : ${query}`) },
            { quoted: message }
        )

        // 🔍 SEARCH
        const search = await axios.get(
            `https://apis.davidcyriltech.my.id/play?query=${encodeURIComponent(query)}`,
            { timeout: 15000 }
        )

        if (!search.data?.status || !search.data?.result) {
            throw new Error("Aucun résultat")
        }

        const video = search.data.result
        const videoUrl = video.url || video.download_url
        if (!videoUrl) throw new Error("URL invalide")

        // 🖼️ INFO
        await client.sendMessage(remoteJid, {
            image: { url: video.thumbnail },
            caption:
                `🎵 *${video.title}*\n` +
                `⏱️ ${video.duration}\n` +
                `👁️ ${video.views} vues`
        }, { quoted: message })

        // 🎧 AUDIO DOWNLOAD (BUFFER)
        const audioRes = await axios.get(
            `https://youtubeabdlpro.abrahamdw882.workers.dev/?url=${encodeURIComponent(videoUrl)}`,
            {
                responseType: "arraybuffer",
                timeout: 30000
            }
        )

        await client.sendMessage(
            remoteJid,
            {
                audio: Buffer.from(audioRes.data),
                mimetype: "audio/mpeg"
            },
            { quoted: message }
        )

        console.log("✅ PLAY OK :", video.title)

    } catch (err) {
        console.error("❌ PLAY ERROR :", err)

        await client.sendMessage(
            remoteJid,
            {
                text: stylizedChar(
                    "❌ Téléchargement échoué.\n" +
                    "🔁 Réessaie avec un autre titre."
                )
            },
            { quoted: message }
        )
    }
}

export default play
