/**
 * Контроллер, отвечающий на запрос '/help'
 */
import { escapeString } from '../../helpers/escape_response_message';
import processingMessage from '../../helpers/processing_message';
import sendResponse from '../../helpers/send_response';
import { IAvdeevBot } from '../../typings/IAvdeevBot';
import { IMessage } from '../../typings/IMessage';

const allCommands = [{
    category: 'Entertainment',
    commands: [{
        command: '/random_cat',
        description: 'To get a random cat gif.',
    }, {
        command: '/random_joke',
        description: 'To get a random joke image.',
    }, {
        command: '/random_movie',
        description: 'To get a random movie.',
    }]
}, {
    category: 'Investing',
    commands: [{
        command: '/spx_day',
        description: 'S&P 500 Index day overview.',
    }, {
        command: '/spx_sectors_day',
        description: 'S&P 500 Index day by sectors overview.',
    }, {
        command: '/moex_day',
        description: 'MOEX Index day overview.',
    }, {
        command: '/update_stock_screens',
        description: 'To update screenshots of market indexes.'
    }]
}, {
    category: 'Calendar',
    commands: [{
        command: '/what_holidays_are_today',
        description: 'What holidays are today?'
    }]
}];

const NEW_LINE_SYMBOLS = '\n\n';

const cursive = text => '_' + text + '_';

const getHelpMessage = () => {
    let helpMessage = `*List of possible commands:*`;
    helpMessage += NEW_LINE_SYMBOLS;

    let allCommandsString = allCommands.map(({ category, commands }) => {
        let commandsString = commands.map(({ command, description }) => {
            return command + ' - ' + description + '\n';
        }).join('');

        commandsString = escapeString(commandsString);

        return cursive(category) + ':\n' + commandsString;
    }).join('\n');

    helpMessage += allCommandsString;

    return helpMessage;
};

const controllerDefault = async (message: IMessage, AvdeevBot: IAvdeevBot) => {
    const { chatId, username } = processingMessage(message);

    const helpStaticMessage = getHelpMessage();

    sendResponse({
        AvdeevBot,
        chatId,
        username,
        data: helpStaticMessage,
        options: {
            parse_mode: 'MarkdownV2'
        }
    });
};

export default controllerDefault;
