import { DateTZ } from '../datetime/DateTZ';
import { type ColorsText, colorsText } from './ColorsText';

const { CYAN, GREEN, MAGENTA, ORANGE, RED, RESET, YELLOW } = colorsText;

type LogMessageContent = Array<string | Record<string, unknown>>;

export const Logger = {
  log(color: ColorsText, category: string, ...message: LogMessageContent) {
    console.log(colorsText[color], `[${category}]`, YELLOW, timestamp(), RESET, ...message);
  },

  success(...message: LogMessageContent) {
    console.log(GREEN, '[SUCCESS]', YELLOW, timestamp(), RESET, ...message);
  },

  info(...message: LogMessageContent) {
    console.info(CYAN, '[INFO]', YELLOW, timestamp(), RESET, ...message);
  },

  warn(...message: LogMessageContent) {
    console.warn(ORANGE, '[WARN]', YELLOW, timestamp(), RESET, ...message);
  },

  error(...message: LogMessageContent) {
    console.error(RED, '[ERROR]', YELLOW, timestamp(), RESET, ...message);
  },

  debug(...message: LogMessageContent) {
    console.debug(MAGENTA, '[DEBUG]', YELLOW, timestamp(), RESET, ...message);
  },
};

function timestamp() {
  return DateTZ().format('hh:mm:ss A CST');
}
