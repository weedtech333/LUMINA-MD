import configmanager from '../utils/configmanager.js'

export async function autorecord(client, message) {
    try {
        const remoteJid = message.key.remoteJid
        const number = client.user.id.split(':')[0]
        
        if (!configmanager.config.users[number]) return
        if (!configmanager.config.users[number].record) return
        
        await client.sendPresenceUpdate('recording', remoteJid)
        
        setTimeout(async () => {
            await client.sendPresenceUpdate('available', remoteJid)
        }, 3000)
        
    } catch (error) {
        console.error('Autorecord error:', error)
    }
}

export async function autotype(client, message) {
    try {
        const remoteJid = message.key.remoteJid
        const number = client.user.id.split(':')[0]
        
        if (!configmanager.config.users[number]) return
        if (!configmanager.config.users[number].type) return
        
        await client.sendPresenceUpdate('composing', remoteJid)
        
        setTimeout(async () => {
            await client.sendPresenceUpdate('available', remoteJid)
        }, 3000)
        
    } catch (error) {
        console.error('Autotype error:', error)
    }
}

export default { autorecord, autotype }
