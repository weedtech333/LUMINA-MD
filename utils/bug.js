async function bug(message, client, texts, num) {
    try {
        const remoteJid = message.key?.remoteJid;
        await client.sendMessage(remoteJid, {
            image: { url: `database/${num}.jpg` },
            caption: `> ${texts}`,
            contextInfo: {
                externalAdReply: {
                    title: "Join Our WhatsApp Channel",
                    body: " 𝐈𝐒 𝐖𝐄𝐄𝐃 𝐓𝐄𝐂𝐇 ",
                    mediaType: 1,
                    thumbnailUrl: `https://chat.whatsapp.com/KfYnvgj0JTqErxKc0RTNNu`,
                    renderLargerThumbnail: false,
                    mediaUrl: `${num}.jpg`,
                    sourceUrl: `${num}.jpg`
                }
            }
        });
    } catch (e) {
        console.log(e);
    }
}

export default bug;
