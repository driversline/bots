const fs = require('fs');
const path = require('path');
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { NewMessage } = require('telegram/events');
const input = require('input');
const apiId = ;
const apiHash = '';
const sessionFilePath = path.join(process.env.HOME, '/ / dir / /', '/ / file / /');

let stringSession;
try {
    stringSession = new StringSession(fs.readFileSync(sessionFilePath, 'utf8'));
} catch (error) {
    stringSession = new StringSession('');
}

const myUserId = '';
const allowedUserIds = [''];

(async () => {
    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
    });

    console.log('');
    await client.start({
        phoneNumber: async () => await input.text('Number: '),
        password: async () => await input.text('Password: '),
        phoneCode: async () => await input.text('Code: '),
        onError: (err) => console.log(err),
    });

    fs.writeFileSync(sessionFilePath, client.session.save(), 'utf8');

    client.addEventHandler(async (event) => {
        const message = event.message;
        const senderId = message.senderId.value.toString();

        console.log(`\x1b[36mID: \x1b[1m${senderId}\x1b[0m`);

        const userMessage = message.message.trim();
      
        if (allowedUserIds.includes(senderId) || senderId === myUserId) {

        }
    }, new NewMessage({}));

})();
