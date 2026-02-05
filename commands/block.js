
import sender from '../commands/sender.js';

async function block(client, message) {
    
    try {
            const remoteJid = message.key.remoteJid
            let target ; 
        
            if (message.message?.extendedTextMesssage?.contextInfo?.quotedMessage){
                target = message.message.extendedTextMessage.contextInfo.participant; 
            } else {
                const messageBody = message.message?.extendedTextMessage?.text || message.message?.conversation || '';
        
                const commandsAndArgs = messageBody.slice(1).trim(); // recupere la commande et l'arg

                const args = commandsAndArgs.split(/\s+/).slice(1); // enleve les espaces at start and end et prends args

                target = args + '@s.whatsapp.net';



            }
        
            if (!target){
        
                sender(message, client, '> _veuillez specifier un numero_ ')
        
                return;
            } else {
                await client.updateBlockStatus(remoteJid, 'block')
                console.log('contact blocked succesfully')
            }

    
    } catch (e){
        console.log('erreur:', e)
        sender(message, client, `error while testing: ${e}`)
    }

}

async function unblock(client, message){
    
    try {
        const remoteJid = message.key.remoteJid
        let target ; 
    
        if (message.message?.extendedTextMesssage?.contextInfo?.quotedMessage){
            target = message.message.extendedTextMessage.contextInfo.participant; 
        } else {
            const messageBody = message.message?.extendedTextMessage?.text || message.message?.conversation || '';
    
            const commandsAndArgs = messageBody.slice(1).trim(); // recupere la commande et l'arg

            const args = commandsAndArgs.split(/\s+/).slice(1); // enleve les espaces at start and end et prends args

            target = args + '@s.whatsapp.net';



        }
    
        if (!target){
    
            sender(message, client, '> _veuillez specifier un numero_ ')
    
            return;
        } else {
            await client.updateBlockStatus(remoteJid, 'unblock')
            console.log('contact unblocked succesfully')
        }


} catch (e){
    console.log('erreur:', e)
    sender(message, client, `error while testing: ${e}`)
}

}
export default {block, unblock};
