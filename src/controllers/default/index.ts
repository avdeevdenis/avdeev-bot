/**
 * Контроллер, отвечающий на запрос '/help'
 */
import processingMessage from '../../helpers/processing_message';
import sendResponse from '../../helpers/send_response';
import { IAvdeevBot } from '../../typings/IAvdeevBot';
import { IMessage } from '../../typings/IMessage';

const getAllCommands = () => ({
    '/spx_day': 'S&P 500 Index day overview.',
    '/spx_sectors_day': 'S&P 500 Index day by sectors overview',
    '/moex_day': 'MOEX Index day overview.',
    '/update_stock_screens': 'To update screenshots of market indexes.',
    '/get_random_cat': 'To get a random cat gif.',
    '/get_random_joke': 'To get a random joke image.',
    '/get_random_movie': 'To get a random movie.',
    '/what_holidays_is_today': 'What holiday is today?'
});

const NEW_LINE_SYMBOLS = '\n\n';

const getHelpStaticMessage = () => {
    let helpMessage = `List of possible commands:`;
    helpMessage += NEW_LINE_SYMBOLS;

    const allCommandsString = Object.entries(getAllCommands()).reduce((result, [command, description]) => {
        return result += command + ' - ' + description + NEW_LINE_SYMBOLS;
    }, '');

    helpMessage += allCommandsString;

    return helpMessage;
};

const controllerDefault = async (message: IMessage, AvdeevBot: IAvdeevBot) => {
    const { chatId, username } = processingMessage(message);

    const helpStaticMessage = getHelpStaticMessage();

    sendResponse({
        AvdeevBot,
        chatId,
        username,
        data: helpStaticMessage,
    });
};

export default controllerDefault;
