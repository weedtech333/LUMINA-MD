

export default async function react(client, message){

    const sleep = ms => new Promise(r => setTimeout(r, ms))

    const remoteJid = message?.key.remoteJid;

    await client.sendMessage(remoteJid, 

        {
            react: {
                text: '🎯',

                key: message.key
            }
        }

    )

    await sleep(1000)

    await client.sendMessage(remoteJid, 

        {
            react: {
                text: '⚡',

                key: message.key
            }
        }

    )
    await sleep(1000)

     await client.sendMessage(remoteJid, {
     react: { remove: true,
     key: message.key }
  })

}