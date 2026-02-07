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
        await client.sendMessage(remoteJid, {
            text: stylizedChar("❌ Fournis un titre de musique.\nEx: play calm down")
        }, { quoted: message })
        return
    }

    try {
        await client.sendMessage(remoteJid, {
            text: stylizedChar(`🔎 Recherche : ${query}`)
        }, { quoted: message })

        // 🔍 SEARCH API
        const searchUrl = `https://apis.davidcyriltech.my.id/play?query=${encodeURIComponent(query)}`
        const { data } = await axios.get(searchUrl, { timeout: 15000 })

        if (!data?.status || !data?.result) {
            throw new Error("Aucun résultat trouvé")
        }

        const video = data.result
        const videoUrl = video.url || video.download_url

        if (!videoUrl) {
            throw new Error("URL vidéo invalide")
        }

        // 🎧 AUDIO API
        const audioUrl = `https://youtubeabdlpro.abrahamdw882.workers.dev/?url=${encodeURIComponent(videoUrl)}`

        const thumbnail =
            video.thumbnail ||
            "https://i.imgur.com/4M34hi2.png"

        // 🖼️ INFO MESSAGE
        await client.sendMessage(remoteJid, {
            image: { url: thumbnail },
            caption:
                `🎵 *${video.title || "Titre inconnu"}*\n` +
                `⏱️ ${video.duration || "Inconnu"}\n` +
                `👁️ ${video.views || "Inconnu"} vues\n\n` +
                `© Digital Crew 243`
        }, { quoted: message })

        // 🎶 AUDIO SEND
        await client.sendMessage(remoteJid, {
            audio: { url: audioUrl },
            mimetype: "audio/mpeg",
            ptt: false
        }, { quoted: message })

        console.log("✅ MUSIC SENT :", video.title)

    } catch (err) {
        console.error("❌ PLAY ERROR :", err.message)

        await client.sendMessage(remoteJid, {
            text: stylizedChar(
                "❌ Impossible de télécharger la musique.\n" +
                "⏳ Réessaie avec un autre titre."
            )
        }, { quoted: message })
    }
}

export default play
