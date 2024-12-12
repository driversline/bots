const { Telegraf } = require('telegraf');

// Замените 'YOUR_BOT_TOKEN' на токен вашего бота
const bot = new Telegraf('токен');

const readline = require('readline');

// ID вашего Telegram-аккаунта (вы можете получить его, отправив сообщение боту и посмотрев в консоли)
const ownerId = ''; // Замените на ваш ID

// Создаем интерфейс для чтения из консоли
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Обработчик текстовых сообщений
bot.on('text', (ctx) => {
    const userMessage = ctx.message.text; // Получаем текст сообщения
    const userId = ctx.message.from.id; // Получаем ID пользователя
    const chatId = ctx.message.chat.id; // Получаем ID чата

    console.log(`Получено текстовое сообщение от пользователя ${userId} в чате ${chatId}: ${userMessage}`);

    rl.question(`Введите ответ для пользователя ${userId}: `, (answer) => {
        bot.telegram.sendMessage(chatId, answer);
    });
});

// Обработчик стикеров
bot.on('sticker', (ctx) => {
    const stickerId = ctx.message.sticker.file_id; // Получаем ID стикера
    const userId = ctx.message.from.id; // Получаем ID пользователя
    const chatId = ctx.message.chat.id; // Получаем ID чата

    console.log(`Получен стикер от пользователя ${userId} в чате ${chatId}: ${stickerId}`);

    // Пересылаем стикер владельцу
    bot.telegram.sendSticker(ownerId, stickerId);
});

// Обработчик фотографий
bot.on('photo', (ctx) => {
    const photoId = ctx.message.photo[ctx.message.photo.length - 1].file_id; // Получаем ID фотографии
    const userId = ctx.message.from.id; // Получаем ID пользователя
    const chatId = ctx.message.chat.id; // Получаем ID чата

    console.log(`Получена фотография от пользователя ${userId} в чате ${chatId}: ${photoId}`);

    // Пересылаем фотографию владельцу
    bot.telegram.sendPhoto(ownerId, photoId);
});

// Обработчик GIF
bot.on('animation', (ctx) => {
    const gifId = ctx.message.animation.file_id; // Получаем ID GIF
    const userId = ctx.message.from.id; // Получаем ID пользователя
    const chatId = ctx.message.chat.id; // Получаем ID чата

    console.log(`Получен GIF от пользователя ${userId} в чате ${chatId}: ${gifId}`);

    // Пересылаем GIF владельцу
    bot.telegram.sendAnimation(ownerId, gifId);
});

// Запуск бота
bot.launch()
    .then(() => {
        console.log('Бот запущен');
    })
    .catch((error) => {
        console.error('Ошибка при запуске бота:', error);
    });

// Обработка ошибок
process.once('SIGINT', () => {
    bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
    bot.stop('SIGTERM');
});
