const fs = require('fs');
const path = require('path');
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { NewMessage } = require('telegram/events');
const input = require('input');
const { status } = require('minecraft-server-util');
const apiId = ;
const apiHash = '';
const sessionFilePath = path.join(process.env.HOME, '/ /', '/ /');
// const sessionFilePath = path.join(process.env.HOME, 'telegram', 'session.txt'); //

let stringSession;
try {
    stringSession = new StringSession(fs.readFileSync(sessionFilePath, 'utf8'));
} catch (error) {
    stringSession = new StringSession('');
}

const myUserId = '';
const allowedUserIds = [''];
const serverAddress = '';
const serverPort = 25565;

(async () => {
    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
    });

    console.log('Connecting . .');
    await client.start({
        phoneNumber: async () => await input.text('Number >> '),
        password: async () => await input.text('Password >> '),
        phoneCode: async () => await input.text('Code >> '),
        onError: (err) => console.log(err),
    });

    fs.writeFileSync(sessionFilePath, client.session.save(), 'utf8');

    client.addEventHandler(async (event) => {
        const message = event.message;
        const senderId = message.senderId.value.toString();

        console.log(`\x1b[36mID: \x1b[1m${senderId}\x1b[0m`);

        const userMessage = message.message.trim();

        if (allowedUserIds.includes(senderId) || senderId === myUserId) {
            if (userMessage === '!online') {
                try {
                    const response = await status(serverAddress, serverPort);
                    const onlineMessage = `Online >> ${response.players.online} / ${response.players.max}`;

                    await client.sendMessage(message.chatId, { message: onlineMessage });
                } catch (error) {
                    await client.sendMessage(message.chatId, { message: 'Unreachable' });
                }
            }
        }
    }, new NewMessage({}));

})();
