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

//2250712668494@s.whatsapp.net

export default sender;
