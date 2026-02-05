/*
export async function prem(client, message) {

    const remoteJid = message.key.remoteJid;

    const today = new Date();

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const currentDay = daysOfWeek[today.getDay()];

    const currentDate = today.getDate();

    const currentMonth = today.getMonth() + 1; 

    const currentYear = today.getFullYear();

    const owner = "꧁𝐑𝐞𝐝𝐢𝐱꧁𓂀꧂𝐊𝐚𝐫𝐚꧂ i ? ";

    const username = message.pushName || "Unknown";

    const prefix = configmanager.config.users[number]?.prefix || '!'; // Default prefix if not found
    

    const t = ` 
╭─────────────────╮
     REDIX-KARA XMD
╰─────────────────╯
╭─────────────────╮
│ ❏Prefix : ${prefix}  
│ ❏User : ${username}  
│ ❏Day : ${currentDay}
│ ❏Date : ${currentDate}/${currentMonth}/${currentYear} 
│ ❏Version : 3
│ ❏Plugins : 2
│ ❏Type : X-MD 
╰─────────────────╯

╭────[ PREMIUM CMDS ]─────╮
│      
│ 💎⬢ connect 221xxxxx
│ 💎⬢ reconnect 221xxxxx            
│ 💎⬢ disconnect 221xxxxx        
╰─────────────────╯        

made by ꧁𝐑𝐞𝐝𝐢𝐱꧁𓂀꧂𝐊𝐚𝐫𝐚꧂ 
    `
;

    await client.sendMessage(remoteJid, {

        image: { url: "database/menu1.jpg" },

        caption: t,

        contextInfo: {

            participant: '0@s.whatsapp.net',

            remoteJid: 'status@broadcast',

            quotedMessage: { conversation:"꧁𝐑𝐞𝐝𝐢𝐱꧁𓂀꧂𝐊𝐚𝐫𝐚꧂ "}, 

            isForwarded: true,
        },


    });
}   

export default prem;
*/