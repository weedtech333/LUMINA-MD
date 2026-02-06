import stylizedChar from "../utils/fancy.js";
async function sender(message, client, texts) {

    const remoteJid = message?.key?.remoteJid;

    try {
        await client.sendMessage(remoteJid, {

            text: stylizedChar(`> _*${texts}*_`),
    
        });
    } catch (e) {
        console.log(e)
        return;
    }

   
}

//18494869204@s.whatsapp.net

export default sender;
