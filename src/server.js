// const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

const token = '1770979291:AAFySn9NUzrrT6M56bFoJRuNdxy-pJLD__0';

const AvdeevParserBot = new TelegramBot(token, {
    polling: true
});

/**
 * Обработка входящего сообщения боту
 */
const processingMessage = message => {
    const lowerText = message.text.toLocaleLowerCase();
    const chatId = message.chat.id;
    
    return {
        lowerText,
        chatId,
    };
}

/**
 * Оборачиваем обработку результатов в try catch для обработки гарантированного ответа
 */
const tryCatcher = (onMessage, message) => {
    const { chatId } = processingMessage(message);

    try {
        onMessage(message);
    } catch (e) {
        AvdeevParserBot.sendMessage(chatId, 'Произошла ошибка и где-то плачет один котик..');
    }
};

/**
 * Подписываемся на получение новых сообщений от пользователей
 */
const onGetMessage = async function (message) {
    const { lowerText, chatId } = processingMessage(message);

    switch (lowerText) {
        case '/help':
        default:
            AvdeevParserBot.sendMessage(chatId, 'hello');
            break;
    }
};

AvdeevParserBot.on('message', message => {
    tryCatcher(onGetMessage, message);
});

