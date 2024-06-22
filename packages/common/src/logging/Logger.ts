import { DateTZ } from '../datetime/DateTZ';
import { type ColorsText, colorsText } from './ColorsText';

const { CYAN, GREEN, MAGENTA, ORANGE, RED, RESET, YELLOW } = colorsText;

export class Logger {
  static log(color: ColorsText, category: string, ...message: any) {
    console.log(colorsText[color], `[${category}]`, YELLOW, timestamp(), RESET, ...message);
  }

  static success(...message: any[]) {
    console.log(GREEN, '[SUCCESS]', YELLOW, timestamp(), RESET, ...message);
  }

  static info(...message: any[]) {
    console.info(CYAN, '[INFO]', YELLOW, timestamp(), RESET, ...message);
  }

  static warn(...message: any[]) {
    console.warn(ORANGE, '[WARN]', YELLOW, timestamp(), RESET, ...message);
  }

  static error(...message: any[]) {
    console.error(RED, '[ERROR]', YELLOW, timestamp(), RESET, ...message);
  }

  static debug(...message: any[]) {
    console.debug(MAGENTA, '[DEBUG]', YELLOW, timestamp(), RESET, ...message);
  }
}

function timestamp() {
  return DateTZ().format('hh:mm:ss A CST');
}
