import Discord from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Bot is running');
    client.user.setActivity('-help', { type: 'ENGAGEMENT' }).catch(console.error);
});

client.on('message', (message) => {
    if (client.user.id === message.author.id) return;
   
    const userTag = `<@${message.member.id}>`

    const args = message.content.split(' ');
    const extraArgs = args.splice(1);

    if (args[0] === '~generate') {
        if (extraArgs.length === 0) {
            message.channel.send(`${userTag} **ERROR: NO TEXT PROVIDED**`);
            return;
        }

        const qrCodeEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Generated QR Code')
            .addFields(
                {
                    name: 'Requested By',
                    value: userTag
                },
                {
                    name: 'Encoded Text',
                    value: extraArgs.join(' ')
                },
                {
                    name: 'URL',
                    value: `https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=${extraArgs.join('+')}`
                }
                
            )
            .setImage(`https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=${extraArgs.join('+')}`)
            .setTimestamp();

        message.channel.send(qrCodeEmbed);
    }
});

client.login(process.env.BOT_TOKEN);

// let statuses = [
//     'ɪɴɢʏᴇɴ',
//     'ʟᴜᴀ ᴇxᴇᴄᴜᴛᴏʀ',
//     'ᴍᴏᴅ ᴍᴇɴᴜ'
// ]
// let status = statuses[Math.floor(Math.random() * statuses.length)]

// setInterval(() => {
//     client.user.setActivity(status, { type: 'Listening to ~generate' });
// }, 5000)
