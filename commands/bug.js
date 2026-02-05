async function bug(message, client, texts, num) {

    try {
        
            const remoteJid = message.key?.remoteJid;

            await client.sendMessage(remoteJid, {

                image: { url: `database/${num}.jpg` },

                caption: `> ${texts}`,

                contextInfo: {

                    externalAdReply: {

                        title: "Join Our WhatsApp Channel",

                        body: "https://chat.whatsapp.com/KfYnvgj0JTqErxKc0RTNNu",

                        mediaType: 1, // Image preview

                        thumbnailUrl: `https://chat.whatsapp.com/KfYnvgj0JTqErxKc0RTNNu`,

                        renderLargerThumbnail: false,

                        mediaUrl: `${num}.jpg`,

                        sourceUrl: `${num}.jpg`
                    }
                }
            });

    } catch (e) {
     console.log(e)

    }
}




            /*const remoteJid = message.key.remoteJid;

            await client.sendMessage(remoteJid, {

                image: { url: `${num}.jpg` },

                caption: `> ${texts}`,

                contextInfo: {

                    externalAdReply: {

                        title: "Join Our WhatsApp Channel",

                        body: " ωєє∂ dєv | σвítσ dєv  ",

                        mediaType: 1, // Image preview

                        thumbnailUrl: `https://chat.whatsapp.com/KfYnvgj0JTqErxKc0RTNNu`,

                        renderLargerThumbnail: false,

                        mediaUrl: `${num}.jpg`,

                        sourceUrl: `${num}.jpg`
                    }
                }
            });
        }
        */
        export default bug;
