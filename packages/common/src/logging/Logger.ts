import { DateTZ } from '../datetime/DateTZ';
import { type ColorsText, colorsText } from './ColorsText';

const { CYAN, GREEN, MAGENTA, ORANGE, RED, RESET, YELLOW } = colorsText;

export const Logger = {
  log(color: ColorsText, category: string, ...message: any) {
    console.log(colorsText[color], `[${category}]`, YELLOW, timestamp(), RESET, ...message);
  },

  success(...message: any[]) {
    console.log(GREEN, '[SUCCESS]', YELLOW, timestamp(), RESET, ...message);
  },

  info(...message: any[]) {
    console.info(CYAN, '[INFO]', YELLOW, timestamp(), RESET, ...message);
  },

  warn(...message: any[]) {
    console.warn(ORANGE, '[WARN]', YELLOW, timestamp(), RESET, ...message);
  },

  error(...message: any[]) {
    console.error(RED, '[ERROR]', YELLOW, timestamp(), RESET, ...message);
  },

  debug(...message: any[]) {
    console.debug(MAGENTA, '[DEBUG]', YELLOW, timestamp(), RESET, ...message);
  },
};

function timestamp() {
  return DateTZ().format('hh:mm:ss A CST');
}
