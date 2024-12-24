const { Telegraf } = require('telegraf');
const bot = new Telegraf('');
const readline = require('readline');
const ownerId = '';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

bot.on('text', (ctx) => {
    const userMessage = ctx.message.text;
    const userId = ctx.message.from.id;
    const chatId = ctx.message.chat.id;

    console.log(`TEXT MESSAGE from ${userId} in chat ${chatId}: ${userMessage}`);

    rl.question(`Reply to ${userId}: `, (answer) => {
        bot.telegram.sendMessage(chatId, answer);
    });
});

bot.on('sticker', (ctx) => {
    const stickerId = ctx.message.sticker.file_id;
    const userId = ctx.message.from.id;
    const chatId = ctx.message.chat.id;

    console.log(`STICKER from ${userId} in chat ${chatId}: ${stickerId}`);

    bot.telegram.sendSticker(ownerId, stickerId);
});

bot.on('photo', (ctx) => {
    const photoId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
    const userId = ctx.message.from.id;
    const chatId = ctx.message.chat.id;

    console.log(`PHOTO from ${userId} in chat ${chatId}: ${photoId}`);

    bot.telegram.sendPhoto(ownerId, photoId);
});

bot.on('animation', (ctx) => {
    const gifId = ctx.message.animation.file_id;
    const userId = ctx.message.from.id;
    const chatId = ctx.message.chat.id;

    console.log(`GIF from ${userId} in chat ${chatId}: ${gifId}`);

    bot.telegram.sendAnimation(ownerId, gifId);
});

bot.launch()
    .then(() => {
        console.log('Online.');
    })
    .catch((error) => {
        console.error('Error:', error);
    });

process.once('SIGINT', () => {
    bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
    bot.stop('SIGTERM');
});
