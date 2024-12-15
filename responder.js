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

    console.log(`TEXT MESSAGE от ${userId} в чате ${chatId}: ${userMessage}`);

    rl.question(`Ответ для ${userId}: `, (answer) => {
        bot.telegram.sendMessage(chatId, answer);
    });
});

bot.on('sticker', (ctx) => {
    const stickerId = ctx.message.sticker.file_id;
    const userId = ctx.message.from.id;
    const chatId = ctx.message.chat.id;

    console.log(`STIKER от ${userId} в чате ${chatId}: ${stickerId}`);

    bot.telegram.sendSticker(ownerId, stickerId);
});

bot.on('photo', (ctx) => {
    const photoId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
    const userId = ctx.message.from.id;
    const chatId = ctx.message.chat.id;

    console.log(`PHOTO от ${userId} в чате ${chatId}: ${photoId}`);

    bot.telegram.sendPhoto(ownerId, photoId);
});

bot.on('animation', (ctx) => {
    const gifId = ctx.message.animation.file_id;
    const userId = ctx.message.from.id;
    const chatId = ctx.message.chat.id;

    console.log(`GIF от ${userId} в чате ${chatId}: ${gifId}`);

    bot.telegram.sendAnimation(ownerId, gifId);
});

bot.launch()
    .then(() => {
        console.log('Включен.');
    })
    .catch((error) => {
        console.error('Ошибка.:', error);
    });

process.once('SIGINT', () => {
    bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
    bot.stop('SIGTERM');
});
