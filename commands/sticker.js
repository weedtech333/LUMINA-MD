import pkg from 'wa-sticker-formatter';
const { Sticker, StickerTypes } = pkg;
import { downloadMediaMessage } from "baileys";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import sharp from "sharp";
import ffmpeg from "fluent-ffmpeg";

export async function sticker(client, message) {
    let tempInput, tempOutput;

    try {
        const remoteJid = message.key.remoteJid;
        const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const username = message.pushName || "Inconnu"; // Nom de l'expéditeur

        if (!quotedMessage) {
            return client.sendMessage(remoteJid, { text: "❌ Respond to an image or video to convert it into a sticker!" });
        }

        // Détection du type de média
        const isVideo = !!quotedMessage.videoMessage;
        const isImage = !!quotedMessage.imageMessage;

        if (!isVideo && !isImage) {
            return client.sendMessage(remoteJid, { text: "❌ The quoted message is not an image or a video !" });
        }

        // Télécharger le média
        const mediaBuffer = await downloadMediaMessage({ message: quotedMessage, client }, "buffer");

        if (!mediaBuffer) {
            return client.sendMessage(remoteJid, { text: "❌ Media download failed !" });
        }

        // Générer des noms de fichiers temporaires uniques
        const uniqueId = Date.now();  // Utiliser l'heure actuelle pour rendre le nom unique
        tempInput = isVideo ? `./temp_video_${uniqueId}.mp4` : `./temp_image_${uniqueId}.jpg`;
        tempOutput = `./temp_sticker_${uniqueId}.webp`;

        fs.writeFileSync(tempInput, mediaBuffer);

        if (isVideo) {
            console.log("⚙️ Conversion to sticker...");

            await new Promise((resolve, reject) => {
                ffmpeg(tempInput)
                    .output(tempOutput)
                    .outputOptions([
                        "-vf scale=512:512:flags=lanczos",
                        "-c:v libwebp",
                        "-q:v 50",
                        "-preset default",
                        "-loop 0",
                        "-an",
                        "-vsync 0"
                    ])
                    .on("end", resolve)
                    .on("error", (err) => {
                        console.error("❌ Erreur FFmpeg :", err);
                        reject(err);
                    })
                    .run();
            });

        } else {
            console.log("⚙️ Conversion to sticker...");

            await sharp(tempInput)
                .resize(512, 512, { fit: "inside" })
                .webp({ quality: 80 })
                .toFile(tempOutput);
        }

        // Créer le sticker
        const sticker = new Sticker(tempOutput, {
            pack: `${username}`,
            author: `${username}`,
            type: isVideo ? StickerTypes.FULL : StickerTypes.DEFAULT, // Préserver les animations
            quality: 80,
            animated: isVideo,
        });

        // Convertir en format sticker
        const stickerMessage = await sticker.toMessage();

        // Envoyer le sticker
        await client.sendMessage(remoteJid, stickerMessage);

    } catch (error) {
        console.error("❌ Erreur :", error);
        const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
        await client.sendMessage(message.key.remoteJid, { text: `⚠️ Error converting media to sticker : ${errorMessage}` });
    } finally {
        // Nettoyage des fichiers temporaires
        if (tempInput && fs.existsSync(tempInput)) fs.unlinkSync(tempInput);
        if (tempOutput && fs.existsSync(tempOutput)) fs.unlinkSync(tempOutput);
    }
}

export default sticker;
